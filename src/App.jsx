import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserRoutes from './routes/UserRoutes'
import AdminRoutes from './routes/AdminRoutes'
import PersistLoginComp from './components/admin/persist/PersistLogin'

function App() {
	return (
		<>
			<Routes>
				<Route path='/*' element={<UserRoutes />} />
				<Route element={<PersistLoginComp />}>
					<Route path='/admin/*' element={<AdminRoutes />} />
				</Route>
			</Routes>
			<ToastContainer />
		</>
	)
}

export default App
