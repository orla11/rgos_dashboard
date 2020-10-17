import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

import group from './modules/group'
import sensor from './modules/sensor'
import access from './modules/access'
import permission from './modules/permission'
import log from './modules/log'
import systemUser from './modules/system-user'

Vue.use(Vuex)

export default new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        group,
        sensor,
        access,
        permission,
        log,
        systemUser
    }
})
