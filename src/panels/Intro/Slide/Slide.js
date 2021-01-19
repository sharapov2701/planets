import React from 'react'
import Button from '@vkontakte/vkui/dist/components/Button/Button'
import styles from './slide.module.scss'

const Slide = ({ img, withButton, buttonText, go, children }) => (
	<div className={styles.slide}>
		<img className={styles.img} src={img} />
		<p className={styles.text}>
			{children}
		</p>
		<div className={styles.btnWrapper}>
			{withButton && <Button className={styles.btn} onClick={go} data-to="starship" size="xl">
				{buttonText || 'Вперед'}
			</Button>}
		</div>
	</div>
)

export default Slide
