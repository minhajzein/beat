import { Outlet, Route, Routes } from 'react-router-dom'
import Register from '../components/user/register/Register'
import TestInterface from '../components/user/questions/TestInterface'

function UserRoutes() {
	return (
		<Routes>
			<Route element={<Outlet />}>
				<Route path='/' element={<Register />} />
				<Route path='take-test' element={<TestInterface />} />
			</Route>
		</Routes>
	)
}

export default UserRoutes
