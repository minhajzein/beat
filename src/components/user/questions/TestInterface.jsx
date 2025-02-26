import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { useGetTestQuestionsQuery } from '../../../redux/apiSlices/studentApiSlice'
import { useState } from 'react'

function TestInterface() {
	const { data: test, isLoading, isSuccess } = useGetTestQuestionsQuery()
	const [questionNumber, setQuestionNumber] = useState(0)

	const status = useSelector(state => state.status.status)
	const location = useLocation()

	return status !== 'registered' ? (
		<Navigate to='/' state={{ from: location }} replace />
	) : (
		isSuccess && (
			<div className='h-dvh w-full lg:p-24 bg-theme-purple'>
				<div className='relative w-full h-full rounded-lg overflow-hidden shadow-lg shadow-black/50'>
					<img
						className='w-full h-full object-cover'
						src='/images/register-image.jpg'
						alt=''
					/>
					<div className='w-full flex flex-col gap-5 text-white p-5 absolute top-0 left-0 h-full bg-gradient-to-b from-black from-20% to-transparent'>
						<h1 className='font-bold'>{test[questionNumber].question}</h1>
						<div>
							{test[questionNumber].answers.map(ans => (
								<h1>{ans.answer}</h1>
							))}
						</div>
						<div className='flex justify-end'>
							<button className='bg-theme-red py-2 px-4 rounded text-white'>
								Next Question
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	)
}

export default TestInterface
