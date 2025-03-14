import { useParams } from 'react-router-dom'
import { useGetProfileQuery } from '../../../redux/apiSlices/studentApiSlice'
import { FiPhone } from 'react-icons/fi'
import { ImSpinner } from 'react-icons/im'
import { GrLocation } from 'react-icons/gr'
import { FaUserGraduate } from 'react-icons/fa'
import { LuAlarmClockCheck, LuCalendarDays, LuDownload } from 'react-icons/lu'
import { RiTimerLine } from 'react-icons/ri'
import moment from 'moment'
import generatePDF from '../../../utils/generateResultPdf'

function UserProfile() {
	const { id } = useParams()
	const { data: profile, isLoading } = useGetProfileQuery(id)

	return isLoading ? (
		<div className='w-full flex justify-center items-center p-4'>
			<ImSpinner className='animate-spin' />
		</div>
	) : !profile?.success ? (
		<div className='flex p-5 justify-center rounded-xl items-center border border-dashed border-secondary-green'>
			No results found
		</div>
	) : (
		<div className='flex flex-col p-5 gap-5'>
			<div className='flex flex-col p-5 gap-2 bg-secondary-white rounded-xl border border-dashed border-secondary-green'>
				<div className='flex w-full justify-between font-semibold text-lg items-center'>
					<h1>{profile.student.fullName}</h1>
					<div className='rounded-lg p-3 bg-white text-theme-purple'>
						Total Attempts: {profile.result.length}
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
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				{profile.result.map((res, i) => (
					<div
						key={res._id}
						className='p-4 gap-3 flex flex-col rounded-xl border border-dashed border-secondary-green'
					>
						<div className='flex justify-between items-center'>
							<h1 className='font-bold'>Attempt: {i + 1}</h1>
							<div className='flex justify-center items-center gap-1 rounded-lg py-1 px-2 bg-secondary-white text-theme-purple'>
								<img src='/images/stream.png' alt='stream' />
								<h1>{res.stream}</h1>
							</div>
						</div>
						<div className='flex justify-center gap-2 items-center text-sm'>
							<p className='flex gap-1 justify-center items-center'>
								<LuCalendarDays />
								{moment(res.createdAt).format('DD/MM/YYYY')}
							</p>
							<span className='text-theme-purple'> | </span>
							<p className='flex gap-1 justify-center items-center'>
								<LuAlarmClockCheck />
								{moment(res.createdAt).format('LT')}
							</p>
							<span className='text-theme-purple'> | </span>
							<p className='flex gap-1 justify-center items-center'>
								<RiTimerLine />
								{res.timeTook} Mins
							</p>
						</div>
						<button
							onClick={() => generatePDF(profile, i)}
							className='bg-secondary-green justify-center flex gap-1 items-center text-white p-2 rounded-lg'
						>
							<p>Download Answer Sheet</p>
							<LuDownload />
						</button>
					</div>
				))}
			</div>
		</div>
	)
}

export default UserProfile
