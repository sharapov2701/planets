import React from 'react'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Gallery from '@vkontakte/vkui/dist/components/Gallery/Gallery'
import Slide from './Slide/Slide'

const Intro = ({ id, go }) => {
	return (
		<Panel id={id}>
			<PanelHeader>Звездная Лихорадка</PanelHeader>
			<Gallery
				bullets="light"
				style={{height: window.innerHeight - 53 }}
				slideIndex={1}
			>
				<Slide go={go}>Добро пожаловать в Звездную Лихорадку!</Slide>
				<Slide go={go}>Текст для второго слайда пока еще не придумал...</Slide>
				<Slide go={go}>Спасибо за внимание!</Slide>
			</Gallery>
		</Panel>
	)
}

export default Intro
