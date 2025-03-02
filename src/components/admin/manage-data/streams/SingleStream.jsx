import { AiOutlineEdit } from 'react-icons/ai'
import { FcFullTrash } from 'react-icons/fc'

function SingleStream({ stream }) {
	return (
		<div className='flex justify-between items-center rounded border border-secondary-green py-2 px-4'>
			<h1>{stream.stream}</h1>
			<div className='flex gap-4'>
				<button className='p-2 rounded bg-secondary-green text-white'>
					<AiOutlineEdit />
				</button>
				<button className='p-2 rounded bg-theme-red text-white'>
					<FcFullTrash />
				</button>
			</div>
		</div>
	)
}

export default SingleStream
