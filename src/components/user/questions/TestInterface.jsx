import { useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
	useCreateResultMutation,
	useGetTestQuestionsQuery,
} from '../../../redux/apiSlices/studentApiSlice'
import { useState } from 'react'
import { Radio } from 'antd'
import { toast } from 'react-toastify'

function TestInterface() {
	const { data: test, isLoading, isSuccess } = useGetTestQuestionsQuery()
	const [createResult, { isLoading: creatingResult }] =
		useCreateResultMutation()
	const [questionNumber, setQuestionNumber] = useState(0)
	const [currentAnswer, setCurrentAnswer] = useState('')
	const [result, setResult] = useState([])
	const status = useSelector(state => state.status.status)
	const studentId = useSelector(state => state.student.student)
	const navigate = useNavigate()
	const location = useLocation()

	const nextQuestion = async () => {
		if (currentAnswer === '') return toast.error('Please choose an answer')
		if (questionNumber !== test.length - 1) {
			setResult(prev => [
				...prev,
				{
					questionId: test[questionNumber]._id,
					answerId: currentAnswer,
				},
			])
			setCurrentAnswer('')
			setQuestionNumber(questionNumber + 1)
		} else {
			try {
				const { data } = await createResult({
					studentId: studentId,
					result: [
						...result,
						{
							questionId: test[questionNumber]._id,
							answerId: currentAnswer,
						},
					],
				})
				if (data?.success) {
					toast.success('Your answer submitted successfully')
					navigate('/result')
				} else {
					toast.error('Something went wrong! Please try again later')
				}
			} catch (error) {
				console.error(error)
			}
		}
	}

	return status !== 'registered' ? (
		<Navigate to='/' state={{ from: location }} replace />
	) : (
		isSuccess && (
			<div
				loading={isLoading}
				className='h-dvh flex w-full font-merriweather lg:py-10 lg:px-72'
			>
				<div className='md:relative overflow-y-auto items-start w-full h-full md:h-auto flex m-auto flex-col gap-8 md:gap-4 p-4 lg:p-5 bg-theme-purple text-white md:rounded-lg overflow-hidden shadow-lg shadow-black/50'>
					<img
						src='/images/beat_logo.png'
						className='md:absolute h-20 md:top-5 md:w-20 object-contain md:right-5'
						alt=''
					/>
					<div>
						<img src='/images/thumps-up.png' className='md:h-24' alt='' />
						<p className='font font-extralight text-lg md:text-sm'>
							Congratulations! you are on the right path...{' '}
						</p>
					</div>

					<h1 className='font-bold text-xl md:text-md'>
						{questionNumber + 1}.{test[questionNumber]?.question}
					</h1>

					<div className='flex flex-col w-full gap-6 lg:gap-2 font-thin'>
						{test[questionNumber]?.answers.map(ans => (
							<label className='flex cursor-pointer justify-between bg-white text-black items-center w-full py-4 px-3 md:p-2 rounded-lg'>
								<h1 className='text-sm'>{ans.answer}</h1>
								<input
									type='radio'
									className='bg-green-500 size-6 cursor-pointer text-green-500 outline-2'
									name='answer'
									checked={currentAnswer === ans.id}
									value={ans.id}
									onChange={e => setCurrentAnswer(e.target.value)}
								/>
							</label>
						))}
					</div>
					<div className='flex flex-col gap-6 items-center w-full md:flex-row justify-between'>
						<div className='md:flex hidden items-center gap-3'>
							<p className='text-xs'>
								{questionNumber + 1}/{test.length}
							</p>
						</div>
						<button
							onClick={nextQuestion}
							disabled={creatingResult}
							className='bg-secondary-blue w-full md:w-auto p-4 rounded text-white'
						>
							{test.length - 1 === questionNumber ? 'Submit' : 'Next'}
						</button>
						<div className='flex md:hidden items-center gap-3'>
							<p className='text-xs'>
								{questionNumber + 1}/{test.length}
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	)
}

export default TestInterface
