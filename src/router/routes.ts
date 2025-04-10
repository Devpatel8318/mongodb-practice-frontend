import Dashboard from 'src/features/dashboard/Dashboard'
import Login from 'src/features/auth/Login'
import Logout from 'src/features/auth/Logout'
import Signup from 'src/features/auth/Signup'
import ForgetPassword from 'src/features/auth/ForgetPassword'
import ProblemPracticePage from 'src/features/queryPractice/ProblemPracticePage'
import Temp from 'src/features/Temp/Temp'

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
]
