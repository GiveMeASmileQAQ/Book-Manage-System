import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import Main from "@/components/Main";
import Index from "@/components/Index";
import Header from "@/components/Header";
import Library from "@/components/Library";
import Details from "@/components/Details";
import Record from "@/components/Record";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/", // 默认进入路由
      redirect: "/main" //重定向
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/main",
      name: "Main",
      component: Main,
      children: [
        {
          path: "index",
          name: "Index",
          component: Index
        },
        {
          path: "library",
          name: "Library",
          component: Library
        },
        {
          path: "details",
          name: "Details",
          component: Details
        },
        {
          path: "record",
          name: "Record",
          component: Record
        },
      ]
    },
  ]
});
