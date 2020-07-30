import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: "aaaa",
        url: "/api/",
        style: "",
        notificationIndex: ""
    },
    getters: {
        getToken: state => state.token,
        getUrl: state => state.url,
        getStyle: state => state.style,
        getNotificationIndex: state => state.notificationIndex
    },
    mutations: {
        addStyle(state, val){
            state.style = val;
        },
        addNotificationIndex(state, val){
            state.notificationIndex = val;
        },
    },
    actions: {},
    modules: {}
})
