import React, { useEffect, useRef, useState } from 'react'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Button from '@vkontakte/vkui/dist/components/Button/Button'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import Epic from '@vkontakte/vkui/dist/components/Epic/Epic'
import Tabbar from '@vkontakte/vkui/dist/components/Tabbar/Tabbar'
import TabbarItem from '@vkontakte/vkui/dist/components/TabbarItem/TabbarItem'
import { useDispatch, useSelector } from 'react-redux'
import { setCoords, click } from '../../redux/actions'
import { getNewPoint, toggleGrayFilter } from './helpers'
import starship from '../../img/starship.png'
import styles from './starship.module.scss'
import cn from 'classnames'

const Starship = ({ id, go }) => {
	const dispatch = useDispatch()
	const score = useSelector(state => state.player.score)
	const scorePerSecond = useSelector(state => state.player.scorePerSecond)
	const totalClicksCount = useSelector(state => state.player.totalClicksCount)
	const { coords, target, speed } = useSelector(state => state.player.currentStarship)
	const newPoint = getNewPoint(coords, target, speed)
	const [flight, setFlight] = useState(false)
	const [grayFilterBeenUsed, setGrayFilterBeenUsed] = useState(false)
	const tenSecondBonus = useSelector(state => state.player.tenSecondBonus)

	const handleClick = () => {
		dispatch(click())
		dispatch(setCoords(newPoint))
		setFlight(true)
		setTimeout(() => {
			setFlight(false)
		}, 500)
	}

	useEffect(() => {
		switch (totalClicksCount) {
			case 5:
			case 30:
			case 50:
			case 100:
			case 1000:
				if (!grayFilterBeenUsed) {
					setGrayFilterBeenUsed(true)
					toggleGrayFilter()
					setTimeout(() => {
						toggleGrayFilter()
						setGrayFilterBeenUsed(true)
					}, 3000)
				}
				break
			default:
				setGrayFilterBeenUsed(false)
				break
		}
	})

	return (
		<Panel id={id}>
			<PanelHeader>Корабль</PanelHeader>
			<Div className={styles.root} style={{ height: window.innerHeight - 78 }}>
				<Button size="xl" level="2" onClick={go} data-to="map">
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
			<Epic>
				<Tabbar>
					{totalClicksCount >= 5 && <TabbarItem className={styles.tabbarItem} onClick={go} data-to='improvements' text='Улучшения' />}
					{totalClicksCount >= 30 && <TabbarItem className={styles.tabbarItem} onClick={go} data-to='researches' text='Исследования' />}
					{totalClicksCount >= 50 && <TabbarItem className={styles.tabbarItem} onClick={go} data-to='home' text='Звездный путь' />}
					{totalClicksCount >= 100 && <TabbarItem className={styles.tabbarItem} onClick={go} data-to='home' text='Достижения' />}
					{totalClicksCount >= 1000 && <TabbarItem className={styles.tabbarItem} onClick={go} data-to='home' text='Рейтинг' />}
				</Tabbar>
			</Epic>
		</Panel>
	)
}

export default Starship
