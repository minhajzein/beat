import { useEffect, useState } from 'react'
import { LuAlarmClock } from 'react-icons/lu'

function Timer({ initialTime, onTimerEnd }) {
	const [timeLeft, setTimeLeft] = useState(initialTime)

	useEffect(() => {
		if (timeLeft <= 0) {
			onTimerEnd && onTimerEnd()
			return
		}
		const timer = setInterval(() => {
			setTimeLeft(prevTime => prevTime - 1)
		}, 1000)

		return () => clearInterval(timer)
	}, [timeLeft])

	const minutes = Math.floor(timeLeft / 60)
	const seconds = timeLeft % 60

	return (
		<div className='flex gap-1'>
			<LuAlarmClock className='text-white' />
			<h2 className='text-xs font-bold'>
				{minutes}:{seconds.toString().padStart(2, '0')}
			</h2>
		</div>
	)
}

export default Timer
