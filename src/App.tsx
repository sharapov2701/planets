import React, { useState, useEffect } from 'react'
import '@vkontakte/vkui/dist/vkui.css'
import Intro from './panels/Intro/Intro'
import Map from './panels/Map/Map'
import Starship from './panels/Starship/Starship'
import Researches from './panels/Researches/Researches'
import Improvements from './panels/Improvements/Improvements'
import Epic from './components/Epic'
import { tenSecondBonus, timer, fiveMinutesBoost } from './redux/actions'
import { useDispatch } from 'react-redux'

const App = () => {
	const [activeStory, setActiveStory] = useState('intro')
	const dispatch = useDispatch()

	useEffect(() => {
		const timerInterval = setInterval(() => dispatch(timer()), 1000)
		const tenSecondInterval = setInterval(() => dispatch(tenSecondBonus()), 10000)
		const fiveMinutesInterval = setInterval(() => dispatch(fiveMinutesBoost()), 300000)

		return () => {
			clearInterval(timerInterval)
			clearInterval(tenSecondInterval)
			clearInterval(fiveMinutesInterval)
		}
	}, [])

	const go = (to: string): void => setActiveStory(to)

	return (
		<Epic go={go} activeStory={activeStory}>
			<Intro id='intro' go={go}/>
			<Starship id='starship' />
			<Map id='map' go={go}/>
			<Researches id='researches' go={go} />
			<Improvements id='improvements' go={go} />
		</Epic>
	)
}

export default App
