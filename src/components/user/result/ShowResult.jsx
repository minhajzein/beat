import { useSelector } from 'react-redux'
import { useGetResultQuery } from '../../../redux/apiSlices/studentApiSlice'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { IoArrowRedoCircleSharp } from 'react-icons/io5'

function ShowResult() {
	const studentId = useSelector(state => state.student.student)
	const { data: result, isSuccess, isLoading } = useGetResultQuery(studentId)
	const location = useLocation()
	console.log(result)

	return !studentId ? (
		<Navigate to='/' state={{ from: location }} replace />
	) : (
		isSuccess && (
			<div className='h-dvh flex w-full font-merriweather font-thin lg:py-4 lg:px-72'>
				<div className='md:relative items-start p-4 w-full h-full md:h-auto flex m-auto flex-col gap-4 md:gap-3 overflow-y-auto lg:p-5 bg-theme-purple text-white md:rounded-lg overflow-hidden shadow-lg shadow-black/50'>
					<img
						src='/images/beat_logo.png'
						className='md:absolute h-16 md:top-5 md:w-20 object-contain md:right-5'
						alt=''
					/>
					<div className='flex flex-col items-start'>
						<img
							src='/images/celebration.png'
							className='h-24 object-contain'
							alt=''
						/>
						<p className='text-xs'>
							Congratulation! you are successfully completed the assessment.
						</p>
					</div>
					<h1 className='font-semibold md:text-sm text-lg text-yellow-600'>
						<span>{result.stream}</span> industry is best for you,
					</h1>

					<div className='flex flex-col gap-3'>
						<title className='md:text-sm text-lg'>Here are the results,</title>
						<p className='md:text-xs'>
							Based on our assessment, your personality appears well-suited in{' '}
							<span>{result.stream}</span> industry. We recommend the following
							courses. As we believe you have the potential to excel in it.
						</p>
					</div>
					<div className='flex flex-wrap gap-2 lg:gap-4'>
						{result.courses.map(course => (
							<div
								key={course.id}
								className='rounded-lg text-sm bg-white p-4 md:p-2 lg:p-2 capitalize text-black'
							>
								{course.name}
							</div>
						))}
					</div>
					<h1 className='font-semibold text-lg md:text-sm'>
						Feel free to contact us,
					</h1>
					<p className='text-xs'>
						For more information about our educational group for professional
						studies, please feel free to contact us. Our team is happy to assist
						you with inquiries about programs, admissions, and other details.
					</p>
					<div className='flex gap-3 text-lg md:text-sm'>
						<button className='bg-secondary-blue p-3 md:py-2 md:px-4 rounded-lg text-white'>
							Contact our executive
						</button>
						<Link
							to='/'
							className='md:py-2 md:px-4 py-3 px-8 border border-white rounded-lg'
						>
							Exit
						</Link>
					</div>
				</div>
			</div>
		)
	)
}

export default ShowResult
