import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 博客文章标题
    search: '',
    typeId: '',
    replyId: 0
  },
  mutations: {
    changeSearch(state, search) {
      state.search = search
    },
    changeTypeId(state, typeId) {
      state.typeId = typeId
    },
    changeReplyId(state, replyId) {
      state.replyId = replyId
    }
  },
  actions: {
  },
  modules: {
  }
})
