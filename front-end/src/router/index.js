import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import Main from "@/components/Main";
import Index from "@/components/Index";
import Update from "@/components/Update";
import Library from "@/components/Library";
import Details from "@/components/Details";
import Record from "@/components/Record";

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
      path: "/main",
      name: "Main",
      component: Main,
      redirect:"/main/index",
      meta:{
        needLogin:"true"
      },
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
        {
          path: "update",
          name: "Update",
          component: Update
        },
      ]
    },
  ]
});
