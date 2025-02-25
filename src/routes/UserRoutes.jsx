import { Outlet, Route, Routes } from 'react-router-dom'
import Register from '../components/user/register/Register'

function UserRoutes() {
	return (
		<Routes>
			<Route path='/' element={<Register />} />
			<Route element={<Outlet />}></Route>
		</Routes>
	)
}

export default UserRoutes
