import { useNavigate } from 'react-router-dom'
import { useGetAllQuestionsQuery } from '../../../redux/apiSlices/questonsSlice'
import SingleQuestion from './SingleQuestion'
import { ImSpinner } from 'react-icons/im'

function Questions() {
	const navigate = useNavigate()
	const { data: questions, isLoading, isSuccess } = useGetAllQuestionsQuery()
	return isLoading ? (
		<div className='w-full flex justify-center items-center p-4'>
			<ImSpinner className='animate-spin' />
		</div>
	) : (
		<div className='w-full flex flex-col gap-4'>
			<div className='flex justify-between border p-4 items-center border-secondary-green rounded-lg bg-secondary-white border-dashed'>
				<h1 className='font-bold text-xl'>Manage Questions</h1>
				<button
					onClick={() => navigate('/admin/add-question')}
					className='rounded px-4 py-2 bg-secondary-green text-white'
				>
					+Add New
				</button>
			</div>
			<div className='flex flex-col gap-5'>
				{isSuccess &&
					questions.map(question => (
						<SingleQuestion key={question._id} question={question} />
					))}
			</div>
		</div>
	)
}

export default Questions
