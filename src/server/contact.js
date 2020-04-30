import request from './http';
// 联系人接口

  // 获取联系人列表
const getContantList = (params) => {
    return request('get', '/contactList', params)
  }
  // 新建联系人 form-data
 const newContactForm = (data) => {
    return request('post', '/contact/new/form', data)
  }
  // 新建联系人 application/json
 const newContactJson = (data) => {
    return request('post', '/contact/new/json', data)
  }
  // 编辑联系人
 const editContact = (data) => {
    return request('put', '/contact/edit', data)
  }
  // 删除联系人
const deleteContact = (data) => {
    return request('delete', `/contact`, data)
  }

  export {
    getContantList,
    newContactForm,
    newContactJson,
    editContact,
    deleteContact
  }
