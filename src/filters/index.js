// 为什么要这样讲，因为写过一次，将来去公司里面看到公司写的过滤器就是一个普通的函数，你要理解
import dayjs from 'dayjs'

export const dateformat = function (time) {
  return dayjs(time).format('YYYY-MM-DD')
}
