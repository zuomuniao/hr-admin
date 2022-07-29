import { asyncRoutes, constantRoutes } from '@/router'
const state = {
  routes: []
}
const mutations = {
  setRoutes (state, payload) {
    state.routes = payload
  }
}
const actions = {
  filter (context, menus) {
    const newRoutes = asyncRoutes.filter(item => menus.includes(item.meta.name))
    console.log(newRoutes)
    context.commit('setRoutes', [...constantRoutes, ...newRoutes])
    return newRoutes
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
