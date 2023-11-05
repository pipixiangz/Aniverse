import { createApp } from "vue";
import App from "./App.vue"; // root component for our applciation
import router from "./router";
import "./assets/css/index.css";
import { createPinia } from "pinia"; // state management of Vue.js applciation

const app = createApp(App); // creates a new Vue application instance
app.use(router);
app.use(createPinia());
app.mount("#app"); // link our Vue application to index.html, <div id="app">

// 在此处配置全局前置导航守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/login' || to.path === '/register') {
      // 如果要前往的页面是登录页，继续导航
      next();
    }else {
      // 否则，检查用户是否已登录，可以使用sessionStorage或其他方式来验证
      const isLoggedIn = sessionStorage.getItem('isLoggedIn'); 
      if (isLoggedIn) {
        // 用户已登录，继续导航
        next();
      } else {
        // 用户未登录，重定向到登录页
        next('/');
      }
    }
  });