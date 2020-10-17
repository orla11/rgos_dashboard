import logs from '../../../fake-db/logs.js'

const state = {
      logs: []
}

const mutations = {
      SET_LOGS: (state,payload) => { state.logs = payload },
}

const actions = {
      initData: ({commit}) => { commit('SET_LOGS',logs) },
      loadData: ({commit},data) => { commit('SET_LOGS',data) }
}

const getters = {
      logs: state => state.logs
}

const logModule = {
      namespaced: true,
      state,
      mutations,
      actions,
      getters
}

export default logModule;