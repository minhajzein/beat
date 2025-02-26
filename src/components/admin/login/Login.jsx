import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { useLoginMutation } from '../../../redux/apiSlices/adminAuthSlice'
import usePersist from '../../../hooks/usePersist'
import { setCredentials } from '../../../redux/slices/authSlice'

function Login() {
	const [password, setPassword] = useState(true)
	const [adminLogin, { isLoading }] = useLoginMutation()

	const [adminPersist, setAdminPersist] = usePersist()
	const handleToggle = () => setAdminPersist(prev => !prev)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'email not valid')
				.email('Invalid email address')
				.required('email is required'),
			password: Yup.string().required('password is required'),
		}),
		onSubmit: async values => {
			try {
				const { data } = await adminLogin(values)
				if (data?.success) {
					dispatch(setCredentials(data.adminToken))
					navigate('/admin')
				} else {
					toast.error('Invalid Credentials', {
						position: 'top-center',
						theme: 'colored',
					})
				}
			} catch (error) {
				toast.error(error.data.message)
				console.error(error)
			}
		},
	})
	return isLoading ? (
		<div>Loading...</div>
	) : (
		<div className='h-screen w-full flex justify-center items-center lg:bg-none'>
			<img
				className='absolute -z-10 h-dvh w-full object-cover'
				src='/src/assets/images/admin-login.png'
				alt=''
			/>
			<div className='bg-theme-purple text-white w-[90%] md:w-[50%] h-auto rounded-3xl md:grid md:grid-cols-1 lg:grid-cols-2 p-3 gap-4'>
				<div className='flex items-center justify-center flex-col p-3'>
					<h1 className='uppercase font-bold text-xl text-center'>
						Beat Educations Admin
					</h1>
					<div className='pt-5 w-full'>
						<form
							className='flex flex-col gap-4'
							onSubmit={formik.handleSubmit}
						>
							<div className='w-full'>
								<label
									className={`block ml-3 text-xs sm:text-sm ${
										formik.errors.email ? 'text-red-500 animate-pulse' : ''
									}`}
									htmlFor='email'
								>
									{formik.errors.email ? formik.errors.email : 'email'}
								</label>
								<input
									className='w-full p-1 shadow-md rounded-lg text-black focus:border-lime-600'
									type='text'
									name='email'
									value={formik.values.email}
									onChange={formik.handleChange}
								/>
							</div>
							<div className='w-full'>
								<label
									className={`block ml-3 text-xs sm:text-sm ${
										formik.errors.password ? 'text-red-500 animate-pulse' : ''
									}`}
									htmlFor='password'
								>
									{formik.errors.password ? formik.errors.password : 'Password'}
								</label>
								<div className='w-full relative'>
									<input
										className='w-full shadow-md p-1 rounded-lg text-black focus:border-lime-600'
										type={password ? 'password' : 'text'}
										autoComplete='true'
										value={formik.values.password}
										name='password'
										onChange={formik.handleChange}
									/>
									<i
										onClick={() => setPassword(!password)}
										className={
											password
												? 'fa-solid fa-eye absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 cursor-pointer'
												: 'fa-sharp fa-solid fa-eye-slash absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 cursor-pointer'
										}
									></i>
								</div>
							</div>
							<div className='flex flex-row justify-between border-blue-500 rounded-md items-center border p-1 px-4'>
								<input
									className='bg-cyan-200 rounded-md border-blue-700 border-2'
									type='checkbox'
									id='persist'
									checked={adminPersist}
									onChange={handleToggle}
								/>
								<label className='ml-4 lg:text-sm text-xs' htmlFor='persist'>
									Trust this device
								</label>
							</div>
							<div className='w-full pt-4'>
								<button
									className='bg-theme-red p-2 shadow-md rounded-xl hover:scale-105 duration-300 w-full'
									type='submit'
								>
									LOGIN
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className='bg-cover bg-center rounded-2xl hidden lg:block'>
					<img
						className='w-full h-full object-cover rounded-xl'
						src='/src/assets/images/login-side.png'
						alt=''
					/>
				</div>
			</div>
			<ToastContainer />
		</div>
	)
}

export default Login
