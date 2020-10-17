import axios from '../../../axios-auth'
import globalAxios from '../../../axios'
import router from '../../../router'

const state = {
    idToken: null,
    userId: null,
    user: null
}

const mutations = {
    AUTH_USER: (state, userData) => {
        state.idToken = userData.token
        state.userId = userData.userId
    },
    SET_USER: (state, user) => {
        state.user = user
    },
    CLEAR_AUTH_DATA: (state) => {
        state.idToken = null
        state.userId = null
    }
}

const actions = {
    setLogoutTimer({dispatch},expirationTime){
        setTimeout(() => {
            dispatch('logout')
        }, expirationTime * 1000)
    },
    login({commit,dispatch},authData){
        return new Promise((resolve, reject) => {
            axios.post('accounts:signInWithPassword?key=AIzaSyBSwl5dyoL5d85GSMs45eNAfwSJ_r4H3ao',{
                        email: authData.username,
                        password: authData.password,
                        returnSecureToken: true
                    })
                .then(res => {
                    commit('AUTH_USER', {
                        token: res.data.idToken,
                        userId: res.data.localId
                    })

                    const now = new Date()
                    const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)

                    localStorage.setItem('token', res.data.idToken)
                    localStorage.setItem('expirationDate', expirationDate)
                    localStorage.setItem('userId',res.data.localId)

                    dispatch('setLogoutTimer',res.data.expiresIn)

                    router.replace({ name: 'home' });
                    resolve(res)
                })
                .catch(error => reject(error.response.data.error));
            })
    },
    autoLogin({commit,dispatch}){
        const token = localStorage.getItem('token')
        if(!token) return

        const expirationDate = new Date(localStorage.getItem('expirationDate'))
        const now = new Date()
        if(now >= expirationDate){ 
            dispatch('resetStateAndLocalStorage')
            return
        }

        const userId = localStorage.getItem('userId')
        commit('AUTH_USER',{
            token: token,
            userId: userId
        })
    },
    logout: ({commit}) => {
        commit('CLEAR_AUTH_DATA')
        localStorage.removeItem('expirationDate')
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        router.replace({name:'login'})
    },
    resetStateAndLocalStorage({commit}){
        commit('CLEAR_AUTH_DATA');
		localStorage.removeItem('expirationDate');
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
    },
    fetchUser({commit,dispatch,state}){
        if(!state.idToken) return
        globalAxios.get('/users.json' + '?auth=' + state.idToken)
            .then(res => {
                const data = res.data
                for (let key in data){
                    if(data[key].user_id == state.userId){
                        const user = {
                            user_key: key,
                            user_id: data[key].user_id,
                            email: data[key].email,
                            name: data[key].name
                        }
                        commit("SET_USER",user)
                    }
                }
            })
            .catch(err => {
                if(err.response.status == 401) dispatch('logout')
                return {
                    error: err.response.statusText,
                    status: err.response.status
                }
            })
    },
}

const getters = {
    user: (state) => state.user,
    token: (state) => state.idToken,
    isAuthenticated: (state) => state.idToken !== null,
    user_key: (state) => state.user.user_key
}

const systemUserModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

export default systemUserModule;