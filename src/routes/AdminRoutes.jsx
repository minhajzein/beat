import { Outlet, Route, Routes } from 'react-router-dom'
import Login from '../components/admin/login/Login'
import Public from '../components/admin/admin-public/Public'
import RequireAuth from '../components/admin/require-auth/RequireAuth'
import Home from '../components/admin/home/Home'

function AdminRoutes() {
	return (
		<Routes>
			<Route element={<Outlet />}>
				<Route element={<Public />}>
					<Route path='login' element={<Login />} />
				</Route>
				<Route element={<RequireAuth />}>
					<Route path='/' element={<Home/>} />
				</Route>
			</Route>
		</Routes>
	)
}

export default AdminRoutes
