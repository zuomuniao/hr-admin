import request from '@/utils/request'

/**
 * 获取组织列表
 */
export const getDepartmentsList = () => {
  return request({
    url: '/company/department'
  })
}
// 先写html,css再写ajax再写逻辑 先静后动
// 可以把你最近打开快速打开

// 根据部门id删除
export const delDepartment = id => {
  return request({
    method: 'DELETE',
    url: `/company/department/${id}`
  })
}

/**
 * 新增部门
 * @param code 编码
 * @returns
 * 404 %20
 * get,delete -> params
 * put,post -> data
 */
export const addDepartment = ({ code, introduce, manager, name, pid }) => {
  return request({
    method: 'POST',
    url: '/company/department',
    data: { code, introduce, manager, name, pid }
  })
}

/**
 * 编辑部门
 * @param {*} data
 * @returns
 */
export const editDepartment = data => {
  return request({
    method: 'PUT',
    url: `/company/department/${data.id}`,
    data
  })
}
