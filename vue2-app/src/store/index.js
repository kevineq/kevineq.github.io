import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    serializeTitle: '',
    rankTitle: '',
    active: 0,
    collectObj: {}
    // duration: 0,
    // title: '',
    // anchor: ''
  },
  getters: {},
  mutations: {
    setSerializeTitle(state, serializeTitle) {
      state.serializeTitle = serializeTitle
    },
    setRankTitle(state, rankTitle) {
      state.rankTitle = rankTitle
    },
    setActive(state, active) {
      state.active = active
    },
    setCollectObj(state, collectObj) {
      state.collectObj = {
        title: collectObj.title,
        subtitle: collectObj.subtitle,
        cover: collectObj.cover
      }
    }


    // setDuration(state, duration) {
    //   state.duration = duration
    // },
    // setTitleAndAnchor(state, {
    //   title,
    //   anchor
    // }) {
    //   state.title = title
    //   state.anchor = anchor
    // }
  },
  actions: {},
  modules: {}
})