import React, { useState, useEffect } from 'react'
import bridge from '@vkontakte/vk-bridge'
import View from '@vkontakte/vkui/dist/components/View/View'
import '@vkontakte/vkui/dist/vkui.css'
import Intro from './panels/Intro/Intro'
import Map from './panels/Map/Map'
import Starship from './panels/Starship/Starship'
import Researches from './panels/Researches/Researches'
import Improvements from './panels/Improvements/Improvements'
import { tenSecondBonus, timer } from './redux/actions'
import { useDispatch, } from 'react-redux'

const App = () => {
	const [activePanel, setActivePanel] = useState('intro')
	const dispatch = useDispatch()

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme')
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light'
				document.body.attributes.setNamedItem(schemeAttribute)
			}
		})

		const timerInterval = () => dispatch(timer())
		const tenSecondInterval = () => dispatch(tenSecondBonus())

		setInterval(timerInterval, 1000)
		setInterval(tenSecondInterval, 10000)

		return () => {
			clearInterval(timerInterval)
			clearInterval(tenSecondInterval)
		}
	}, [])


	const go = e => setActivePanel(e.currentTarget.dataset.to)

	return (
		<View activePanel={activePanel}>
			<Intro id='intro' go={go} />
			<Starship id='starship' go={go} />
			<Map id='map' go={go} />
			<Researches id='researches' go={go} />
			<Improvements id='improvements' go={go} />
		</View>
	)
}

export default App
