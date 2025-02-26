import { useState } from 'react'
import { ImSpinner } from 'react-icons/im'
import SingleCourse from './SingleCourse'
import {
	useCreateCourseMutation,
	useGetAllCoursesQuery,
} from '../../../../redux/apiSlices/courseSlice'
import { Select } from 'antd'
import { useGetAllStreamsQuery } from '../../../../redux/apiSlices/streamSlice'
import { toast } from 'react-toastify'

function Courses() {
	const {
		data: courses,
		isLoading: dataLoading,
		isSuccess,
	} = useGetAllCoursesQuery()
	const { data: streams } = useGetAllStreamsQuery()
	const [createCourse, { isLoading, isError }] = useCreateCourseMutation()

	const [newCourse, setNewCourse] = useState('')
	const [relatedStreams, setRelatedStreams] = useState([])

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			if (newCourse === '') return toast.error('Please Enter a Question Type')
			if (relatedStreams.length <= 0)
				return toast.error('Please Select Related Streams')
			const { data } = await createCourse({
				name: newCourse,
				relatedStreams: relatedStreams,
			})
			if (data.success) {
				setNewCourse('')
				toast.success('Stream Created Successfully')
			} else {
				toast.error('Stream Creation Failed')
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className='flex flex-col gap-4 w-full'>
			<form onSubmit={handleSubmit} className='flex w-full gap-4'>
				<input
					className='p-2 text-xs shadow shadow-black w-[50%] rounded outline-none'
					placeholder='Add New Course...'
					newCourse='text'
					value={newCourse}
					onChange={e => setNewCourse(e.target.value)}
				/>

				<Select
					placeholder='Related Streams'
					onChange={value => setRelatedStreams(value)}
					showSearch
					optionFilterProp='children'
					filterOption={(input, option) =>
						option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
						0
					}
					className='w-[50%] shadow shadow-black rounded'
					mode='multiple'
				>
					{streams?.map(stream => (
						<Select.Option value={stream.stream} key={stream._id}>
							{stream.stream}
						</Select.Option>
					))}
				</Select>
				<button
					newCourse='submit'
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
				courses.map(course => (
					<SingleCourse key={course._id} course={course} />
				))}
		</div>
	)
}

export default Courses
