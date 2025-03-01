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
			<div loading={isLoading} className='h-dvh w-full lg:p-24 bg-theme-purple'>
				<div className='relative w-full h-full rounded-lg overflow-hidden shadow-lg shadow-black/50'>
					<img
						className='w-full h-full object-cover'
						src='/images/register-image.jpg'
						alt=''
					/>
					<div className='w-full flex flex-col gap-5 text-white p-5 absolute top-0 left-0 h-full bg-gradient-to-b from-black from-20% to-transparent'>
						<h1 className='font-bold'>
							{questionNumber + 1}.{test[questionNumber]?.question}
						</h1>
						<div className='bg-white/50 backdrop-blur-sm p-5 rounded'>
							<Radio.Group
								className='flex flex-col gap-5 text-white'
								value={currentAnswer}
								onChange={e => setCurrentAnswer(e.target.value)}
							>
								{test[questionNumber]?.answers.map(ans => (
									<Radio key={ans.id} value={ans.id}>
										{ans.answer}
									</Radio>
								))}
							</Radio.Group>
							<label>
								<input type='radio' name='gender' value='male' /> Male
							</label>
						</div>
						<div className='flex justify-end'>
							<button
								onClick={nextQuestion}
								disabled={creatingResult}
								className='bg-theme-red py-2 px-4 rounded text-white'
							>
								{test.length - 1 === questionNumber
									? 'Submit'
									: 'Next Question'}
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	)
}

export default TestInterface
