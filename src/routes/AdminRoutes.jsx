import { Outlet, Route, Routes } from 'react-router-dom'
import Login from '../components/admin/login/Login'
import Public from '../components/admin/admin-public/Public'
import RequireAuth from '../components/admin/require-auth/RequireAuth'
import Home from '../components/admin/home/Home'
import Layout from '../components/admin/layout/Layout'
import Students from '../components/admin/students/Students'
import DataManage from '../components/admin/manage-data/DataManage'
import Questions from '../components/admin/questions/Questions'
import QuestionForm from '../components/admin/questions/QuestionForm'
import UserProfile from '../components/admin/user-profile/UserProfile'
import EditQuestion from '../components/admin/questions/EditQuestion'

function AdminRoutes() {
	return (
		<Routes>
			<Route element={<Outlet />}>
				<Route element={<Public />}>
					<Route path='login' element={<Login />} />
				</Route>
				<Route element={<RequireAuth />}>
					<Route path='/' element={<Layout />}>
						<Route path='/' element={<Home />} />
						<Route path='responses' element={<Students />} />
						<Route path='profile/:id' element={<UserProfile />} />
						<Route path='manage-data' element={<DataManage />} />
						<Route path='questions' element={<Questions />} />
						<Route path='questions/:id' element={<EditQuestion />} />
						<Route path='add-question' element={<QuestionForm />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	)
}

export default AdminRoutes
