import React, { useEffect, useRef } from 'react'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Button from '@vkontakte/vkui/dist/components/Button/Button'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import { createSprites, render } from './helpers'
import { useDispatch, useSelector } from 'react-redux'
import { setTarget } from '../../redux/actions'
import styles from './map.module.scss'

const Map = ({ id, go }) => {
	const dispatch = useDispatch()
	const currentStarship = useSelector(state => state.currentStarship)
	const fetchedPlanets = useSelector(state => state.planets)
	const startPoint = { x: 0, y: 0 }
	const canvas = useRef(null)
	const zoom = useRef(1)
	const mouse = useRef(startPoint)
	const moveShift = useRef(startPoint)
	const zoomShift = useRef(startPoint)
	const isMouseDown = useRef(false)
	const zoomShiftOnMove = useRef(startPoint)

	const centerThePoint = point => {
		const center = {
			x: canvas.current.offsetWidth / 2 / zoom.current - zoomShift.current.x,
			y: canvas.current.offsetHeight / 2 / zoom.current - zoomShift.current.y
		}
		moveShift.current = {
			x: center.x - point.x,
			y: center.y - point.y
		}
	}

	const onResize = () => {
		canvas.current.width  = canvas.current.offsetWidth
		canvas.current.height = canvas.current.offsetHeight
		render()
	}

	// window.onmousedown = window.ontouchstart
	const onMouseDown = e => {
		e.persist()
		isMouseDown.current = true
		mouse.current = {
			x: (e.pageX || e.touches[0].pageX) - canvas.current.offsetLeft,
			y: (e.pageY || e.touches[0].pageY) - canvas.current.offsetTop
		}
	}
	
	// window.onmousemove = window.ontouchmove
	const onMouseMove = e => {
		e.persist()
		const cursorCoords = {
			x: (e.pageX || e.touches[0].pageX) - canvas.current.offsetLeft,
			y: (e.pageY || e.touches[0].pageY) - canvas.current.offsetTop
		}
		zoomShiftOnMove.current = {
			x: cursorCoords.x / zoom.current - cursorCoords.x,
			y: cursorCoords.y / zoom.current - cursorCoords.y
		}
		if (isMouseDown.current) {
			canvas.current.style.cursor = 'all-scroll'
			moveShift.current = {
				x: moveShift.current.x + (cursorCoords.x - mouse.current.x) / zoom.current,
				y: moveShift.current.y + (cursorCoords.y - mouse.current.y) / zoom.current
			}
			mouse.current = { ...cursorCoords }
			render({ moveShift: moveShift.current })
		}
	}

	// window.onmouseup = window.ontouchend
	const onMouseUp = e => {
		e.persist()
		isMouseDown.current = false
		canvas.current.style.cursor = 'auto'
	}

	const onWheel = e => {
		e.persist()
		const cursorCoords = {
			x: (e.pageX || e.touches[0].pageX) - canvas.current.offsetLeft,
			y: (e.pageY || e.touches[0].pageY) - canvas.current.offsetTop
		}
		if ((zoom.current > 0.2 && e.deltaY >= 0) || e.deltaY < 0) {
			zoom.current = (zoom.current - e.deltaY / 1000).toFixed(1)
			zoomShift.current = {
				x: cursorCoords.x / zoom.current - cursorCoords.x - (zoomShiftOnMove.current.x - zoomShift.current.x),
				y: cursorCoords.y / zoom.current - cursorCoords.y - (zoomShiftOnMove.current.y - zoomShift.current.y)
			}
			zoomShiftOnMove.current = {
				x: cursorCoords.x / zoom.current - cursorCoords.x,
				y: cursorCoords.y / zoom.current - cursorCoords.y
			}
		}
		render({ zoom: zoom.current, zoomShift: zoomShift.current })
	}

	const onClick = e => {
		e.persist()
		const cursorCoords = {
			x: (e.pageX || e.touches[0].pageX) - canvas.current.offsetLeft,
			y: (e.pageY || e.touches[0].pageY) - canvas.current.offsetTop
		}
		const coords = {
			x: cursorCoords.x / zoom.current - zoomShift.current.x - moveShift.current.x,
			y: cursorCoords.y / zoom.current - zoomShift.current.y - moveShift.current.y
		}
		dispatch(setTarget(coords))
	}

	useEffect(() => {
		window.addEventListener('resize', onResize)
		const ctx = canvas.current.getContext('2d')
		const sprites = createSprites(ctx, [...fetchedPlanets, currentStarship], false)
		Promise.all(sprites).then(result => {
			centerThePoint(currentStarship.coords)
			render({
				ctx,
				canvas: canvas.current,
				sprites: result,
				zoom: zoom.current,
				zoomShift: zoomShift.current,
				moveShift: moveShift.current
			})
		})

		return () => window.removeEventListener('resize', onResize)
	}, [])

	useEffect(() => {
		canvas.current.width  = canvas.current.offsetWidth
		canvas.current.height = canvas.current.offsetHeight
		const ctx = canvas.current.getContext('2d')
		const sprites = createSprites(ctx, [...fetchedPlanets, currentStarship], true)
		render({
			ctx,
			canvas: canvas.current,
			sprites,
			zoom: zoom.current,
			zoomShift: zoomShift.current,
			moveShift: moveShift.current
		})
	})
	
	return (
		<Panel id={id}>
			<PanelHeader>Карта</PanelHeader>
			<Div className={styles.container}>
				<Button size="xl" level="2" onClick={go} data-to="starship">
					Корабль
				</Button>
				<br />
				<Button size="xl" level="2" onClick={go} data-to="home">
					База
				</Button>
				<br />
				<canvas
					className={styles.canvas}
					width={window.innerWidth}
					height={window.innerHeight}
					ref={canvas}
					onMouseDown={onMouseDown}
					onMouseMove={onMouseMove}
					onMouseUp={onMouseUp}
					onWheel={onWheel}
					onClick={onClick}
				/>
			</Div>
		</Panel>
	)
}

export default Map
