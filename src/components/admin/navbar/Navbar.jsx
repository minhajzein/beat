import { useLocation, useNavigate } from 'react-router-dom'
import { useSendLougoutMutation } from '../../../redux/apiSlices/adminAuthSlice'
import usePersist from '../../../hooks/usePersist'
import { Loading3QuartersOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
	FcConferenceCall,
	FcDataConfiguration,
	FcHome,
	FcQuestions,
} from 'react-icons/fc'

function Navbar() {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const [adminPersist, setAdminPersist] = usePersist()

	const [clear, { isLoading }] = useSendLougoutMutation()

	const sendLogout = async () => {
		try {
			await clear()
			setAdminPersist(false)
			navigate('/admin/login')
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<div className='bg-secondary-white shadow-lg shadow-black/50 flex items-center justify-between  p-5'>
			{pathname === '/admin' || pathname === '/admin/' ? (
				<div className='flex items-center gap-2'>
					<div className='p-2 rounded-full flex m-auto bg-white'>
						<FcHome />
					</div>
					<h1 className='capitalize text-xl'>Dashboard</h1>
				</div>
			) : pathname === '/admin/responses' ||
			  pathname === '/admin/responses/' ? (
				<div className='flex items-center gap-2'>
					<div className='p-2 rounded-full flex m-auto bg-white'>
						<FcConferenceCall />
					</div>
					<h1 className='capitalize text-xl'>{pathname.slice(7)}</h1>
				</div>
			) : pathname === '/admin/manage-data' ||
			  pathname === '/admin/manage-data/' ? (
				<div className='flex items-center gap-2'>
					<div className='p-2 rounded-full flex m-auto bg-white'>
						<FcDataConfiguration />
					</div>
					<h1 className='capitalize text-xl'>
						{pathname.slice(7).replace('-', ' ')}
					</h1>
				</div>
			) : pathname === '/admin/questions' ||
			  pathname === '/admin/questions/' ? (
				<div className='flex items-center gap-2'>
					<div className='p-2 rounded-full flex m-auto bg-white'>
						<FcQuestions />
					</div>
					<h1 className='capitalize text-xl'>{pathname.slice(7)}</h1>
				</div>
			) : pathname.includes('/profile/') ? (
				<div className='flex items-center'>
					<h1 className='capitalize text-xl'>Profile</h1>
				</div>
			) : (
				<div className='flex items-center'>
					<h1 className='capitalize text-xl'>
						{pathname.slice(7).replace('-', ' ')}
					</h1>
				</div>
			)}

			<div className='flex gap-5'>
				<div className='flex gap-2 items-center'>
					<img
						src='/images/admin.png'
						className='p-2 rounded-full bg-white'
						alt=''
					/>
					<h1>Welcome Beat Admin</h1>
				</div>
				<button
					onClick={sendLogout}
					className='rounded-xl border text-theme-red border-theme-red px-5'
				>
					{isLoading ? (
						<Loading3QuartersOutlined className='animate-spin' />
					) : (
						'Logout'
					)}
				</button>
			</div>
		</div>
	)
}

export default Navbar
