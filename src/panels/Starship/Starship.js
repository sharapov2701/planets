import React, { useState } from 'react'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Button from '@vkontakte/vkui/dist/components/Button/Button'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import Epic from '@vkontakte/vkui/dist/components/Epic/Epic'
import Tabbar from '@vkontakte/vkui/dist/components/Tabbar/Tabbar'
import TabbarItem from '@vkontakte/vkui/dist/components/TabbarItem/TabbarItem'
import { useDispatch, useSelector } from 'react-redux'
import { setCoords, setTotalClicksCount } from '../../redux/actions'
import { getNewPoint } from './helpers'
import starship from '../../img/starship.png'
import styles from './starship.module.scss'
import cn from 'classnames'

const Starship = ({ id, go }) => {
	const dispatch = useDispatch()
	const totalClicksCount = useSelector(state => state.totalClicksCount)
	const { coords, target, speed } = useSelector(state => state.currentStarship)
	const newPoint = getNewPoint(coords, target, speed)
	const [flight, setFlight] = useState(false)
	const handleClick = () => {
		dispatch(setTotalClicksCount())
		dispatch(setCoords(newPoint))
		setFlight(true)
		setTimeout(() => {
			setFlight(false)
		}, 500)
	}

	return (
		<Panel id={id}>
			<PanelHeader>Корабль</PanelHeader>
			<Div>
				<Button size="xl" level="2" onClick={go} data-to="map">
					Карта
				</Button>
				<br />
				<p className={styles.clicks}>Всего кликов: {totalClicksCount}</p>
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
					<TabbarItem>Исследования</TabbarItem>
					<TabbarItem>Улучшения</TabbarItem>
					<TabbarItem>Ускорения</TabbarItem>
					<TabbarItem>Достижения</TabbarItem>
					<TabbarItem>Рейтинг</TabbarItem>
				</Tabbar>
			</Epic>
		</Panel>
	)
}

export default Starship
