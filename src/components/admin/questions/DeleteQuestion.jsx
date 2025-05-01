import { Popconfirm } from 'antd'
import { FcFullTrash } from 'react-icons/fc'
import { useDeleteQuestionMutation } from '../../../redux/apiSlices/questonsSlice'
import { toast } from 'react-toastify'

function DeleteQuestion({ questionId }) {
	const [removeQuestion] = useDeleteQuestionMutation()

	const handleDelete = async () => {
		try {
			const { data } = await removeQuestion(questionId)
			if (data?.success) {
				toast.success(data.message)
			} else toast.error(data?.message)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<Popconfirm
			title='Delete the question?'
			description='Are you sure to delete this question?'
			onConfirm={handleDelete}
			okText='Yes'
			cancelText='No'
		>
			<button className='p-2 text-white flex items-center gap-2 rounded-lg bg-theme-red'>
				<h1>Delete</h1>
				<FcFullTrash />
			</button>
		</Popconfirm>
	)
}

export default DeleteQuestion
