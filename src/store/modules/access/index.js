import accesses from '../../../fake-db/accesses.js'
import { v4 } from 'uuid'

const state = {
      accesses:[]
}

const mutations = {
      SET_ACCESSES: (state,payload) => { state.accesses = payload },
      CREATE_ACCESS: (state, payload) => {
            let access = {
				_id: v4().toString(),
				created_on: {
					$date: new Date().getTime()
				},
				first_name: payload.first_name,
				last_name: payload.last_name,
				permissions: [],
				group: ''
                  }
            state.accesses.push(access);
      },
      UPDATE_ACCESS: (state,payload) => {

            let access = state.accesses.find(el => el._id == payload._id)

            if(access){
                  if(access.first_name != payload.first_name) access.first_name = payload.first_name
                  if(access.last_name != payload.last_name) access.last_name = payload.last_name
            }
      },
      DELETE_ACCESS: (state,payload) => {
            const idx = state.accesses.findIndex(el => el._id == payload);
            state.accesses.splice(idx, idx >= 0? 1 : 0); 
      },
      ADD_PERMISSION: (state,payload) => {
            let access = state.accesses.find(el => el._id == payload.access_id)
            if(!access.permissions.find(el => el == payload.permission_id))
                  access.permissions.push(payload.permission_id)
      },
      SET_GROUP: (state,payload) => { 
            let access = state.accesses.find(el => el._id == payload.access_id)

            if(access){
                  if(access.group != payload.group_id) access.group = payload.group_id
            }
      },
      REMOVE_PERMISSION: (state,payload) => {
            let access = state.accesses.find(el => el._id == payload.access_id)
            if(access){
                  const idx = access.permissions.findIndex(el => el == payload.permission_id);
                  access.permissions.splice(idx, idx >= 0? 1 : 0);
            }
      }
}

const actions = {
      initData: ({commit}) => { commit('SET_ACCESSES',accesses) },
      loadData: ({commit},data) => { commit('SET_ACCESSES',data) },
      createAccess: ({commit},payload) => { commit('CREATE_ACCESS',payload)},
      updateAccess: ({commit},access) => { commit('UPDATE_ACCESS',access) },
      deleteAccess: ({commit},id) => { commit('DELETE_ACCESS',id) },
      setGroup: ({commit},{access_id,group_id}) => { commit('SET_GROUP',{access_id,group_id}) },
      addPermission: ({commit},{access_id,permission_id}) => { commit('ADD_PERMISSION',{access_id,permission_id}) }
}

const getters = {
      accesses: state => state.accesses
}

const accessModule = {
      namespaced: true,
      state,
      mutations,
      actions,
      getters
}

export default accessModule;