import { FaRegQuestionCircle } from 'react-icons/fa'
import { Tag } from 'antd'
import { AiOutlineEdit } from 'react-icons/ai'
import DeleteQuestion from './DeleteQuestion'
import { Link } from 'react-router-dom'

function SingleQuestion({ question }) {
	return (
		<div className='flex flex-col border bg-secondary-white p-4 border-dashed border-secondary-green rounded-lg py-4'>
			<div className='flex gap-2 items-center'>
				<FaRegQuestionCircle className='text-theme-purple' />
				<h1 className='font-semibold text-lg'>{question.question}</h1>
			</div>
			<div>
				{question.answers.map(ans => (
					<div key={ans.id} className='flex gap-5 p-3 text-sm'>
						<h1>{ans.answer}</h1>

						<Tag color='purple'>
							<span className='text-gray-700'>Stream: </span>
							{ans.stream}
						</Tag>
					</div>
				))}
			</div>
			<div className='flex gap-4'>
				<Link
					to={`/admin/questions/${question._id}`}
					className='p-2 rounded-lg flex items-center gap-2 bg-secondary-green text-white'
				>
					<h1>Edit</h1>
					<AiOutlineEdit />
				</Link>
				<DeleteQuestion questionId={question._id} />
			</div>
		</div>
	)
}

export default SingleQuestion
