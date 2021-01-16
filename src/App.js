import React, { useState, useEffect } from 'react'
import bridge from '@vkontakte/vk-bridge'
import View from '@vkontakte/vkui/dist/components/View/View'
import '@vkontakte/vkui/dist/vkui.css'

import Home from './panels/Home/Home'
import Map from './panels/Map/Map'
import Starship from './panels/Starship/Starship'

const App = () => {
	const [activePanel, setActivePanel] = useState('home')

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme')
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light'
				document.body.attributes.setNamedItem(schemeAttribute)
			}
		})
	}, [])

	const go = e => setActivePanel(e.currentTarget.dataset.to)

	return (
		<View activePanel={activePanel} >
			<Home id='home' go={go} />
			<Map id='map' go={go} />
			<Starship id='starship' go={go} />
		</View>
	)
}

export default App