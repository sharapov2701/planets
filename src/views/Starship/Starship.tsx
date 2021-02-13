import React, { useState } from 'react'
import View from '@vkontakte/vkui/dist/components/View/View'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import ProgressBarVertical from '../../components/ProgressBarVertical'
import { useDispatch, useSelector } from 'react-redux'
import { setCoords, click } from '../../redux/actions'
import { getNewPoint } from './helpers'
import starship from '../../img/starship.png'
import { state, IPanelProps } from '../../types'
import styles from './starship.module.scss'
import cn from 'classnames'

const Starship = ({ id }: Omit<IPanelProps, 'go'>) => {
	const dispatch = useDispatch()
	const score = useSelector((state: state) => state.player.score)
	const scorePerSecond = useSelector((state: state) => state.player.scorePerSecond)
	const { coords, target, speed } = useSelector((state: state) => state.player.currentStarship)
	const newPoint = getNewPoint(coords, target, speed)
	const [flight, setFlight] = useState(false)
	const tenSecondBonus = useSelector((state: state) => state.player.tenSecondBonus)
	const fiveMinutesBoost = useSelector((state: state) => state.player.fiveMinutesBoost)
	const fiveMinutesTimer = useSelector((state: state) => state.player.fiveMinutesTimer)
	const cometsEventCounter = useSelector((state: state) => state.player.cometsEventCounter)

	const handleClick = () => {
		dispatch(click())
		dispatch(setCoords(newPoint))
		setFlight(true)
		setTimeout(() => {
			setFlight(false)
		}, 500)
	}

	return (
		<View id={id} activePanel={id}>
			<Panel id={id}>
				<PanelHeader>Корабль</PanelHeader>
				<Div className={styles.root} style={{ height: window.innerHeight - 78 }}>
					<p className={styles.clicks}>{score}</p>
					<p className={styles.clicks}>{scorePerSecond} / сек</p>
					<p className={styles.clicks}>x{tenSecondBonus * fiveMinutesBoost}</p>
					<ProgressBarVertical className={styles.progressBarLeft} progress={fiveMinutesTimer / 3} />
					<span className={styles.fiveMin}>{Math.abs(300 - fiveMinutesTimer)}</span>
					<ProgressBarVertical className={styles.progressBarRight} progress={cometsEventCounter / 8} color={'red'} />
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
			</Panel>
		</View>
	)
}

export default Starship
