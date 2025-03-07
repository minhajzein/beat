import { useParams } from 'react-router-dom'
import { useGetProfileQuery } from '../../../redux/apiSlices/studentApiSlice'
import { FiPhone } from 'react-icons/fi'
import { ImSpinner } from 'react-icons/im'
import { GrLocation } from 'react-icons/gr'
import { FaUserGraduate } from 'react-icons/fa'

function UserProfile() {
	const { id } = useParams()
	const { data: profile, isLoading } = useGetProfileQuery(id)
	console.log(profile)

	return isLoading ? (
		<div className='w-full flex justify-center items-center p-4'>
			<ImSpinner className='animate-spin' />
		</div>
	) : (
		<div className='flex flex-col p-5 gap-5'>
			<div className='flex flex-col p-4 gap-2 bg-secondary-white rounded-xl border border-dashed border-secondary-green'>
				<div className='flex w-full justify-between font-semibold text-lg items-center'>
					<h1>{profile.student.fullName}</h1>
					<div className='rounded-lg p-3 bg-white text-theme-purple'>
						Attempts: {profile.result.length}
					</div>
				</div>
				<div className='flex items-center gap-2'>
					<FiPhone />
					<h1>{profile.student.phone}</h1>
				</div>
				<div className='flex items-center gap-2'>
					<GrLocation />
					<h1>{profile.student.district}</h1>
				</div>
				<div className='flex items-center gap-2'>
					<FaUserGraduate />
					<h1>{profile.student.highestQualification}</h1>
				</div>
			</div>
			<div className='grid grid-cols-2'>
				{profile.result.map(res => (
					<div
						key={res._id}
						className='p-4 gap-2 bg-secondary-white rounded-xl border border-dashed border-secondary-green'
					></div>
				))}
			</div>
		</div>
	)
}

export default UserProfile
