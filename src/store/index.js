import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: "aaaa",
        navList: [],
        style: "s",
    },
    getters: {
        getNavlist: state => state.token,
        getNavlist: state => state.navList,
        getStyle: state => state.style,
    },
    mutations: {
        addNavlist(state, list) {
            if (list.length) {
                state.navList = list;
            }
        },
        addStyle(state, val){
            state.style = val;
        }
    },
    actions: {},
    modules: {}
})
