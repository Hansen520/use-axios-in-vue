<template>
  <div>
<!-- 联系人的列表 -->
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

// vant组件库
import { ContactList, Popup, ContactEdit, Toast} from 'vant'
// 导入接口
import { getContantList, newContactJson, editContact, deleteContact} from '../server/contact'

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
  this.getList()
  // getContantList()
},
methods: { 
  // 获取联系人列表
   async getList(){
      let res = await getContantList()
      this.list = res.data
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
  async onSave(info){
    if(this.isEdit){
      // 编辑保存
      let res = await editContact(
        info
      )
      if(res.code === 200){
        Toast('编辑成功')
        this.showEdit = false
        this.getList()
      }     
    } else{
      // 新建保存
      // let res = await newContactJson(info)
      //   .then(res => {
      //     if(res.data.code === 200) {
      //       Toast('新建成功')
      //       this.renderList()
      //       this.showEdit = false
      //     }
      //   })
      let res = await newContactJson(info)
      if(res.code === 200) {
        Toast('新建成功!')
        
        this.showEdit = false
        this.getList()
      }
    }
  },
  // 删除联系人
  async onDelete(info){
    // this.instance.delete('/contact', {
    //   params: {
    //     id: info.id
    //   }
    // }).then(res => {
    //   if(res.data.code === 200) {
    //     Toast("删除成功")
    //     this.showEdit = false
    //     this.renderList()
    //   }
    // }).catch(()=>{
    //   Toast("请求失败")
    // })
    let res = await deleteContact({
      id: info.id
    })
    if(res.code === 200) {
      Toast('删除成功')
      this.editingContact = {}
      this.showEdit = false
      this.getList()
    }
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
