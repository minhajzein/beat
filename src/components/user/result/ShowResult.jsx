import { useSelector } from 'react-redux'
import { useGetResultQuery } from '../../../redux/apiSlices/studentApiSlice'
import { Navigate, useLocation } from 'react-router-dom'
import { IoArrowRedoCircleSharp } from 'react-icons/io5'

function ShowResult() {
	const studentId = useSelector(state => state.student.student)
	const { data: result } = useGetResultQuery(studentId)
	const location = useLocation()

	return !studentId ? (
		<Navigate to='/' state={{ from: location }} replace />
	) : (
		<div className='h-dvh w-full lg:p-24 bg-theme-red'>
			<div className='relative w-full h-full rounded-lg overflow-hidden shadow-lg shadow-black/50'>
				<img
					className='w-full h-full object-cover'
					src='/images/register-image.jpg'
					alt=''
				/>
				<div className='w-full h-full p-5 absolute top-0 left-0'>
					<div className='bg-black/90 w-full h-full text-white gap-5 rounded p-5 flex flex-col items-center'>
						<h1 className='font-bold text-2xl'>Career Assessment Results</h1>
						<h1 className='text-lg text-center px-6'>
							Based on our assessment, your personality appears well-suited for
							a career in{' '}
							<span className='text-theme-red font-semibold'>
								{result?.stream}
							</span>
						</h1>
						<h1 className='text-center w-[50%]'>
							We recommend the following course, as we believe you have the
							potential to excel in it.
						</h1>
						<div className='grid grid-cols-2 gap-5'>
							{result?.courses.map(course => (
								<div
									key={course._id}
									className='p-4 flex gap-3 bg-theme-red rounded'
								>
									<IoArrowRedoCircleSharp />
									<h1>{course.name}</h1>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ShowResult
