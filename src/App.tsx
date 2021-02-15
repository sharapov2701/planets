import React, { useState, useEffect } from 'react'
import '@vkontakte/vkui/dist/vkui.css'
import bridge from '@vkontakte/vk-bridge'
import Intro from './views/Intro/Intro'
import Map from './views/Map/Map'
import Starship from './views/Starship/Starship'
import Researches from './views/Researches/Researches'
import Improvements from './views/Improvements/Improvements'
import Epic from './components/Epic'
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner'
import { fetchProgress, tenSecondBonus, timer, fiveMinutesBoost } from './redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { state } from './types'

const App = () => {
	const [activeStory, setActiveStory] = useState('intro')
	const [isIntroInfoFetched, setIsIntroInfoFetched] = useState<boolean>(false)
	const [isProgressFetched, setIsProgressFetched] = useState<boolean>(false)
	const player = useSelector((state: state) => state.player)
	const playTime = useSelector((state: state) => state.player.playTime)
	const dispatch = useDispatch()

	useEffect(() => {
		bridge.send('VKWebAppStorageGet', {'keys': ['sawIntro']})
			.then(({keys}) => {
				if (keys[0].value === 'true') {
					setActiveStory('starship')
					setIsIntroInfoFetched(true)
				}
			})
			.catch(e => console.log(e))
		
		bridge.send('VKWebAppStorageGet', {'keys': ['player']})
            .then(({keys}) => {
				const data = keys[0].value
				if (data.length) {
					dispatch(fetchProgress(JSON.parse(data)))
				}
				setIsProgressFetched(true)
			})
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

	useEffect(() => {
		if (playTime % 60 === 0) {
			const data = JSON.stringify(player)
			bridge.send("VKWebAppStorageSet", {"key": "player", "value": data})
				.catch(e => console.log(e))
		}
	}, [playTime])

	const go = (to: string): void => setActiveStory(to)

	return (
		isIntroInfoFetched && isProgressFetched
			? <Epic go={go} activeStory={activeStory}>
			      <Intro id='intro' go={go}/>
				  <Starship id='starship' />
			      <Map id='map' go={go}/>
				  <Researches id='researches' go={go} />
				  <Improvements id='improvements' go={go} />
			  </Epic>
			: <ScreenSpinner />
	)
}

export default App
