import Vue from "vue";
import Router from "vue-router";
import Error from "@/components/Error";
import Login from "@/components/Login";
import Index from "@/components/Index";
import Update from "@/components/Update";
import updateStepOne from "@/components/updateStepOne";
import updateStepTwo from "@/components/updateStepTwo";
import updateStepThree from "@/components/updateStepThree";
import Library from "@/components/Library";
import Details from "@/components/Details";
import Record from "@/components/Record";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "*", // 默认进入路由
      name:Error,
      component:Error
    },
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
        needLogin: true
      }
    },
    {
      path: "/library",
      name: "Library",
      component: Library,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/details",
      name: "Details",
      component: Details,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/record",
      name: "Record",
      component: Record,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/update",
      name: "Update",
      component: Update,
      redirect: "/update/updateStepOne",
      children: [
        {
          path: "updateStepOne",
          name: "updateStepOne",
          component: updateStepOne,
          meta: {
            needLogin: true
          }
        },
        {
          path: "updateStepTwo",
          name: "updateStepTwo",
          component: updateStepTwo,
          meta: {
            needLogin: true,
            needCheckUpdate:true
          }
        },
        {
          path: "updateStepThree",
          name: "updateStepThree",
          component: updateStepThree,
          meta: {
            needLogin: true
          }
        }
      ]
    }
  ]
});
