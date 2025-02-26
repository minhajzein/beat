import { useNavigate } from 'react-router-dom'
import { useGetAllQuestionsQuery } from '../../../redux/apiSlices/questonsSlice'
import SingleQuestion from './SingleQuestion'

function Questions() {
	const navigate = useNavigate()
	const { data: questions, isLoading, isSuccess } = useGetAllQuestionsQuery()
	return (
		<div className='w-full flex flex-col gap-4'>
			<div className='flex justify-between'>
				<h1 className='font-bold text-xl'>Questions</h1>
				<button
					onClick={() => navigate('/admin/add-question')}
					className='rounded px-4 py-2 bg-theme-red text-white'
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
