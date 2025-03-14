import { Outlet } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'
import Navbar from '../navbar/Navbar'

//imports................................................................

function Layout() {
	return (
		<div className='h-dvh flex'>
			<Sidebar className='transition-all duration-300 ' />
			<div className='flex flex-col flex-grow h-dvh overflow-hidden'>
				<Navbar className='z-50' />
				<div className='flex-grow overflow-y-auto overflow-x-auto h-full p-2 no-scrollbar mainClr md:p-5  rounded-l-none '>
					<Outlet className='h-dvh' />
				</div>
			</div>
		</div>
	)
}

export default Layout
