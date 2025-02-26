import { Input, Select } from 'antd'
import { useGetAllQuestionTypesQuery } from '../../../redux/apiSlices/questionTypeSlice'
import { useGetAllStreamsQuery } from '../../../redux/apiSlices/streamSlice'
import { useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { v4 as idGenerator } from 'uuid'
import { toast } from 'react-toastify'
import { FcFullTrash } from 'react-icons/fc'
import { useCreateQuestionMutation } from '../../../redux/apiSlices/questonsSlice'
import { useNavigate } from 'react-router-dom'

function QuestionForm() {
	const { data: questionTypes } = useGetAllQuestionTypesQuery()
	const { data: streams } = useGetAllStreamsQuery()
	const [createQuestion, { isLoading }] = useCreateQuestionMutation()

	const [questionType, setQuestionType] = useState('')
	const [answer, setAnswer] = useState('')
	const [question, setQuestion] = useState('')
	const [selectedStream, setSelectedStream] = useState('Select a Stream')
	const [answers, setAnswers] = useState([])
	const navigate = useNavigate()

	const addAnswer = () => {
		if (answer === '' || selectedStream === 'Select a Stream')
			return toast.error('Please fill all fields')
		setAnswers(prev => [
			...prev,
			{ id: idGenerator(), answer: answer, stream: selectedStream },
		])
		setAnswer('')
		setSelectedStream('Select a Stream')
	}

	const deleteAnswer = id => {
		setAnswers(prev => prev.filter(x => x.id !== id))
	}

	const handleSubmit = async e => {
		e.preventDefault()
		if (questionType === '' || question === '')
			return toast.error('All fields are required')
		try {
			const { data } = await createQuestion({
				questionType: questionType,
				question: question,
				answers: answers,
			})
			if (data.success) {
				toast.success('Question saved successfully')
				setQuestion('')
				setQuestionType('')
				setAnswers([])
				navigate('/admin/questions')
			} else {
				toast.error('Error saving question')
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className='w-full flex flex-col gap-4'>
			<h1>Add New Question</h1>
			<form onSubmit={handleSubmit} className='w-full flex flex-col gap-5'>
				<div className='w-full flex flex-col'>
					<label htmlFor='questionType' className='text-sm text-gray-500'>
						Question Type
					</label>
					<Select
						placeholder='Please Select a Question Type'
						id='questionType'
						size='large'
						onChange={value => setQuestionType(value)}
						showSearch
						optionFilterProp='children'
						filterOption={(input, option) =>
							option.props.children
								.toLowerCase()
								.indexOf(input.toLowerCase()) >= 0
						}
						className='shadow w-full rounded'
					>
						{questionTypes?.map(type => (
							<Select.Option value={type.type} key={type._id}>
								{type.type}
							</Select.Option>
						))}
					</Select>
				</div>
				<div>
					<label htmlFor='question' className='text-sm text-gray-500'>
						Question
					</label>
					<TextArea
						id='question'
						value={question}
						onChange={e => setQuestion(e.target.value)}
						name='question'
						size='large'
					/>
				</div>
				<div>
					<label htmlFor='answer' className='text-sm text-gray-500'>
						Answers (minimum 3 answers)
					</label>
					<div className='flex flex-col gap-5'>
						<div className='flex justify-center items-center gap-5'>
							<Input
								id='answer'
								value={answer}
								onChange={e => setAnswer(e.target.value)}
								size='large'
							/>
							<Select
								placeholder='Related Streams'
								id='questionType'
								value={selectedStream}
								size='large'
								onChange={value => setSelectedStream(value)}
								showSearch
								optionFilterProp='children'
								filterOption={(input, option) =>
									option.props.children
										.toLowerCase()
										.indexOf(input.toLowerCase()) >= 0
								}
								className='shadow w-[50%] rounded'
							>
								{streams?.map(stream => (
									<Select.Option value={stream.stream} key={stream._id}>
										{stream.stream}
									</Select.Option>
								))}
							</Select>
							<button
								onClick={addAnswer}
								type='button'
								className='px-4 py-1 bg-theme-purple rounded text-white'
							>
								+Add
							</button>
						</div>
						{answers.map(answer => (
							<div
								key={answer.id}
								className='flex justify-center items-center gap-5'
							>
								<Input value={answer.answer} size='large' />
								<Input value={answer.stream} size='large' />
								<button
									onClick={() => deleteAnswer(answer.id)}
									className='px-4 py-1 bg-theme-red rounded text-white'
								>
									<FcFullTrash />
								</button>
							</div>
						))}
					</div>
				</div>
				{answers.length >= 3 && (
					<button
						className='px-4 py-1 bg-theme-purple rounded text-white'
						type='submit'
						disabled={isLoading}
					>
						Save Question
					</button>
				)}
			</form>
		</div>
	)
}

export default QuestionForm
