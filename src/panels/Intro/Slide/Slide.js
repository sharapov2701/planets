import React from 'react'
import Button from '@vkontakte/vkui/dist/components/Button/Button'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import starship from '../../../img/starship.png'
import styles from './slide.module.scss'

const Slide = ({ id, go, children }) => (
	<Div className={styles.slide}>
		<img className={styles.img} src={starship} />
		<p className={styles.text}>
			{children}
			<Button size="xl" level="2" onClick={go} data-to="home" stretched>
				Го играть!
			</Button>
		</p>
	</Div>
)

export default Slide
