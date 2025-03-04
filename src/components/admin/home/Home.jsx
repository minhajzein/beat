import { ImSpinner } from 'react-icons/im'
import { useGetDashboardQuery } from '../../../redux/apiSlices/dashboardSlice'

function Home() {
	const { data, isLoading } = useGetDashboardQuery()

	return isLoading ? (
		<div className='w-full flex justify-center items-center p-4'>
			<ImSpinner className='animate-spin' />
		</div>
	) : (
		<div className='grid grid-cols-1 gap-5 p-3 md:grid-cols-2 lg:grid-cols-4'>
			<div className='bg-purple-light rounded-xl gap-1 text-white pt-16 p-5 flex flex-col justify-end items-center'>
				<img
					className='w-1/4 bg-white rounded-full p-2'
					src='/svgs/registered.svg'
					alt=''
				/>
				<h1 className='text-xl font-semibold'>{data.registered}</h1>
				<h3 className='capitalize'>Total Registered</h3>
			</div>
			<div className='bg-purple-light rounded-xl gap-1 text-white pt-16 p-5 flex flex-col justify-end items-center'>
				<img
					className='w-1/4 bg-white rounded-full p-2'
					src='/svgs/registered.svg'
					alt=''
				/>
				<h1 className='text-xl font-semibold'>{data.submitted}</h1>
				<h3 className='capitalize'>Exam Attended</h3>
			</div>
			<div className='bg-purple-light rounded-xl gap-1 text-white pt-16 p-5 flex flex-col justify-end items-center'>
				<img
					className='w-1/4 bg-white rounded-full p-2'
					src='/svgs/registered.svg'
					alt=''
				/>
				<h1 className='text-xl font-semibold'>{data.contacted}</h1>
				<h3 className='capitalize'>Total Contacted</h3>
			</div>
			<div className='bg-purple-light rounded-xl gap-1 text-white pt-16 p-5 flex flex-col justify-end items-center'>
				<img
					className='w-1/4 bg-white rounded-full p-2'
					src='/svgs/registered.svg'
					alt=''
				/>
				<h1 className='text-xl font-semibold'>{data.testSkipped}</h1>
				<h3 className='capitalize'>Test Skipped</h3>
			</div>
		</div>
	)
}

export default Home
