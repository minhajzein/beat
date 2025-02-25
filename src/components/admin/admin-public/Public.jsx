import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function Public() {
	const token = useSelector(state => state.auth.token)
	const location = useLocation()

	return token !== null ? (
		<Navigate to='/admin' state={{ from: location }} replace />
	) : (
		<Outlet />
	)
}

export default Public
