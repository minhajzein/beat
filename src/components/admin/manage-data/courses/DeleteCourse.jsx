import { Popconfirm } from 'antd'
import { FcFullTrash } from 'react-icons/fc'
import { useDeleteCourseMutation } from '../../../../redux/apiSlices/courseSlice'
import { toast } from 'react-toastify'

function DeleteCourse({ courseId }) {
	const [removeCourse] = useDeleteCourseMutation()

	const handleDelete = async () => {
		try {
			const { data } = await removeCourse(courseId)
			if (data?.success) {
				toast.success(data.message)
			} else toast.error(data?.message)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<Popconfirm
			title='Delete the course?'
			description='Are you sure to delete this course?'
			onConfirm={handleDelete}
			okText='Yes'
			cancelText='No'
			placement='left'
		>
			<button className='p-4 rounded bg-theme-red text-white'>
				<FcFullTrash />
			</button>
		</Popconfirm>
	)
}

export default DeleteCourse
