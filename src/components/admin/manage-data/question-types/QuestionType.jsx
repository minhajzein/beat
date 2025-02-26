import { useState } from 'react'
import {
	useCreateQuestionTypeMutation,
	useGetAllQuestionTypesQuery,
} from '../../../../redux/apiSlices/questionTypeSlice'
import { toast } from 'react-toastify'
import SingleQuestionType from './SingleQuestionType'
import { ImSpinner } from 'react-icons/im'

function QuestionType() {
	const {
		data: questionTypes,
		isLoading: dataLoading,
		isSuccess,
	} = useGetAllQuestionTypesQuery()
	const [createQuestionType, { isLoading, isError }] =
		useCreateQuestionTypeMutation()

	const [type, setType] = useState('')

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			if (type === '') return toast.error('Please Enter a Question Type')
			const { data } = await createQuestionType({ type })
			if (data.success) {
				setType('')
				toast.success(data.message)
			} else {
				toast.error('Question Type Creation Failed')
			}
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<div className='flex flex-col gap-4 w-full'>
			<form onSubmit={handleSubmit} className='flex w-full gap-4'>
				<input
					className='p-2 text-xs shadow shadow-black w-full rounded outline-none'
					placeholder='Add New Question Type...'
					type='text'
					value={type}
					onChange={e => setType(e.target.value)}
				/>
				<button
					type='submit'
					disabled={isLoading}
					className='px-4 py-1 bg-theme-red rounded text-white'
				>
					{isLoading ? <ImSpinner className='animate-spin' /> : '+Add'}
				</button>
			</form>
			{dataLoading && (
				<div className='w-full flex justify-center items-center p-4'>
					<ImSpinner className='animate-spin' />
				</div>
			)}
			{isSuccess &&
				questionTypes.map(questionType => (
					<SingleQuestionType
						key={questionType._id}
						questionType={questionType}
					/>
				))}
		</div>
	)
}

export default QuestionType
