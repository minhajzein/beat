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
				<div className='flex-grow overflow-y-auto overflow-x-auto h-full no-scrollbar mainClr md:m-5 rounded-2xl  rounded-l-none ml-0 border '>
					<div className='md:p-2 md:px-4 '>
						<Outlet className='h-dvh' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Layout
