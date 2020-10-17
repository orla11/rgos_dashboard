const actions = {

    // /////////////////////////////////////////////
    // COMPONENTS
    // /////////////////////////////////////////////

    // Vertical NavMenu
    updateVerticalNavMenuWidth({ commit }, width) {
      commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width)
    },

    // VxAutoSuggest
    updateStarredPage({ commit }, payload) {
      commit('UPDATE_STARRED_PAGE', payload)
    },

    // The Navbar
    arrangeStarredPagesLimited({ commit }, list) {
      commit('ARRANGE_STARRED_PAGES_LIMITED', list)
    },
    arrangeStarredPagesMore({ commit }, list) {
      commit('ARRANGE_STARRED_PAGES_MORE', list)
    },

    // /////////////////////////////////////////////
    // UI
    // /////////////////////////////////////////////

    toggleContentOverlay({ commit }) {
      commit('TOGGLE_CONTENT_OVERLAY')
    },
    updateTheme({ commit }, val) {
      commit('UPDATE_THEME', val)
    },

    // /////////////////////////////////////////////
    // User/Account
    // /////////////////////////////////////////////

    updateUserInfo({ commit }, payload) {
      commit('UPDATE_USER_INFO', payload)
    },

    // /////////////////////////////////////////////
    // Dummy (Mockup) data initialization - 0rla
    // /////////////////////////////////////////////
    initAppData({dispatch}){
      // init group data
      dispatch('group/initData',{},{root: true})
      // init sensor data
      dispatch('sensor/initData',{},{root: true})
      // init access data
      dispatch('access/initData',{},{root: true})
      // init permission data
      dispatch('permission/initData',{},{root: true})
      // init log data
      dispatch('log/initData',{},{root: true})
    }
}

export default actions
