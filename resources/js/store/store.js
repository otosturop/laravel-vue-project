import Vue from 'vue';
import Vuex from 'vuex';
import {router} from "../routes";


Vue.use(Vuex);

export const store = new Vuex.Store( {
    state : {
        token : null,
        user : null
    },
    mutations : {
        setToken(state, token){
            state.token = token
        },
        setUser(state, data){
            state.user = data
        },
        clearToken(state) {
            state.token = null
        }
    },
    actions : {
        initAuth({commit, dispatch}){
            let token = localStorage.getItem("token")
            if(token){
                commit('setToken', token);
                dispatch("profile")
                router.push("/dashboard")
            }else {
                return false
            }
        },
        login({dispatch, state}, authData) {
            return axios.post('auth/signin', {
                'email': authData.email,
                'password': authData.password
            }).then( (response) => {
                dispatch("attempt", response.data.token)
                localStorage.setItem("token", response.data.token)
            })
        },
        async attempt({commit}, token) {
            commit('setToken', token);
            try {
                let response = await axios.get('auth/me', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                commit('setUser', response.data)
            }catch(e) {
                commit('setUser', null);
            }
        },
        async register({commit, dispatch, state}, authData){
            let register = await axios.post('auth/signup', {
                'email': authData.email,
                'password': authData.password,
                'password_confirmation': authData.password_confirmation
            })
            return register;
        },
        async logout({commit, state}) {
            await axios.post('auth/signout', {},{
                headers: {
                    'Authorization': 'Bearer ' + state.token
                }
            });
            localStorage.removeItem("token");
            commit("clearToken")
        },
        async profile({state, commit}){
            let profile = await axios.post('auth/profile', {},{
                headers: {
                    'Authorization': 'Bearer ' + state.token
                }
            });
            commit('setUser', profile.data)
            return profile;
        },
        async profileUpdate({state, dispatch, commit}, formData){
            let profile = await axios.post('auth/profile-update', formData,{
                headers: {
                    'Authorization': 'Bearer ' + state.token,
                }
            });
            return profile;
        }
    },
    getters : {
        isAuthenticated(state) {
            return state.token !== null
        },
        getUser(state) {
            return state.user
        }
    }
});
