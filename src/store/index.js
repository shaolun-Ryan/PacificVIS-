import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

let state = {
    t:'123456'
}

let getters = {}

let mutations = {}

let actions = {}


const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions

});

export default store;

 