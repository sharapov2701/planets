import React, { useState, useEffect } from 'react'
import '@vkontakte/vkui/dist/vkui.css'
import bridge from '@vkontakte/vk-bridge'
import Intro from './views/Intro/Intro'
import Map from './views/Map/Map'
import Starship from './views/Starship/Starship'
import Researches from './views/Researches/Researches'
import Improvements from './views/Improvements/Improvements'
import Epic from './components/Epic'
import { tenSecondBonus, timer, fiveMinutesBoost } from './redux/actions'
import { useDispatch } from 'react-redux'

const App = () => {
	const [activeStory, setActiveStory] = useState('intro')
	const dispatch = useDispatch()

	useEffect(() => {
		bridge.send('VKWebAppStorageGet', {'keys': ['sawIntro']})
			.then(({keys}) => keys[0].value === 'true' && setActiveStory('starship'))
			.catch(e => console.log(e))
			
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
