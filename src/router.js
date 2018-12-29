import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import expenditure from '@/modules/expenditure/router'
Vue.use(Router)
var allRoutes = [];
allRoutes = allRoutes.concat(expenditure)
const routes = allRoutes
export default new Router({ routes })
