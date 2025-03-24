import Dashboard from "src/features/dashboard/Dashboard";
import Login from "src/features/auth/Login";
import Logout from "src/features/auth/Logout";
import Signup from "src/features/auth/Signup";
import ForgetPassword from "src/features/auth/ForgetPassword";

export const privateRoutes = [
    ...["/dashboard", "/"].map((path) => ({
        path,
        title: "Dashboard",
        component: Dashboard,
    })),
    {
        path: "/logout",
        title: "Logout",
        component: Logout,
    },
];

export const publicRoutes = [
    ...["/forget", "forget-password"].map((path) => ({
        path,
        title: "Forget Password",
        component: ForgetPassword,
    })),
    ...["/signup", "register"].map((path) => ({
        path,
        title: "Register",
        component: Signup,
    })),
    ...["/login", "signin"].map((path) => ({
        path,
        title: "Login",
        component: Login,
    })),
    {
        path: "/logout",
        title: "Logout",
        component: Logout,
    },
];
