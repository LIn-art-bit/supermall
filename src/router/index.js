import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/home/Home"
import Category from "../views/category/Category"
import Cart from "../views/cart/Cart"
import Profile from "../views/profile/Profile"
import Detail from "../views/detail/Detail"
Vue.use(VueRouter)
const routes = [
  {
    path: '',
    redirect: "/home"
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
