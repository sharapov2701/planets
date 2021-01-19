import React from 'react'
import Button from '@vkontakte/vkui/dist/components/Button/Button'
import starship from '../../../img/starship.png'
import styles from './slide.module.scss'

const Slide = ({ go, children }) => (
	<div className={styles.slide}>
		<img className={styles.img} src={starship} />
		<p className={styles.text}>
			{children}
		</p>
		<div className={styles.btnWrapper}>
			<Button className={styles.btn} onClick={go} data-to="home" size="xl">
				Го играть!
			</Button>
		</div>
	</div>
)

export default Slide
