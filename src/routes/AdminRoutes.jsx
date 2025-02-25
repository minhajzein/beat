import { Outlet, Route, Routes } from 'react-router-dom'

function AdminRoutes() {
	return (
		<Routes>
			<Route element={<Outlet />}></Route>{' '}
		</Routes>
	)
}

export default AdminRoutes
