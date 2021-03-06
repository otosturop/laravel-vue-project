/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import Vue from 'vue'
require('./bootstrap');
require('./fontawesome');

import { store } from './store/store'
import { router } from './routes'
import VueMask from 'v-mask'
Vue.use(VueMask);

window.Vue = require('vue');
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('login-component', require('./components/Login').default);
Vue.component('register-component', require('./components/Register').default);
Vue.component('dashboard-component', require('./components/Dashboard').default);
Vue.component('sidebar-component', require('./components/Sidebar').default);
Vue.component('profile-component', require('./components/Profile').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
    store,
    created() {
        this.$store.dispatch("initAuth")
    }
});
