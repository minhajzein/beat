import SingleStream from './SingleStream'
import {
	useCreateStreamMutation,
	useGetAllStreamsQuery,
} from '../../../../redux/apiSlices/streamSlice'
import { useState } from 'react'
import { ImSpinner } from 'react-icons/im'

function Streams() {
	const {
		data: streams,
		isLoading: dataLoading,
		isSuccess,
	} = useGetAllStreamsQuery()
	const [createStream, { isLoading, isError }] = useCreateStreamMutation()

	const [newStream, setNewStream] = useState('')

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			if (newStream === '') return toast.error('Please Enter a Question Type')
			const { data } = await createStream({ stream: newStream })
			if (data.success) {
				setNewStream('')
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
					className='p-2 text-sm border border-secondary-green w-full rounded outline-none'
					placeholder='Add New Stream...'
					newStream='text'
					value={newStream}
					onChange={e => setNewStream(e.target.value)}
				/>
				<button
					newStream='submit'
					disabled={isLoading}
					className='px-4 py-1 bg-secondary-green rounded text-white'
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
				streams.map(stream => (
					<SingleStream key={stream._id} stream={stream} />
				))}
		</div>
	)
}

export default Streams
