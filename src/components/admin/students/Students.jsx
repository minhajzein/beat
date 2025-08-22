import { useRef, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Popconfirm, Space, Table, Tag } from 'antd'
import Highlighter from 'react-highlight-words'
import {
	useDeleteResponseMutation,
	useGetAllStudentQuery,
} from '../../../redux/apiSlices/studentApiSlice'
import { Link } from 'react-router-dom'
import { ImSpinner } from 'react-icons/im'
import { toast } from 'react-toastify'
import { PiExportBold } from 'react-icons/pi'
import { exportToPDF } from './exportData'

function Students() {
	const { data: students, isLoading, isError } = useGetAllStudentQuery()

	const handleExport = () => exportToPDF(students, 'students_data')

	const [searchText, setSearchText] = useState('')
	const [searchedColumn, setSearchedColumn] = useState('')
	const searchInput = useRef(null)
	const [open, setOpen] = useState('')
	const [deleteResponse, { isLoading: deleting }] = useDeleteResponseMutation()

	const showPopconfirm = id => {
		setOpen(id)
	}

	const handleOk = async () => {
		try {
			const { data } = await deleteResponse(open)
			if (data.success) toast.success(data.message)
		} catch (error) {
			console.error(error)
		}
	}

	const handleCancel = () => {
		setOpen('')
	}

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm()
		setSearchText(selectedKeys[0])
		setSearchedColumn(dataIndex)
	}

	const handleReset = clearFilters => {
		clearFilters()
		setSearchText('')
	}
	const getColumnSearchProps = dataIndex => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
			close,
		}) => (
			<div
				style={{
					padding: 8,
				}}
				onKeyDown={e => e.stopPropagation()}
			>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={e =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{
						marginBottom: 8,
						display: 'block',
					}}
				/>
				<Space>
					<Button
						type='primary'
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size='small'
						style={{
							width: 90,
						}}
					>
						Search
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size='small'
						style={{
							width: 90,
						}}
					>
						Reset
					</Button>
					<Button
						type='link'
						size='small'
						onClick={() => {
							confirm({
								closeDropdown: false,
							})
							setSearchText(selectedKeys[0])
							setSearchedColumn(dataIndex)
						}}
					>
						Filter
					</Button>
					<Button
						type='link'
						size='small'
						onClick={() => {
							close()
						}}
					>
						close
					</Button>
				</Space>
			</div>
		),
		filterIcon: filtered => (
			<SearchOutlined
				style={{
					color: filtered ? '#1677ff' : undefined,
				}}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		filterDropdownProps: {
			onOpenChange(open) {
				if (open) {
					setTimeout(() => searchInput.current?.select(), 100)
				}
			},
		},
		render: text =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{
						backgroundColor: '#ffc069',
						padding: 0,
					}}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text?.toString() : ''}
				/>
			) : (
				text
			),
	})
	const columns = [
		{
			title: 'Full Name',
			dataIndex: 'fullName',
			key: 'fullName',
			width: '20%',
			...getColumnSearchProps('fullName'),
		},
		{
			title: 'District',
			dataIndex: 'district',
			key: 'district',
			...getColumnSearchProps('district'),
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
			key: 'phone',
			...getColumnSearchProps('phone'),
		},
		{
			title: 'Qualification',
			dataIndex: 'highestQualification',
			key: 'highestQualification',
			width: '20%',
			...getColumnSearchProps('highestQualification'),
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			...getColumnSearchProps('status'),
			render: (_, { status }) => (
				<Tag
					color={
						status === 'contacted'
							? 'green'
							: status === 'submitted'
							? 'geekblue'
							: 'volcano'
					}
				>
					{status?.toUpperCase()}
				</Tag>
			),
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size='middle'>
					<Link to={`/admin/profile/${record._id}`}>Profile</Link>
					<Popconfirm
						title='Delete Student?'
						placement='left'
						description={`Delete data of ${record.fullName}`}
						open={open === record._id}
						onConfirm={handleOk}
						okButtonProps={{
							loading: deleting,
						}}
						onCancel={handleCancel}
					>
						<Button danger onClick={() => showPopconfirm(record._id)}>
							Delete
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	]

	return isLoading ? (
		<div className='w-full flex justify-center items-center p-4'>
			<ImSpinner className='animate-spin' />
		</div>
	) : (
		<div className='flex flex-col'>
			<div className='flex justify-between p-4'>
				<h1 className='text-xl font-bold capitalize'>
					Responses from students
				</h1>
				<button
					onClick={handleExport}
					className='px-3 py-1 capitalize flex justify-center items-center gap-2 rounded border duration-300 hover:bg-purple-500 hover:text-white border-purple-500 text-purple-500'
				>
					<PiExportBold />
					export data
				</button>
			</div>
			<Table
				className='w-full'
				columns={columns}
				pagination={{ pageSize: 7 }}
				dataSource={isLoading ? [] : students}
			/>
		</div>
	)
}

export default Students
