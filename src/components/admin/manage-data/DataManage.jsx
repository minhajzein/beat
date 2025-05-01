import React, { useState } from 'react'
import QuestionType from './question-types/QuestionType'
import Streams from './streams/Streams'
import Courses from './courses/Courses'

const datas = ['question-type', 'streams', 'courses']

function DataManage() {
	const [section, setSection] = useState(datas[0])
	return (
		<div className='flex flex-col gap-4 w-full'>
			<div className='w-full grid grid-cols-3 gap-4'>
				{datas.map(btn => (
					<button
						onClick={() => setSection(btn)}
						key={btn}
						className={`${
							section === btn
								? 'bg-theme-purple text-white p-2 rounded'
								: 'border border-theme-purple text-theme-purple p-2 rounded'
						} capitalize text-xs md:text-sm truncate`}
					>
						{btn}
					</button>
				))}
			</div>
			{section === 'question-type' ? (
				<QuestionType />
			) : section === 'streams' ? (
				<Streams />
			) : (
				<Courses />
			)}
		</div>
	)
}

export default DataManage
