import React, { useState, useRef } from 'react'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Button from '@vkontakte/vkui/dist/components/Button/Button'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import { useDispatch, useSelector } from 'react-redux'
import { setTarget } from '../../redux/actions'
import styles from './map.module.scss'

import { Stage, Layer } from 'react-konva'
import Planet from './sprites/Planet'

const Map = ({ id, go }) => {
	const planets = useSelector(state => state.planets)
	const dispatch = useDispatch()
	const startPoint = { x: 0, y: 0 }
	const layer = useRef(null)
	const [zoom, setZoom] = useState(1)
	const [mouse, setMouse] = useState(startPoint)
	const [moveShift, setMoveShift] = useState(startPoint)
	const [zoomShift, setZoomShift] = useState(startPoint)
	const [isMouseDown, setIsMouseDown] = useState(false)
	const [zoomShiftOnMove, setZoomShiftOnMove] = useState(startPoint)
	const map = { zoom, zoomShift, moveShift }

	// window.onmousedown = window.ontouchstart
	const onMouseDown = e => {
		setIsMouseDown(true)
		setMouse({
			x: (e.evt.pageX || e.evt.touches[0].pageX) - layer.current.offsetLeft,
			y: (e.evt.pageY || e.evt.touches[0].pageY) - layer.current.offsetTop
		})
	}
	
	// window.onmousemove = window.ontouchmove
	const onMouseMove = e => {
		const cursorCoords = {
			x: (e.evt.pageX || e.evt.touches[0].pageX) - layer.current.offsetLeft,
			y: (e.evt.pageY || e.evt.touches[0].pageY) - layer.current.offsetTop
		}
		setZoomShiftOnMove({
			x: cursorCoords.x / zoom - cursorCoords.x,
			y: cursorCoords.y / zoom - cursorCoords.y
		})
		if (isMouseDown) {
			setMoveShift({
				x: moveShift.x + (cursorCoords.x - mouse.x) / zoom,
				y: moveShift.y + (cursorCoords.y - mouse.y) / zoom
			})
			setMouse({ ...cursorCoords })
		}
	}

	// window.onmouseup = window.ontouchend
	const onMouseUp = () => {
		setIsMouseDown(false)
	}

	const onWheel = e => {
		const cursorCoords = {
			x: (e.evt.pageX || e.evt.touches[0].pageX) - layer.current.offsetLeft,
			y: (e.evt.pageY || e.evt.touches[0].pageY) - layer.current.offsetTop
		}
		if ((zoom > 0.2 && e.evt.deltaY >= 0) || e.evt.deltaY < 0) {
			setZoom((zoom - e.evt.deltaY / 1000).toFixed(1))
			setZoomShift(prev => ({
				x: cursorCoords.x / zoom - cursorCoords.x - (zoomShiftOnMove.x - prev.x),
				y: cursorCoords.y / zoom - cursorCoords.y - (zoomShiftOnMove.y - prev.y)
			}))
			setZoomShiftOnMove({
				x: cursorCoords.x / zoom - cursorCoords.x,
				y: cursorCoords.y / zoom - cursorCoords.y
			})
		}
	}

	const onClick = e => {
		const cursorCoords = {
			x: (e.evt.pageX || e.evt.touches[0].pageX) - layer.current.offsetLeft,
			y: (e.evt.pageY || e.evt.touches[0].pageY) - layer.current.offsetTop
		}
		const coords = {
			x: cursorCoords.x / zoom - zoomShift.x - moveShift.x,
			y: cursorCoords.y / zoom - zoomShift.y - moveShift.y
		}
		dispatch(setTarget(coords))
	}

	return (
		<Panel id={id}>
			<PanelHeader>Карта</PanelHeader>
			<Div>
				<div ref={layer}>
					<Button size="xl" level="2" onClick={go} data-to="starship">
						Корабль
					</Button>
					<br />
					<Stage
						width={window.innerWidth}
						height={window.innerHeight}
						onClick={onClick}
						onWheel={onWheel}
						onMouseDown={onMouseDown}
						onMouseUp={onMouseUp}
						onMouseMove={onMouseMove}
					>
						<Layer className={styles.canvas}>
							{planets.map((planet, i) => (
								<Planet
									src={planet.img}
									coords={planet.coords}
									scale={planet.scale}
									map={map}
									key={i}
								/>
							))}
						</Layer>
					</Stage>
				</div>
			</Div>
		</Panel>
	)
}

export default Map
