import { useLocation, useNavigate } from 'react-router-dom'
import { useSendLougoutMutation } from '../../../redux/apiSlices/adminAuthSlice'
import usePersist from '../../../hooks/usePersist'
import { Loading3QuartersOutlined } from '@ant-design/icons'
import {
	FcConferenceCall,
	FcDataConfiguration,
	FcHome,
	FcQuestions,
} from 'react-icons/fc'
import { useState } from 'react'
import { TiThMenu } from 'react-icons/ti'
import { IoClose } from 'react-icons/io5'

const navItems = [
	{
		name: 'Dashboard',
		icon: FcHome,
		path: '/admin/',
		color: 'bg-gray-500',
	},
	{
		name: 'Responses',
		icon: FcConferenceCall,
		path: '/admin/responses',
		color: 'bg-red-500',
	},
	{
		name: 'Questions',
		icon: FcQuestions,
		path: '/admin/questions',
		color: 'bg-red-500',
	},
	{
		name: 'Manage Data',
		icon: FcDataConfiguration,
		path: '/admin/manage-data',
		color: 'bg-red-500',
	},
]
function Navbar() {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState(false)
	const [adminPersist, setAdminPersist] = usePersist()

	const [clear, { isLoading }] = useSendLougoutMutation()

	const handleNavigate = path => {
		setIsOpen(false)
		navigate(path)
	}

	const isActive = path => location.pathname === path

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
		<div className='bg-secondary-white w-full relative shadow-lg shadow-black/50 flex items-center justify-between  p-5'>
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

			<div className='md:flex hidden gap-5'>
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
			<div className='md:hidden'>
				<TiThMenu
					onClick={() => setIsOpen(true)}
					className='text-2xl text-theme-purple cursor-pointer'
				/>
				<div
					className={`absolute flex flex-col transition-transform duration-300 gap-4 ${
						isOpen ? 'top-0' : '-top-96'
					}  p-4 w-full left-0 z-40 bg-theme-purple text-white`}
				>
					<div className='flex justify-end'>
						<IoClose
							onClick={() => setIsOpen(false)}
							className='text-2xl text-end cursor-pointer'
						/>
					</div>
					{navItems.map((data, i) => (
						<div
							onClick={() => handleNavigate(data.path)}
							key={i}
							className={`flex justify-between items-center cursor-pointer p-2 text-white rounded-lg ${
								isActive(data.path) && 'bg-theme-red'
							} hover:bg-secondary-white hover:text-gray-700`}
						>
							<div className='flex gap-3 text-sm font-medium items-center'>
								<data.icon className='size-5' />

								<div>{data.name}</div>
							</div>
						</div>
					))}
					<button
						onClick={sendLogout}
						className='rounded-xl shadow-lg shadow-black bg-theme-red w-full px-2 py-1'
					>
						{isLoading ? (
							<Loading3QuartersOutlined className='animate-spin' />
						) : (
							'Logout'
						)}
					</button>
				</div>
			</div>
		</div>
	)
}

export default Navbar
