import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/authPage/LoginPage.vue'
import ForgotPassword from '../pages/authPage/ForgotPasswordPage.vue'
import ChangePassword from '../pages/authPage/ChangePasswordPage.vue'
import OTP from '../pages/authPage/OtpPage.vue'
import MenuBar from '../components/Menu/MenuBar.vue'
import Dashboard from '../components/HelloWorld.vue'
import ErrorPage from '../pages/ErrorPage.vue'
import { EmployeeRoute, RoleRoute, PermissionsRoute } from './AccManagement'
import * as Path from '../constants/commonConstants/Path';

const routes = [
  {
    path: Path.login, component: LoginPage, name: Path.loginName,
  },
  {
    path: Path.forgotPassword, component: ForgotPassword, name: Path.forgotPasswordName,
  },
  {
    path: Path.changePassword, component: ChangePassword, name: Path.changePasswordName,
  },
  {
    path: Path.otp, component: OTP, name: Path.otpName,
  },
  {
    path: '/', component: MenuBar, name: Path.homeName, alias: Path.home,
    children: [
      EmployeeRoute, RoleRoute, PermissionsRoute,
      {
        path: "/dashboard",
        component: Dashboard, name: 'Dashboard',
      }
    ]
  },
  {
    path: Path.Error,
    component: ErrorPage, name: Path.ErrorName,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to) => {
//   const token = localStorage.getItem('token')
//   if (!token && to.name !== 'Login' && to.name !== 'ForgotPassword' && to.name !== 'ChangePassword' && to.name !== 'Otp') {
//     return { name: 'Login', replace: true }
//   }
//   if (to.name == 'Login' && token !== null && token !== "") {
//     return { name: "Home", replace: true }
//   }
// })

export default router

