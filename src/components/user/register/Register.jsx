import {
	Loading3QuartersOutlined,
	PhoneOutlined,
	RocketOutlined,
	TrophyOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { Input, Select } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRegisterMutation } from '../../../redux/apiSlices/studentApiSlice'
import { toast } from 'react-toastify'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changeStatus } from '../../../redux/slices/statusSlice'
import { storeStudentId } from '../../../redux/slices/studentSlice'
import { keralaDistricts } from '../../../config/districts'

//================================================================================================

function Register() {
	const [register, { isLoading, isError, error }] = useRegisterMutation()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const location = useLocation()
	const status = useSelector(state => state.status.status)
	const studentId = useSelector(state => state.student.student)

	const formik = useFormik({
		initialValues: {
			fullName: '',
			district: '',
			phone: '',
			highestQualification: '',
		},
		validationSchema: Yup.object({
			fullName: Yup.string('First Name should be letters')
				.min(3)
				.required('Full Name is Required'),
			district: Yup.string().required('Please select a District'),
			phone: Yup.string()
				.required('mobile number is required')
				.matches(
					/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6-9]\d{9}$/,
					'mobile number is not valid'
				),
			highestQualification: Yup.string().required(
				'Please enter your highest qualification'
			),
		}),
		onSubmit: async user => {
			try {
				const { data } = await register({ ...user, status: 'registered' })
				if (data?.success) {
					toast.success('Registered successfully!')
					dispatch(changeStatus('registered'))
					dispatch(storeStudentId(data.studentId))
					navigate('/take-test')
				} else {
					toast.error('Registration failed! Please try again')
				}
			} catch (error) {
				console.error(error)
			}
		},
	})

	return status === 'registered' && studentId ? (
		<Navigate to='/take-test' state={{ from: location }} replace />
	) : status === 'submitted' && studentId ? (
		<Navigate to='/result' state={{ from: location }} replace />
	) : (
		<div className='h-dvh w-full font-merriweather flex'>
			<div className='max-w-2xl m-auto h-full md:h-auto lg:grid lg:grid-cols-2 lg:rounded-lg overflow-hidden shadow-lg shadow-black'>
				<img
					className='object-cover h-1/3 w-full object-top lg:h-full'
					src='/images/register-image.png'
					alt=''
				/>
				<div className='bg-theme-purple lg:h-full h-2/3 lg:p-8 p-4 gap-4 text-white flex flex-col w-full relative justify-end'>
					<img
						className='w-3/4 object-contain pb-2'
						src='/images/beat_logo.png'
						alt='logo'
					/>
					<h1 className='text-lg z-20'>Registration Form</h1>
					<form
						onSubmit={formik.handleSubmit}
						className='flex flex-col gap-4 z-20'
					>
						<div className='flex flex-col'>
							<label className='text-xs' htmlFor='fullName'>
								Full Name
							</label>
							<Input
								addonBefore={<UserOutlined />}
								name='fullName'
								placeholder='Enter your full name'
								onChange={formik.handleChange}
								value={formik.values.fullName}
								className='w-full p-1 rounded bg-white outline-none shadow shadow-black/50 text-black'
								type='text'
							/>
							{formik.touched.fullName && formik.errors.fullName && (
								<p className='text-xs text-red-500'>{formik.errors.fullName}</p>
							)}
						</div>
						<div className='flex flex-col'>
							<label className='text-xs' htmlFor='surname'>
								Phone Number
							</label>
							<Input
								addonBefore={<PhoneOutlined />}
								placeholder='9876543210'
								prefix='+91'
								name='phone'
								onChange={formik.handleChange}
								value={formik.values.phone}
								className='w-full p-1 bg-white rounded outline-none shadow shadow-black/50 text-sm text-black'
								type='text'
							/>
							{formik.touched.phone && formik.errors.phone && (
								<p className='text-xs text-red-500'>{formik.errors.phone}</p>
							)}
						</div>

						<div className='grid lg:grid-cols-2 gap-2 w-full'>
							<div className='flex flex-col'>
								<label className='text-xs' htmlFor='highestQualification'>
									Qualification
								</label>
								<Input
									addonBefore={<TrophyOutlined />}
									name='highestQualification'
									id='highestQualification'
									placeholder='Highest Education'
									onChange={formik.handleChange}
									value={formik.values.highestQualification}
									className='w-full p-1 bg-white rounded outline-none shadow shadow-black/50 text-sm text-black'
									type='text'
								/>
								{formik.touched.highestQualification &&
									formik.errors.highestQualification && (
										<p className='text-xs text-red-500'>
											{formik.errors.highestQualification}
										</p>
									)}
							</div>
							<div className='flex flex-col'>
								<label className='text-xs' htmlFor='district'>
									District
								</label>
								<Select
									placeholder='Select a District'
									className='w-full rounded shadow shadow-black/50 text-black'
									onChange={value => formik.setFieldValue('district', value)}
									showSearch
									size='large'
									optionFilterProp='children'
									filterOption={(input, option) =>
										option.props.children
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
									}
								>
									{keralaDistricts?.map(district => (
										<Select.Option value={district} key={district}>
											{district}
										</Select.Option>
									))}
								</Select>
								{formik.touched.district && formik.errors.district && (
									<p className='text-xs text-red-500'>
										{formik.errors.district}
									</p>
								)}
							</div>
						</div>
						<button
							type='submit'
							disabled={isLoading}
							className='bg-secondary-blue w-full rounded py-2 shadow-lg shadow-black hover:scale-95 duration-300'
						>
							{isLoading ? (
								<Loading3QuartersOutlined className='animate-spin' />
							) : (
								<div>
									Register <RocketOutlined className='animate-bounce' />
								</div>
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Register
