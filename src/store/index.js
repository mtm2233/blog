import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 博客文章标题
    search: '',
    // 博客文章Id
    artId: '',
    typeId: '26'
  },
  mutations: {
    changeSearch(state, search) {
      state.search = search
    },
    changeArtId(state, artId) {
      state.artId = artId
    },
    changeTypeId(state, typeId) {
      state.typeId = typeId
    }
  },
  actions: {
  },
  modules: {
  }
})
