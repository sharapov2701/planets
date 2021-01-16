import React from 'react'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Button from '@vkontakte/vkui/dist/components/Button/Button'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import { useDispatch, useSelector } from 'react-redux'
import { setCoords, setTotalClicksCount } from '../../redux/actions'
import { getNewPoint } from './helpers'
import starship from '../../img/starship.png'
import styles from './starship.module.scss'



const Starship = ({ id, go }) => {
	const dispatch = useDispatch()
	const totalClicksCount = useSelector(state => state.totalClicksCount)
	const { coords, target, speed } = useSelector(state => state.currentStarship)
	const newPoint = getNewPoint(coords, target, speed)
	const handleClick = () => {
		dispatch(setTotalClicksCount())
		dispatch(setCoords(newPoint))
	}

	return (
		<Panel id={id}>
			<PanelHeader>Корабль</PanelHeader>
			<Div>
				<Button size="xl" level="2" onClick={go} data-to="home">
					База
				</Button>
				<br />
				<Button size="xl" level="2" onClick={go} data-to="map">
					Карта
				</Button>
				<br />
				<p className={styles.clicks}>Всего кликов: {totalClicksCount}</p>
				<div className={styles.starshipWrapper} onClick={() => handleClick()}>
					<img className={styles.starship} src={starship} alt='Космический корабль'/>
				</div>
			</Div>
		</Panel>
	)
}

export default Starship
