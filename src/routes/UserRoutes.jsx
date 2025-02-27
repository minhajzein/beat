import { Outlet, Route, Routes } from 'react-router-dom'
import Register from '../components/user/register/Register'
import TestInterface from '../components/user/questions/TestInterface'
import ShowResult from '../components/user/result/ShowResult'

function UserRoutes() {
	return (
		<Routes>
			<Route element={<Outlet />}>
				<Route path='/' element={<Register />} />
				<Route path='take-test' element={<TestInterface />} />
				<Route path='result' element={<ShowResult />} />
			</Route>
		</Routes>
	)
}

export default UserRoutes
