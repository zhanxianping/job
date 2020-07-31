import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const projectUrl = window.location.host;

export default new Vuex.Store({
    state: {
        token: "aaaa",
        url: projectUrl,
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
        addNavBtn(){

        }
    },
    actions: {},
    modules: {}
})
