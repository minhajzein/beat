import { FaRegQuestionCircle } from 'react-icons/fa'
import { Tag } from 'antd'
import { AiOutlineEdit } from 'react-icons/ai'
import { FcFullTrash } from 'react-icons/fc'

function SingleQuestion({ question }) {
	return (
		<div className='flex flex-col border-b border-theme-purple py-4'>
			<div className='flex justify-between items-center'>
				<div className='flex gap-2 items-center'>
					<FaRegQuestionCircle className='text-theme-purple' />
					<h1 className='font-semibold'>{question.question}</h1>
				</div>
				<div className='flex gap-4'>
					<button className='p-2 rounded bg-theme-purple text-white'>
						<AiOutlineEdit />
					</button>
					<button className='p-2 rounded bg-theme-red'>
						<FcFullTrash />
					</button>
				</div>
			</div>
			<p className='text-xs'>({question.questionType})</p>
			<div>
				{question.answers.map(ans => (
					<div key={ans.id} className='flex gap-5 p-3 text-sm'>
						<h1>{ans.answer}</h1>

						<Tag>
							<span className='text-gray-700'>Stream: </span>
							{ans.stream}
						</Tag>
					</div>
				))}
			</div>
		</div>
	)
}

export default SingleQuestion
