import sensors from '../../../fake-db/sensors.js'

const state = {
      sensors: []
}

const mutations = {
      SET_SENSORS: (state,payload) => { state.sensors = payload },
      UPDATE_SENSOR: (state,payload) => {

            let sensor = state.sensors.find(el => el._id == payload._id)

            if(sensor){
                  if(sensor.access_area != payload.access_area) sensor.access_area = payload.access_area
                  if(sensor.ip_addr != payload.ip_addr) sensor.ip_addr = payload.ip_addr
                  if(sensor.status != payload.status) sensor.status = payload.status
            }
      }
}

const actions = {
      initData: ({commit}) => { commit('SET_SENSORS',sensors)},
      loadData: ({commit},data) => { commit('SET_SENSORS',data)},
      updateSensor: ({commit},sensor) => { commit('UPDATE_SENSOR',sensor) }
}

const getters = {
      sensors: state => state.sensors,
      activeSensors: state => { 
            return state.sensors.filter(el => el.status == "active") 
      },
      downSensors: state => { 
            return state.sensors.filter(el => el.status == "down") 
      },
      pendingSensors: state => { 
            return state.sensors.filter(el => el.status == "pending") 
      },
      denyingSensors: state => { 
            return state.sensors.filter(el => el.status == "denying") 
      }
}

const sensorModule = {
      namespaced: true,
      state,
      mutations,
      actions,
      getters
}

export default sensorModule;