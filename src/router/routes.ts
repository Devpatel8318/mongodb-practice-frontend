import { lazy } from 'react'

const ForgetPassword = lazy(() => import('src/features/auth/ForgetPassword'))
const Login = lazy(() => import('src/features/auth/Login'))
const Logout = lazy(() => import('src/features/auth/Logout'))
const ResetPassword = lazy(() => import('src/features/auth/ResetPassword'))
const Signup = lazy(() => import('src/features/auth/Signup'))
const Dashboard = lazy(() => import('src/features/dashboard/Dashboard'))
const ProblemPracticePage = lazy(
	() => import('src/features/queryPractice/ProblemPracticePage')
)
const Temp = lazy(() => import('src/features/Temp/Temp'))

export interface RouteObjectType {
	path: string
	title: string
	component: React.ComponentType
}

const createRouteObject = (
	path: string,
	title: string,
	component: React.ComponentType
): RouteObjectType => ({
	path,
	title,
	component,
})

export const privateRoutes: RouteObjectType[] = [
	...['/dashboard', '/'].map((path) =>
		createRouteObject(path, 'Dashboard', Dashboard)
	),
	createRouteObject('/problems/:questionId', 'Problem', ProblemPracticePage),
	createRouteObject('/logout', 'Logout', Logout),
	createRouteObject('/temp', 'Temp', Temp),
]

export const publicRoutes: RouteObjectType[] = [
	...['/forget', '/forget-password'].map((path) =>
		createRouteObject(path, 'Forget Password', ForgetPassword)
	),
	...['/signup', '/register'].map((path) =>
		createRouteObject(path, 'Register', Signup)
	),
	...['/login', '/signin'].map((path) =>
		createRouteObject(path, 'Login', Login)
	),
	...['/reset-password'].map((path) =>
		createRouteObject(path, 'Reset Password', ResetPassword)
	),
]
