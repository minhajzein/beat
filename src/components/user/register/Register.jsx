import {
	Loading3QuartersOutlined,
	MailOutlined,
	RocketOutlined,
	TrophyOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { Input } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRegisterMutation } from '../../../redux/apiSlices/studentApiSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changeStatus } from '../../../redux/slices/statusSlice'

//================================================================================================

function Register() {
	const [register, { isLoading, isError, error }] = useRegisterMutation()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const formik = useFormik({
		initialValues: {
			firstName: '',
			surname: '',
			email: '',
			phone: '',
			highestQualification: '',
		},
		validationSchema: Yup.object({
			firstName: Yup.string('First Name should be letters'),
			surname: Yup.string('Surname should be letters').required().min(3),
			email: Yup.string()
				.matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'email not valid')
				.email('Invalid email address')
				.required('email is required'),
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
					navigate('/take-test')
				} else {
					toast.error('Registration failed! Please try again')
				}
			} catch (error) {
				console.error(error)
			}
		},
	})

	return (
		<div className='h-dvh w-full font-merriweather font-thin bg-theme-red lg:p-24'>
			<div className='h-full w-full grid lg:grid-cols-2 lg:rounded-lg overflow-hidden shadow-lg shadow-black'>
				<div className='hidden lg:block'>
					<img
						className='w-full h-full object-cover'
						src='/images/register-image.jpg'
						alt=''
					/>
				</div>
				<div className='bg-theme-purple text-white flex flex-col w-full relative justify-evenly'>
					<img
						className='absolute top-0 right-0 w-1/2 z-10 object-contain'
						src='/images/theme-png.png'
						alt=''
					/>
					<img
						className='w-1/2 object-contain'
						src='/images/beat_logo.png'
						alt=''
					/>
					<h1 className='text-center text-lg z-20'>Registration Form</h1>
					<form
						onSubmit={formik.handleSubmit}
						className='px-8 flex flex-col gap-2 z-20'
					>
						<div className='grid lg:grid-cols-2 gap-4 w-full'>
							<div className='flex flex-col'>
								<label className='text-xs' htmlFor='firstName'>
									First Name(optional)
								</label>
								<Input
									addonBefore={<UserOutlined />}
									name='firstName'
									onChange={formik.handleChange}
									value={formik.values.firstName}
									className='w-full p-1 rounded bg-white outline-none shadow shadow-black/50 text-sm text-black'
									type='text'
								/>
								{formik.touched.firstName && formik.errors.firstName && (
									<p className='text-xs text-red-500'>
										{formik.errors.firstName}
									</p>
								)}
							</div>
							<div className='flex flex-col'>
								<label className='text-xs' htmlFor='surname'>
									Surname
								</label>
								<Input
									addonBefore={<UserOutlined />}
									name='surname'
									onChange={formik.handleChange}
									value={formik.values.surname}
									className='w-full p-1 rounded bg-white outline-none shadow shadow-black/50 text-sm text-black'
									type='text'
								/>
								{formik.touched.surname && formik.errors.surname && (
									<p className='text-xs text-red-500'>
										{formik.errors.surname}
									</p>
								)}
							</div>
						</div>
						<div className='grid lg:grid-cols-2 gap-4 w-full'>
							<div className='flex flex-col'>
								<label className='text-xs' htmlFor='firstName'>
									Email Address
								</label>
								<Input
									addonBefore={<MailOutlined />}
									name='email'
									onChange={formik.handleChange}
									value={formik.values.email}
									className='w-full p-1 bg-white rounded outline-none shadow shadow-black/50 text-sm text-black'
									type='text'
								/>
								{formik.touched.email && formik.errors.email && (
									<p className='text-xs text-red-500'>{formik.errors.email}</p>
								)}
							</div>
							<div className='flex flex-col'>
								<label className='text-xs' htmlFor='surname'>
									Phone Number
								</label>
								<Input
									addonBefore='+91'
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
						</div>
						<div className='grid lg:grid-cols-2 gap-4 w-full'>
							<div className='flex flex-col'>
								<label className='text-xs' htmlFor='firstName'>
									Highest Qualification
								</label>
								<Input
									addonBefore={<TrophyOutlined />}
									name='highestQualification'
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
							<div
								className={`${
									formik.errors.highestQualification &&
									formik.touched.highestQualification
										? 'flex flex-col justify-center'
										: 'flex flex-col justify-end'
								}`}
							>
								<button
									type='submit'
									disabled={isLoading}
									className='bg-theme-red rounded py-2 shadow-lg shadow-black hover:scale-95 duration-300'
								>
									{isLoading ? (
										<Loading3QuartersOutlined className='animate-spin' />
									) : (
										<div>
											Register <RocketOutlined className='animate-bounce' />
										</div>
									)}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Register
