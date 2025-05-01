import { ImSpinner } from 'react-icons/im'
import { v4 as idGenerator } from 'uuid'
import {
	useGetQuestionByidQuery,
	useUpdateQuestionMutation,
} from '../../../redux/apiSlices/questonsSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetAllQuestionTypesQuery } from '../../../redux/apiSlices/questionTypeSlice'
import { useGetAllStreamsQuery } from '../../../redux/apiSlices/streamSlice'
import { useEffect, useState } from 'react'
import { Loading3QuartersOutlined } from '@ant-design/icons'
import { Input, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { toast } from 'react-toastify'

function EditQuestion() {
	const { id } = useParams()
	const {
		data,
		isLoading: fetchingQuestion,
		isSuccess,
	} = useGetQuestionByidQuery(id)

	const { data: questionTypes, isLoading: fetchingTypes } =
		useGetAllQuestionTypesQuery()

	const { data: streams, isLoading: fetchingStreams } = useGetAllStreamsQuery()

	const [editQuestion, { isLoading }] = useUpdateQuestionMutation()

	const [questionType, setQuestionType] = useState(data?.questionType || '')
	const [answer, setAnswer] = useState('')
	const [question, setQuestion] = useState(data?.question || '')
	const [selectedStream, setSelectedStream] = useState('Select a Stream')
	const [answers, setAnswers] = useState(data?.answers || [])
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

		if (questionType === '' || question === '' || answers.length < 3)
			return toast.error('All fields are required')
		try {
			const { data } = await editQuestion({
				id: id,
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

	useEffect(() => {
		if (isSuccess) {
			setQuestionType(data.questionType)
			setAnswers(data?.answers)
			setQuestion(data?.question)
		}
	}, [isSuccess])

	return fetchingQuestion || fetchingStreams || fetchingTypes ? (
		<div className='w-full flex justify-center items-center p-4'>
			<ImSpinner className='animate-spin' />
		</div>
	) : (
		<div className='w-full flex flex-col gap-4'>
			<h1>Edit Question</h1>
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
						value={questionType}
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
				<div className='w-full'>
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
								className='p-3 bg-secondary-green rounded text-white'
							>
								<img src='/images/add.png' alt='+Add' />
							</button>
						</div>
						{answers.map(answer => (
							<div
								key={answer.id}
								className='flex justify-center items-center gap-5'
							>
								<Input
									className='border border-secondary-green'
									value={answer.answer}
									size='large'
								/>
								<Input
									className='border border-secondary-green'
									value={answer.stream}
									size='large'
								/>
								<button
									onClick={() => deleteAnswer(answer.id)}
									className='p-4 bg-theme-red rounded text-white'
								>
									<img src='/images/delete.png' alt='' />
								</button>
							</div>
						))}
					</div>
				</div>
				<div className='flex gap-5 justify-end'>
					<button
						className='px-8 py-2 border border-theme-purple rounded text-theme-purple'
						type='button'
						onClick={() => navigate('/admin/questions')}
						disabled={isLoading}
					>
						Back
					</button>
					{answers.length >= 3 && (
						<button
							className='px-8 py-2 bg-theme-purple rounded text-white'
							type='submit'
							disabled={isLoading}
						>
							{isLoading ? (
								<Loading3QuartersOutlined className='animate-spin' />
							) : (
								'Save'
							)}
						</button>
					)}
				</div>
			</form>
		</div>
	)
}

export default EditQuestion
