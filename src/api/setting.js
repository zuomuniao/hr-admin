import request from '@/utils/request'

/**
 * 获取角色列表
 * @param {当前页,每页数量} param0
 * @returns
 */
export const getRoleList = ({ page, pagesize }) => {
  return request({
    url: '/sys/role',
    params: { page, pagesize }
  })
}

// 根据id删除角色
export const delRole = id => {
  return request({
    method: 'DELETE',
    url: `/sys/role/${id}`
  })
}

// 添加角色
export const addRole = ({ name, description }) => {
  return request({
    method: 'POST',
    url: '/sys/role',
    data: { name, description }
  })
}

// 修改角色
export const editRole = data => {
  return request({
    method: 'PUT',
    url: `/sys/role/${data.id}`,
    data
  })
}

// 根据id查询公司信息
export const getCompanyInfo = id => {
  return request({
    url: `/company/${id}`
  })
}
