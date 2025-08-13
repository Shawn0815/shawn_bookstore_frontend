import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import BookPage from "./views/BookPage.vue";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";
import Confirmation from "./views/Confirmation";
import NotFound from "./views/NotFound.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      alias: ["/home", "/index.html"],
    },
    {
      // 所有書籍都同個路由，差在後面參數（用 query 取得）
      path: "/books",
      name: "books",
      component: BookPage,
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
    },
    {
      path: "*",
      component: NotFound,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: Checkout,
    },
    {
      path: "/confirmation",
      name: "confirmation",
      component: Confirmation,
    },
  ],
});
