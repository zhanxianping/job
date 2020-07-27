import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: "aaaa",
        url: "/api/",
        style: "",
    },
    getters: {
        getToken: state => state.token,
        getUrl: state => state.url,
        getStyle: state => state.style,
    },
    mutations: {
        addStyle(state, val){
            state.style = val;
        }
    },
    actions: {},
    modules: {}
})
