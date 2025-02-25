import { Input } from 'antd'
import { useFormik, yupToFormErrors } from 'formik'
import * as Yup from 'yup'

function Register() {
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
			email: Yup.string(),
		}),
	})
	return (
		<div className='h-dvh w-full font-merriweather font-thin relative p-8 lg:p-24'>
			<img
				className='w-full h-full object-cover absolute top-0 left-0 -z-10'
				src='/images/background-image.webp'
				alt=''
			/>
			<div className='h-full w-full grid grid-cols-2 rounded-lg overflow-hidden shadow-lg shadow-black'>
				<div>
					<img
						className='w-full h-full object-cover'
						src='/images/register-image.jpg'
						alt=''
					/>
				</div>
				<div className='bg-theme-purple text-white flex flex-col relative justify-evenly'>
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
					<form className='px-8 flex flex-col gap-2 z-20'>
						<div className='grid lg:grid-cols-2 gap-4 w-full'>
							<div className='flex flex-col'>
								<label className='text-xs' htmlFor='firstName'>
									First Name(optional)
								</label>
								<Input
									className='w-full p-1 rounded outline-none shadow shadow-black/50 text-sm text-theme-red'
									type='text'
								/>
								<p className='text-xs text-red-500'>error</p>
							</div>
							<div className='flex flex-col'>
								<label className='text-xs' htmlFor='surname'>
									Surname
								</label>
								<Input
									className='w-full p-1 rounded outline-none shadow shadow-black/50 text-sm text-theme-red'
									type='text'
								/>
								<p className='text-xs text-red-500'>error</p>
							</div>
						</div>
						<div className='grid lg:grid-cols-2 gap-4 w-full'>
							<div className='flex flex-col'>
								<label className='text-xs' htmlFor='firstName'>
									Email Address
								</label>
								<Input
									className='w-full p-1 rounded outline-none shadow shadow-black/50 text-sm text-theme-red'
									type='text'
								/>
								<p className='text-xs text-red-500'>error</p>
							</div>
							<div className='flex flex-col'>
								<label className='text-xs' htmlFor='surname'>
									Phone Number
								</label>
								<Input
									className='w-full p-1 rounded outline-none shadow shadow-black/50 text-sm text-theme-red'
									type='text'
								/>
								<p className='text-xs text-red-500'>error</p>
							</div>
						</div>
						<div className='grid lg:grid-cols-2 gap-4 w-full'>
							<div className='flex flex-col'>
								<label className='text-xs' htmlFor='firstName'>
									Highest Qualification
								</label>
								<Input
									className='w-full p-1 rounded outline-none shadow shadow-black/50 text-sm text-theme-red'
									type='text'
								/>
								<p className='text-xs text-red-500'>error</p>
							</div>
							<div className='flex flex-col justify-center'>
								<button className='bg-theme-red rounded p-1 shadow-lg shadow-black hover:scale-95 duration-300'>
									Register
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
