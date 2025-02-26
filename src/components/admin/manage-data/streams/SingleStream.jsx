import { AiOutlineEdit } from 'react-icons/ai'
import { FcFullTrash } from 'react-icons/fc'

function SingleStream({ stream }) {
	return (
		<div className='flex justify-between items-center rounded border border-theme-red py-2 px-4'>
			<h1>{stream.stream}</h1>
			<div className='flex gap-4'>
				<button className='p-2 rounded bg-theme-purple text-theme-red'>
					<AiOutlineEdit />
				</button>
				<button className='p-2 rounded bg-theme-red'>
					<FcFullTrash />
				</button>
			</div>
		</div>
	)
}

export default SingleStream
