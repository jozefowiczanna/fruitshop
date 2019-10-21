import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import Products from "./components/Products.vue";
import Checkout from "./components/Checkout.vue";

Vue.use(VueRouter);
Vue.config.productionTip = false;

const router= new VueRouter({
  routes: [
    {
      path: "*",
      component: Products
    },
    {
      path: "/checkout",
      component: Checkout
    }
  ]
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
