import React, { useState } from 'react'
import QuestionType from './question-types/QuestionType'
import Streams from './streams/Streams'
import Courses from './courses/Courses'

function DataManage() {
	const [section, setSection] = useState('question-type')
	return (
		<div className='flex flex-col gap-4 w-full'>
			<div className='w-full grid grid-cols-3 gap-4'>
				<button
					onClick={() => setSection('question-type')}
					className={`${
						section === 'question-type'
							? 'bg-gray-800 text-white p-2 rounded'
							: 'bg-theme-red text-white p-2 rounded'
					}`}
				>
					Question Types
				</button>
				<button
					onClick={() => setSection('streams')}
					className={`${
						section === 'streams'
							? 'bg-gray-800 text-white p-2 rounded'
							: 'bg-theme-red text-white p-2 rounded'
					}`}
				>
					Streams
				</button>
				<button
					onClick={() => setSection('courses')}
					className={`${
						section === 'courses'
							? 'bg-gray-800 text-white p-2 rounded'
							: 'bg-theme-red text-white p-2 rounded'
					}`}
				>
					Courses
				</button>
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
