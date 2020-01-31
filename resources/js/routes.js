import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Profile from "./components/Profile"
import Register from "./components/Register";

import {store} from "./store/store"

Vue.use(VueRouter);

export const  router =  new VueRouter({
    routes : [
        { path : '/', component : Login },
        { path : '/uye-ol', component : Register },
        {
            path: '/dashboard',
            component: Dashboard,
            beforeEnter(to, from, next) {
                if(store.getters.isAuthenticated) {
                    next()
                }else {
                    next('/')
                }
            }
        },
        {
            path: '/profile',
            component: Profile,
            beforeEnter(to, from, next){
                if(store.getters.isAuthenticated) {
                    next()
                }else {
                    next('/')
                }
            }
        },
    ],
    mode : 'history'
});


