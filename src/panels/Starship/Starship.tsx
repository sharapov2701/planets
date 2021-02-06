import React, { useState } from 'react'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Button from '@vkontakte/vkui/dist/components/Button/Button'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import Epic from '../../components/Epic'
import { useDispatch, useSelector } from 'react-redux'
import { setCoords, click } from '../../redux/actions'
import { getNewPoint } from './helpers'
import starship from '../../img/starship.png'
import { state, IPanelProps } from '../../types'
import styles from './starship.module.scss'
import cn from 'classnames'

const Starship = ({ id, go }: IPanelProps) => {
	const dispatch = useDispatch()
	const score = useSelector((state: state) => state.player.score)
	const scorePerSecond = useSelector((state: state) => state.player.scorePerSecond)
	const { coords, target, speed } = useSelector((state: state) => state.player.currentStarship)
	const newPoint = getNewPoint(coords, target, speed)
	const [flight, setFlight] = useState(false)
	const tenSecondBonus = useSelector((state: state) => state.player.tenSecondBonus)

	const handleClick = () => {
		dispatch(click())
		dispatch(setCoords(newPoint))
		setFlight(true)
		setTimeout(() => {
			setFlight(false)
		}, 500)
	}

	return (
		<Panel id={id}>
			<PanelHeader>Корабль</PanelHeader>
			<Div className={styles.root} style={{ height: window.innerHeight - 78 }}>
				<Button size="xl" onClick={go} data-to="map">
					Карта
				</Button>
				<br />
				<p className={styles.clicks}>{score}</p>
				<p className={styles.clicks}>{scorePerSecond} / сек</p>
				<p className={styles.clicks}>x{tenSecondBonus}</p>
				<div className={styles.starshipWrapper} onClick={() => handleClick()}>
					<img
						className={
							flight
							? cn(styles.starship, styles.starshipFlight)
							: styles.starship
						}
						src={starship}
						alt='Космический корабль'
					/>
				</div>
			</Div>
			<Epic />
		</Panel>
	)
}

export default Starship
