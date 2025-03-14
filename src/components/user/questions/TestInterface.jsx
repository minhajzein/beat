import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
	useCreateResultMutation,
	useGetTestQuestionsQuery,
} from '../../../redux/apiSlices/studentApiSlice'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { changeStatus } from '../../../redux/slices/statusSlice'
import Timer from './Timer'
import { Loading3QuartersOutlined } from '@ant-design/icons'

function TestInterface() {
	const { data: test, isLoading, isSuccess } = useGetTestQuestionsQuery()
	const [createResult, { isLoading: creatingResult }] =
		useCreateResultMutation()
	const [questionNumber, setQuestionNumber] = useState(0)
	const [currentAnswer, setCurrentAnswer] = useState('')
	const [result, setResult] = useState([])
	const [time, setTime] = useState(300)
	const status = useSelector(state => state.status.status)
	const studentId = useSelector(state => state.student.student)
	const navigate = useNavigate()
	const dispatch = useDispatch()
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
					timeTook: `${
						String(Math.floor((300 - time) / 60)).length === 1
							? '0' + Math.floor((300 - time) / 60)
							: Math.floor((300 - time) / 60)
					}:${(300 - time) % 60}`,
				})
				if (data?.success) {
					dispatch(changeStatus('submitted'))
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

	const onTimerEnd = async () => {
		try {
			if (result.length === 0) {
				dispatch(changeStatus(''))
				navigate('/')
				return toast.error('Your time is over, please try again')
			}
			toast.error('Your time is over')
			const { data } = await createResult({
				studentId: studentId,
				result: result,
				timeTook: `${Math.floor(time / 60)}:${time % 60}`,
			})
			if (data?.success) {
				dispatch(changeStatus('submitted'))
				toast.success('Your answer submitted successfully')
				navigate('/result')
			} else {
				toast.error('Something went wrong! Please try again later')
			}
		} catch (error) {
			console.error(error)
		}
	}

	return status === 'submitted' || !studentId ? (
		<Navigate to='/result' state={{ from: location }} replace />
	) : (
		isSuccess && (
			<div className='h-dvh flex w-full font-merriweather lg:py-10 lg:px-72'>
				<div className='md:relative overflow-y-auto items-start w-full h-full md:h-auto flex m-auto flex-col gap-4 p-4 lg:p-5 bg-theme-purple text-white md:rounded-lg overflow-hidden shadow-lg shadow-black/50'>
					<img
						src='/images/beat_logo.png'
						className='md:absolute h-16 md:top-5 md:w-20 object-contain md:right-5'
						alt=''
					/>
					<div>
						<img src='/images/thumps-up.png' className='h-24' alt='' />
						<p className='font font-extralight md:text-sm'>
							Congratulations! you are on the right path...{' '}
						</p>
					</div>

					<h1 className='font-bold text-xl md:text-md'>
						{questionNumber + 1}.{test[questionNumber]?.question}
					</h1>

					<div className='flex flex-col w-full gap-4 lg:gap-2 font-thin'>
						{test[questionNumber]?.answers.map(ans => (
							<label
								key={ans.id}
								className='flex cursor-pointer justify-between bg-white text-black items-center w-full py-4 px-3 md:p-2 rounded-lg'
							>
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
					<div className='flex gap-6 flex-col-reverse items-center w-full md:flex-row justify-between'>
						<div className='flex items-center gap-3'>
							<p className='text-xs'>
								{questionNumber + 1}/{test.length}
							</p>
							<Timer time={time} setTime={setTime} onTimerEnd={onTimerEnd} />
						</div>
						<button
							onClick={nextQuestion}
							disabled={creatingResult || isLoading}
							className='bg-secondary-blue w-full flex justify-center md:w-auto p-4 md:py-2 rounded text-white'
						>
							{creatingResult ? (
								<Loading3QuartersOutlined className='animate-spin m-auto' />
							) : test.length - 1 === questionNumber ? (
								'Submit'
							) : (
								'Next'
							)}
						</button>
					</div>
				</div>
			</div>
		)
	)
}

export default TestInterface
