import { useEffect, useState } from 'react'
import { FcAlarmClock } from 'react-icons/fc'
import { LuAlarmClock } from 'react-icons/lu'

function Timer({ time, setTime, onTimerEnd }) {
	useEffect(() => {
		if (time <= 0) {
			onTimerEnd && onTimerEnd()
			return
		}
		const timer = setInterval(() => {
			setTime(prevTime => prevTime - 1)
		}, 1000)

		return () => clearInterval(timer)
	}, [time])

	const minutes = Math.floor(time / 60)
	const seconds = time % 60

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
