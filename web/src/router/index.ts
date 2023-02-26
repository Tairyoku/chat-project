import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import MessagesView from "@/components/Messages/MessagesView.vue";
import SignInView from "../views/SignInView.vue";
import SignUpView from "../views/SignUpView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/chat/:id",
    name: "home",
    component: MessagesView,
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: SignUpView,
  },
  {
    path: "/sign-in",
    name: "sign-in",
    component: SignInView,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
