import React from 'react'
import Button from '@vkontakte/vkui/dist/components/Button/Button'
import styles from './slide.module.scss'

interface slideProps {
	img: {
		src: string,
		alt: string
	},
	buttonText?: string,
	text: string,
	go: any,
}

const Slide = ({ img, buttonText, text, go }: slideProps) => (
	<div className={styles.slide}>
		<img className={styles.img} src={img.src} alt={img.alt} />
		<p className={styles.text}>
			{text}
		</p>
		<div className={styles.btnWrapper}>
			<Button className={styles.btn} onClick={go} size="xl">
				{buttonText || 'Далее'}
			</Button>
		</div>
	</div>
)

export default Slide
