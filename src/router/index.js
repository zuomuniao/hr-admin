import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes 静态路由
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
  // 404 page must be placed at the end !!!

]
// 动态路由
// 因为我们之前filter是根据 item.children[0].name
// name不能在嵌套路由中放在父路由 因为会报错
export const asyncRoutes = [
  {
    path: '/approvals',
    component: Layout,
    children: [{
      path: '',
      name: 'approvals',
      component: () => import('@/views/approvals/index'),
      meta: { title: '审批', icon: 'tree-table' }
    }],
    meta: {
      name: 'approvals'
    }
  },
  {
    path: '/attendances',
    component: Layout,
    children: [{
      path: '',
      name: 'attendances',
      component: () => import('@/views/attendances/index'),
      meta: { title: '考勤', icon: 'skill' }
    }],
    meta: {
      name: 'attendances'
    }
  },
  {
    path: '/departments',
    component: Layout,
    children: [{
      path: '',
      name: 'departments',
      component: () => import('@/views/departments/index'),
      meta: { title: '组织架构', icon: 'tree' }
    }],
    meta: {
      name: 'departments'
    }
  },
  {
    path: '/employees',
    component: Layout,
    children: [{
      path: '',
      name: 'employees',
      component: () => import('@/views/employees/index'),
      meta: { title: '员工', icon: 'people' }
    }],
    meta: {
      name: 'employees'
    }
  },

  {
    path: '/permission',
    component: Layout,
    children: [{
      path: '',
      name: 'permissions',
      component: () => import('@/views/permission/index'),
      meta: { title: '权限管理', icon: 'lock' }
    }],
    meta: {
      name: 'permissions'
    }
  },
  {
    path: '/salarys',
    component: Layout,
    children: [{
      path: '',
      name: 'salarys',
      component: () => import('@/views/salarys/index'),
      meta: { title: '工资', icon: 'money' }
    }],
    meta: {
      name: 'salarys'
    }
  },
  {
    path: '/setting',
    component: Layout,
    children: [{
      path: '',
      name: 'settings',
      component: () => import('@/views/setting/index'),
      meta: { title: '公司设置', icon: 'setting' }
    }],
    meta: {
      name: 'settings'
    }
  },
  {
    path: '/social',
    component: Layout,
    children: [{
      path: '',
      name: 'social_securitys',
      component: () => import('@/views/social/index'),
      meta: { title: '社保', icon: 'table' }
    }],
    meta: {
      name: 'social_securitys'
    }
  },
  {
    path: '/import',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      name: 'import',
      component: () => import('@/views/import/index')
    }],
    meta: {
      name: 'employees'
    }
  },
  {
    path: '/employee/detail/:id',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      name: 'EmployeeDetail',
      component: () => import('@/views/employees/detail'),
      props: true
    }],
    meta: {
      name: 'employees'
    }
  }
]

// // 参数的写法
// 1. url?id=1001 -> this.$route.query.id
// 2. url/1001 /:id props:true  -> this.$route.params.id 可以实现解耦

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  // 只是临时的写法 现在还没开始做权限 假设不管是谁都可以看到所有的页面
  // 只保留静态路由表
  routes: [...constantRoutes]
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

// const router = new VueRouter({
//   routes:[

//   ]
// })

// 思路：
// 1. 首先不管是谁都有所有的静态路由表 const routes = [...constantRoutes]
// 2. 当用户登录的时候 就会在state.user.userInfo.roles.menus中可以知道当前这个人有哪些页面权限
// 3. 对asyncRoutes这个是完整版进行filter 根据当前用户页面权限点 得到一个新的数组
// 4. router.addRoutes(筛选之后动态路由表)

// 某用户能访问的路由表 = 所有的静态路由表 + 部分动态路由表
