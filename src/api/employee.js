import request from '@/utils/request'
// 获取员工列表
export const getEmployee = ({ page, size }) => {
  return request({
    url: '/sys/user',
    params: { page, size }
  })
}
