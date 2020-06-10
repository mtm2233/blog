import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		httpBase: 'https://api.youcann.club/',
		// 博客文章标题
		search: '446',
		typeId: '',
		replyId: 0,
		tags: ''
	},
	mutations: {
		changeSearch(state, search) {
			state.search = search
		},
		changeTags(state, tags) {
			state.tags = tags
		}
	},
	actions: {},
	modules: {}
})
