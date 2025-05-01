import { useGetAllStreamsQuery } from '../../../../redux/apiSlices/streamSlice'
import { Select } from 'antd'
import { ImSpinner } from 'react-icons/im'
import { useUpdateCourseMutation } from '../../../../redux/apiSlices/courseSlice'
import { toast } from 'react-toastify'
import { useState } from 'react'

function EditCourse({ course, disable }) {
	const [updateCourse, { isLoading }] = useUpdateCourseMutation()
	const { data: streams } = useGetAllStreamsQuery()
	const [courseName, setCourseName] = useState(course?.name)
	const [relatedStreams, setRelatedStreams] = useState(course?.relatedStreams)

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			if (courseName === '') return toast.error('Please Enter Course Name')
			if (relatedStreams.length <= 0)
				return toast.error('Please Select Related Streams')
			const { data } = await updateCourse({
				id: course._id,
				name: courseName,
				relatedStreams: relatedStreams,
			})
			if (data?.success) {
				setCourseName('')
				setRelatedStreams([])
				disable()
				toast.success(data.message)
			} else {
				toast.error(data?.message)
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<form onSubmit={handleSubmit} className='flex w-full gap-4'>
			<input
				className='p-2 text-sm border border-secondary-green w-[50%] rounded outline-none'
				placeholder='Add New Course...'
				type='text'
				value={courseName}
				onChange={e => setCourseName(e.target.value)}
			/>

			<Select
				placeholder='Related Streams'
				onChange={value => setRelatedStreams(value)}
				value={relatedStreams}
				showSearch
				optionFilterProp='children'
				filterOption={(input, option) =>
					option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
				className='w-[50%] text-sm border border-secondary-green rounded'
				mode='multiple'
			>
				{streams?.map(stream => (
					<Select.Option value={stream.stream} key={stream._id}>
						{stream.stream}
					</Select.Option>
				))}
			</Select>
			<div className='flex flex-col gap-1 justify-between'>
				<button
					type='button'
					disabled={isLoading}
					onClick={disable}
					className='px-4 py-1 capitalize bg-theme-red rounded text-white'
				>
					cancel
				</button>
				<button
					type='submit'
					disabled={isLoading}
					className='px-4 py-1 bg-secondary-green rounded text-white'
				>
					{isLoading ? <ImSpinner className='animate-spin' /> : 'Save'}
				</button>
			</div>
		</form>
	)
}

export default EditCourse
