import { Tag } from 'antd'
import { useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import DeleteCourse from './DeleteCourse'
import EditCourse from './EditCourse'

function SingleCourse({ course }) {
	const [editable, setEditabel] = useState(false)
	const handleEditable = () => setEditabel(true)
	const disable = () => setEditabel(false)

	return editable ? (
		<EditCourse course={course} disable={disable} />
	) : (
		<div className='grid grid-cols-3 w-full rounded border border-secondary-green gap-4 py-2 px-4'>
			<h1 className='font-semibold text-lg italic col-span-full md:col-span-1'>
				{course.name}
			</h1>
			<div className='flex flex-col col-span-2 md:col-span-1 gap-2'>
				<h1 className='text-xs'>Related Streams:</h1>
				<div className='flex flex-wrap gap-2'>
					{course.relatedStreams.map(stream => (
						<Tag key={stream} color='magenta'>
							{stream}
						</Tag>
					))}
				</div>
			</div>
			<div className='flex gap-4 justify-end'>
				<button
					onClick={handleEditable}
					className='p-4 rounded bg-secondary-green text-white'
				>
					<AiOutlineEdit />
				</button>
				<DeleteCourse courseId={course._id} />
			</div>
		</div>
	)
}

export default SingleCourse
