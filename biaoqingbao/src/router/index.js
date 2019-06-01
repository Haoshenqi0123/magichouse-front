import Vue from 'vue'
import Router from 'vue-router'
import Biaoqingbao from '@/components/Biaoqingbao'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Biaoqingbao',
      component: Biaoqingbao
    }
  ]
})
