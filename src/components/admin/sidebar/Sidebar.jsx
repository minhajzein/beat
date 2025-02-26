import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
	IoIosArrowDropleftCircle,
	IoIosArrowDroprightCircle,
} from 'react-icons/io'
import {
	FcDataConfiguration,
	FcHome,
	FcConferenceCall,
	FcTodoList,
	FcQuestions,
} from 'react-icons/fc'

//imports.................................................................

const SidebarData = [
	{
		name: 'Dashboard',
		icon: FcHome,
		path: '/admin/',
		color: 'bg-gray-500',
	},
	{
		name: 'Students',
		icon: FcConferenceCall,
		path: '/admin/students',
		color: 'bg-red-500',
	},
	{
		name: 'Results',
		icon: FcTodoList,
		path: '/admin/results',
		color: 'bg-violet-500',
	},
	{
		name: 'Questions',
		icon: FcQuestions,
		path: '/admin/questions',
		color: 'bg-red-500',
	},

	{
		name: 'Data Manage',
		icon: FcDataConfiguration,
		path: '/admin/manage-data',
		color: 'bg-red-500',
	},
]

function SideBar() {
	const [isOpen, setIsOpen] = useState(true)
	const navigate = useNavigate()
	const location = useLocation()

	const isActive = path => location.pathname === path

	const toggleSidebar = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div
			className={`h-screen transition-all duration-300 ${
				isOpen ? 'md:w-52 w-14' : 'w-14'
			} text-white opacity-90 bg-gray-950 hidden md:block`}
		>
			<div className='flex flex-col h-full shadow-lg'>
				<div className='flex items-center justify-center p-2 md:p-4'>
					{isOpen && (
						<div
							className={`flex items-center gap-3 font-mono transition-all duration-300 font-extrabold  ${
								isOpen ? 'opacity-100 hidden md:block' : 'opacity-0'
							}`}
						>
							<img
								className='rounded w-full object-contain'
								src='/images/beat_logo.png'
								alt=''
							/>
						</div>
					)}
				</div>
				<hr />
				<div className='flex-grow mt-2'>
					{SidebarData.map((data, i) => {
						const Icon = data.icon
						const itemColor = isActive(data.path)
							? 'md:rounded-md rounded-tl-md rounded-bl-md bg-gray-50'
							: 'hover:bg-gray-100 text-gray-800 md:rounded-md'
						const iconColor = isActive(data.path) ? 'text-gray-900' : ''

						return (
							<div
								key={i}
								className={`transition  duration-300 ease-in-out md:mx-2 py-[2px]`}
							>
								<div
									onClick={() => navigate(data.path)}
									className={`flex justify-between items-center cursor-pointer p-2 text-white hover:text-gray-700 ${itemColor}`}
								>
									<div
										className={`flex gap-3 text-sm font-medium items-center `}
									>
										<Icon className={`size-5 ${iconColor}`} />
										{isOpen && (
											<div className={`${iconColor} hidden md:block`}>
												{data.name}
											</div>
										)}
									</div>
								</div>
							</div>
						)
					})}
				</div>
				<div className='p-3 hidden md:block'>
					<div className='flex items-center justify-end'>
						{isOpen && (
							<div className='text-[.6rem] font-thin flex justify-end w-full mr-5'>
								Beat Educations version 1.0
							</div>
						)}

						<button
							onClick={toggleSidebar}
							className='ml-auto text-[.6rem] cursor-pointer text-gray-200 p-2'
						>
							{isOpen ? (
								<IoIosArrowDropleftCircle className='h-5 w-5' />
							) : (
								<IoIosArrowDroprightCircle className='h-5 w-5' />
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SideBar
