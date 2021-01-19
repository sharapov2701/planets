import React from 'react'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Gallery from '@vkontakte/vkui/dist/components/Gallery/Gallery'
import Slide from './Slide/Slide'
import starship from '../../img/starship.png'

const Intro = ({ id, go }) => {
	return (
		<Panel id={id}>
			<PanelHeader>Звездная Лихорадка</PanelHeader>
			<Gallery
				bullets="light"
				style={{height: window.innerHeight - 53 }}
			>
				<Slide
					img={starship}
					go={go}
				>
					Добро пожаловать в Звездную Лихорадку!
				</Slide>
				<Slide
					img={starship}
					go={go}
				>
					Текст для второго слайда пока еще не придумал...
				</Slide>
				<Slide
					img={starship}
					go={go}
					withButton
					buttonText='Поехали!'
				>
					Спасибо за внимание!
				</Slide>
			</Gallery>
		</Panel>
	)
}

export default Intro
