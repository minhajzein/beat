import { Tag } from 'antd'
import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { FcFullTrash } from 'react-icons/fc'

function SingleCourse({ course }) {
	return (
		<div className='grid grid-cols-3 w-full rounded border border-secondary-green py-2 px-4'>
			<h1 className='font-semibold text-lg italic'>{course.name}</h1>
			<div className='flex flex-col gap-2'>
				<h1 className='text-xs'>Related Streams:</h1>
				<div className='flex gap-2'>
					{course.relatedStreams.map(stream => (
						<Tag key={stream} color='magenta'>
							{stream}
						</Tag>
					))}
				</div>
			</div>
			<div className='flex gap-4 justify-end'>
				<button className='p-4 rounded bg-secondary-green text-white'>
					<AiOutlineEdit />
				</button>
				<button className='p-4 rounded bg-theme-red text-white'>
					<FcFullTrash />
				</button>
			</div>
		</div>
	)
}

export default SingleCourse
