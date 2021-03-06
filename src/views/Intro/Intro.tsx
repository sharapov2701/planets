import React, {useState} from 'react'
import bridge from '@vkontakte/vk-bridge'
import View from '@vkontakte/vkui/dist/components/View/View'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack'
import Gallery from '@vkontakte/vkui/dist/components/Gallery/Gallery'
import Slide from './Slide/Slide'
import { IPanelProps } from '../../types'
import starship from '../../img/starship.png'

const Intro = ({ id, go }: IPanelProps) => {
	const [slideIndex, setSlideIndex] = useState(0)
	const slides = [
		{
			img: {
				src: starship,
				alt: 'Космический корабль'
			},
			text: 'Добро пожаловать в Звездную Лихорадку!',
			go: nextSlide
		},
		{
			img: {
				src: starship,
				alt: 'Космический корабль'
			},
			text: 'Текст для второго слайда пока еще не придумал...',
			go: nextSlide
		},
		{
			img: {
				src: starship,
				alt: 'Космический корабль'
			},
			text: 'Спасибо за внимание!',
			go: () => {
				bridge.send("VKWebAppStorageSet", {"key": "sawIntro", "value": "true"})
					.then(() => go('starship'))
					.catch(e => console.log(e))
			},
			dataTo: 'starship',
			buttonText: 'Поехали!'
		},
	]

	function prevSlide() {
		if (slideIndex > 0) {
			setSlideIndex(slideIndex - 1)
		}
	}

	function nextSlide() {
		if (slideIndex < slides.length) {
			setSlideIndex(slideIndex + 1)
		}
	}


	return (
		<View id={id} activePanel={id}>
			<Panel id={id}>
				<PanelHeader left={slideIndex !== 0 && <PanelHeaderBack onClick={prevSlide}/>}>Звездная Лихорадка</PanelHeader>
				<Gallery
					bullets="light"
					style={{height: window.innerHeight - 53 }}
					slideIndex={slideIndex}
					onChange={slideIndex => setSlideIndex(slideIndex)}
				>
					{slides.map((slide, i) => (
						<Slide
							img={slide.img}
							text={slide.text}
							buttonText={slide.buttonText}
							go={slide.go}
							key={i}
						/>
					))}
				</Gallery>
			</Panel>
		</View>
	)
}

export default Intro
