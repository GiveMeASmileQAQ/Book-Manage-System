import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import Index from "@/components/Index";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/", // 默认进入路由
      redirect: "/login" //重定向
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/index",
      name: "Index",
      component: Index,
      meta: {
        needLogin: true //需要加校检判断的路由
      }
    }
  ]
});
