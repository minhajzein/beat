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
			<div className='h-dvh flex w-full font-merriweather font-thin lg:py-4 lg:px-64'>
				<div className='relative w-full h-full md:h-auto flex m-auto flex-col gap-3 overflow-y-auto p-2 lg:p-5 bg-theme-purple text-white md:rounded-lg overflow-hidden shadow-lg shadow-black/50'>
					<div>
						<img
							src='/images/celebration.png'
							className='h-24 object-contain'
							alt=''
						/>
						<p className='text-xs'>
							Congratulation! <span>Mr. Vipin</span> you are successfully
							completed the assessment.
						</p>
					</div>
					<h1 className='font-semibold text-sm text-yellow-600'>
						<span>{result.stream}</span> industry is best for you,
					</h1>
					<img
						src='/images/beat_logo.png'
						className='absolute lg:top-5 top-2 right-2 lg:w-20 object-contain lg:right-5'
						alt=''
					/>
					<div className='flex flex-col gap-3'>
						<title className='text-sm'>Here are the results,</title>
						<p className='text-xs'>
							Based on our assessment, your personality appears well-suited in{' '}
							<span>{result.stream}</span> industry. We recommend the following
							courses. As we believe you have the potential to excel in it.
						</p>
					</div>
					<div className='flex flex-wrap text-sm gap-2 lg:gap-4'>
						{result.courses.map(course => (
							<div
								key={course.id}
								className='rounded-lg bg-white p-2 capitalize text-black'
							>
								{course.name}
							</div>
						))}
					</div>
					<h1 className='font-semibold text-sm'>Feel free to contact us,</h1>
					<p className='text-xs'>
						For more information about our educational group for professional
						studies, please feel free to contact us. Our team is happy to assist
						you with inquiries about programs, admissions, and other details.
					</p>
					<div className='flex gap-3 text-sm'>
						<button className='bg-secondary-blue py-2 px-4 rounded-lg text-white'>
							Contact our executive
						</button>
						<Link to='/' className='py-2 px-4 border border-white rounded-lg'>
							Exit
						</Link>
					</div>
				</div>
			</div>
		)
	)
}

export default ShowResult
