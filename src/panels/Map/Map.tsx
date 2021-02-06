import React, { useState, useRef, useEffect } from 'react'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Button from '@vkontakte/vkui/dist/components/Button/Button'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import { useDispatch, useSelector } from 'react-redux'
import { setTarget } from '../../redux/actions'
import styles from './map.module.scss'
import { Stage, Layer } from 'react-konva'
import MapSprite from './MapSprite/MapSprite'
import { state, IPanelProps, coords } from '../../types'

const Map = ({ id, go }: IPanelProps) => {
	const dispatch = useDispatch()
	const currentStarship = useSelector((state: state) => state.player.currentStarship)
	const planets = useSelector((state: state) => state.planets)
	const startPoint = { x: 0, y: 0 }
	const layer = useRef<HTMLDivElement>(null)
	const [zoom, setZoom] = useState<number>(1)
	const [mouse, setMouse] = useState<coords>(startPoint)
	const [moveShift, setMoveShift] = useState<coords>(startPoint)
	const [zoomShift, setZoomShift] = useState<coords>(startPoint)
	const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
	const [zoomShiftOnMove, setZoomShiftOnMove] = useState<coords>(startPoint)
	const map = { zoom, zoomShift, moveShift }

	const centerThePoint = (point: coords) => {
		if (layer.current) {
			const center = {
				x: layer.current.offsetWidth / 2 / zoom - zoomShift.x,
				y: layer.current.offsetHeight / 2 / zoom - zoomShift.y
			}
			setMoveShift({
				x: center.x - point.x,
				y: center.y - point.y
			})
		}
	}

	// window.onmousedown = window.ontouchstart
	const onMouseDown = (e: any) => {
		if (layer.current) {
			setIsMouseDown(true)
			setMouse({
				x: (e.evt.pageX || e.evt.touches[0].pageX) - layer.current.offsetLeft,
				y: (e.evt.pageY || e.evt.touches[0].pageY) - layer.current.offsetTop
			})
		}
	}
	
	// window.onmousemove = window.ontouchmove
	const onMouseMove = (e: any) => {
		if (layer.current) {
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
	}

	// window.onmouseup = window.ontouchend
	const onMouseUp = () => {
		setIsMouseDown(false)
	}

	const onWheel = (e: any) => {
		if (layer.current) {
			const cursorCoords = {
				x: (e.evt.pageX || e.evt.touches[0].pageX) - layer.current.offsetLeft,
				y: (e.evt.pageY || e.evt.touches[0].pageY) - layer.current.offsetTop
			}
			if ((zoom > 0.2 && e.evt.deltaY >= 0) || e.evt.deltaY < 0) {
				setZoom(prev => {
					const newZoom = Number((prev - e.evt.deltaY / 1000).toFixed(1))
					setZoomShift(prev => ({
						x: cursorCoords.x / newZoom - cursorCoords.x - (zoomShiftOnMove.x - prev.x),
						y: cursorCoords.y / newZoom - cursorCoords.y - (zoomShiftOnMove.y - prev.y)
					}))
					setZoomShiftOnMove({
						x: cursorCoords.x / newZoom - cursorCoords.x,
						y: cursorCoords.y / newZoom - cursorCoords.y
					})
					return newZoom
				})
			}
		}
	}

	const onClick = (e: any) => {
		if (layer.current) {
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
	}

	useEffect(() => {
		centerThePoint(currentStarship.coords)
	}, [])

	return (
		<Panel id={id}>
			<PanelHeader>Карта</PanelHeader>
			<Div>
				<Button size="xl" onClick={go} data-to="starship">
					Корабль
				</Button>
				<br />
				<div ref={layer}>
					<Stage
						width={window.innerWidth}
						height={window.innerHeight - 149}
						onClick={onClick}
						onWheel={onWheel}
						onMouseDown={onMouseDown}
						onMouseUp={onMouseUp}
						onMouseMove={onMouseMove}
					>
						<Layer className={styles.canvas}>
							{planets.map((sprite, i) => (
								<MapSprite
									src={sprite.img}
									coords={sprite.coords}
									scale={sprite.scale}
									map={map}
									key={i}
								/>
							))}
							<MapSprite
								src={currentStarship.img}
								coords={currentStarship.coords}
								target={currentStarship.target}
								scale={currentStarship.scale}
								map={map}
							/>
						</Layer>
					</Stage>
				</div>
			</Div>
		</Panel>
	)
}

export default Map
