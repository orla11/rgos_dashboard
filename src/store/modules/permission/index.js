import permissions from '../../../fake-db/permissions.js'
import { v4 } from 'uuid'

const state = {
      permissions:[]
}

const mutations = {
      SET_PERMISSIONS: (state,payload) => { state.permissions = payload },
      ADD_PERMISSION:  (state,payload) => { 
            
            if(payload._id){
                  let permission = state.permissions.find(el => el._id == payload._id)
                  
                  for(const property in permission) {
                        if(permission[property] != payload[property]) permission[property] = payload[property]
                  }

                  permission.sensors = payload.sensors.length > 0? payload.sensors.map(el => el._id) : []
            }else{
                  let permission = {...payload}
                  permission._id = v4().toString()
                  permission.created_on = {
                        $date: new Date().getTime()
                  }
                  permission.sensors = payload.sensors.length > 0? payload.sensors.map(el => el._id) : []

                  state.permissions.push(permission)
            }
      },
      DELETE_PERMISSION: (state,payload) => {
            const idx = state.permissions.findIndex(el => el._id == payload.permission_id);
            state.permissions.splice(idx, idx >= 0? 1 : 0);
      }
}

const actions = {
      initData: ({commit}) => { commit('SET_PERMISSIONS',permissions) },
      loadData: ({commit},data) => { commit('SET_PERMISSIONS',data) },
      deletePermission: ({commit},payload) => {
            commit('DELETE_PERMISSION',payload)
            commit('access/REMOVE_PERMISSION',payload,{ root: true }) 
      },
      addPermission: ({commit},permission) => {
            commit('ADD_PERMISSION',permission)
            let payload = {
                  access_id: permission.access, 
                  permission_id: permission._id
            }
            commit('access/ADD_PERMISSION',payload,{root: true})
      }
}

const getters = {
      permissions: state => state.permissions
}

const permissionModule = {
      namespaced: true,
      state,
      mutations,
      actions,
      getters
}

export default permissionModule;