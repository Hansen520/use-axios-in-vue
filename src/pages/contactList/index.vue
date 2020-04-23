<template>
  <div>
<!-- 联系人列表 -->
<van-popup v-model="showList" position="bottom">
  <van-contact-list
    :list="list"
    @add="onAdd"
    @edit="onEdit"
  />
</van-popup>

<!-- 联系人编辑 -->
<van-popup v-model="showEdit" position="bottom">
  <van-contact-edit
    :contact-info="editingContact"
    :is-edit="isEdit"
    @save="onSave"
    @delete="onDelete"
  />
</van-popup>
  </div>
</template>

<script>
import axios from 'axios'
// vant组件库
import { ContactList, Popup, ContactEdit, Toast} from 'vant'

export default {
name: 'contactList',
data () {
  return {
    showList: true,
    list: [],
    instance: null,
    // 编辑弹窗的显示
    showEdit: false,
    // 正在编辑
    editingContact: {},
    // 是否需要编辑
    isEdit: false
  }
},
components:{
    [Popup.name]: Popup,
    [ContactList.name]: ContactList,
    [ContactEdit.name]: ContactEdit
},
created() {
  this.instance = axios.create({
    baseURL: 'http://localhost:9000/api',
    timeout: 1000
  }),
  this.renderList()
},
methods: {
  // 获取联系人列表
  renderList(){
    this.instance.get('/contactList').then(res => {
      this.list = res.data.data
    }).catch(()=>{
      Toast('请求失败，清稍后重试')
    })
  },
  // 添加联系人
  onAdd(){
    this.showEdit = true
    this.isEdit = false
  },
  // 编辑联系人 
  onEdit(info){
    this.showEdit = true
    this.isEdit = true
    this.editingContact = info;
  },
  // 保存联系人
  onSave(info){
    if(this.isEdit){
      // 编辑保存
      this.instance.put('/contact/edit', info).then(res=>{
          if(res.data.code === 200) {
            Toast('编辑成功')
            this.showEdit = false
            this.renderList()
          }
        })       
    } else{
      // 新建保存
      this.instance.post('/contact/new/json', info)
        .then(res => {
          if(res.data.code === 200) {
            Toast('新建成功')
            this.renderList()
            this.showEdit = false
          }
        })
    }
  },
  // 删除联系人
  onDelete(info){
    this.instance.delete('/contact', {
      params: {
        id: info.id
      }
    }).then(res => {
      if(res.data.code === 200) {
        Toast("删除成功")
        this.showEdit = false
        this.renderList()
      }
    }).catch(()=>{
      Toast("请求失败")
    })
  }
}

}

</script>

<style>
span{
  color: #323233;
}
.van-contact-list__add{
  z-index: 0;
}
.van-popup{
  height: 100%;
}
</style>
