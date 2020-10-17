import groups from '../../../fake-db/groups.js'
import { v4 } from 'uuid'

const state = {
      groups: []
}

const mutations = {
      SET_GROUPS: (state,payload) => { state.groups = payload },
      ADD_GROUP:  (state,payload) => { 

            if(payload._id){
                  let group = state.groups.find(el => el._id == payload._id)
                  
                  for(const property in group) {
                        if(group[property] != payload[property]) group[property] = payload[property]
                  }

                  group.sensors = payload.sensors.length > 0? payload.sensors.map(el => el._id) : []

            }else{
                  let group = {...payload}
                  group._id = v4().toString()
                  group.created_on = {
                        $date: new Date().getTime()
                  }
                  group.sensors = payload.sensors.length > 0? payload.sensors.map(el => el._id) : []
                  
                  state.groups.push(group)
            }
      },
      DELETE_GROUP: (state,payload) => {
            const idx = state.groups.findIndex(el => el._id == payload);
            state.groups.splice(idx, idx >= 0? 1 : 0); 
      }
}

const actions = {
      initData: ({commit}) => { commit('SET_GROUPS',groups)},
      loadData: ({commit},data) => { commit('SET_GROUPS',data)},
      addGroup: ({commit},group) => { commit('ADD_GROUP', group) },
      deleteGroup: ({commit},id) => { commit('DELETE_GROUP',id) }
}

const getters = {
      groups: state => state.groups
}

const groupModule = {
      namespaced: true,
      state,
      mutations,
      actions,
      getters
}

export default groupModule;