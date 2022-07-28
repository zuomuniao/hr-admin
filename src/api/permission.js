import request from '@/utils/request'
// 获取所有的权限点
export const getPermissions = () => {
  return request({
    url: '/sys/permission'
  })
}

// 根据角色id获取权限
export const getPermissionsById = id => {
  return request({
    url: `/sys/role/${id}`
  })
}

// 给角色分配权限
export const assignPermission = (id, permIds) => {
  return request({
    method: 'PUT',
    url: '/sys/role/assignPrem',
    data: { id, permIds }
  })
}

// 添加权限点
export const addPermission = data => {
  return request({
    method: 'POST',
    url: '/sys/permission',
    data
  })
}

// 编辑权限点
export const editPermission = data => {
  return request({
    method: 'PUT',
    url: `/sys/permission/${data.id}`,
    data
  })
}
