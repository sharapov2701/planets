import React, { useEffect, useRef } from 'react'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Button from '@vkontakte/vkui/dist/components/Button/Button'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import { render } from '../../engine/canvas'
import Sprite from '../../engine/Sprite'
import Starship from '../../engine/Starship'

import { useDispatch, useSelector } from 'react-redux'
import { setTarget } from '../../redux/actions'

import starshipImage from '../../img/starship.png'
import planetImage from '../../img/planet.png'
import styles from './map.module.scss'

const Map = ({ id, go }) => {
	const dispatch = useDispatch()
	const currentLocation = useSelector(state => state.currentStarship.coords)
	const target = useSelector(state => state.currentStarship.target)
	const startPoint = { x: 0, y: 0 }
	const canvas = useRef()
	const ctx = useRef()
	const starship = useRef()
	const planet = useRef()
	const planet2 = useRef()
	const starships = useRef()
	const planets = useRef()
	const sprites = useRef()
	const starshipImg = useRef()
	const planetImg = useRef()
	const zoom = useRef(1)
	const mouse = useRef(startPoint)
	const moveShift = useRef(startPoint)
	const zoomShift = useRef(startPoint)
	const isMouseDown = useRef(false)
	const zoomShiftOnMove = useRef(startPoint)

	useEffect(() => {
		canvas.current.width  = canvas.current.offsetWidth;
		canvas.current.height = canvas.current.offsetHeight;
		ctx.current = canvas.current.getContext('2d')
		starshipImg.current = new Image()
		starshipImg.current.src = starshipImage
		planetImg.current = new Image()
		planetImg.current.src = planetImage
		starship.current = new Starship({
			ctx: ctx.current,
			img: starshipImg.current,
			coords: {
				x: 500,
				y: 500
			},
			scale: 0.2,
			zoom: zoom.current,
			zoomShift: zoomShift.current,
			moveShift: moveShift.current,
			render
		})
		planet.current = new Sprite({
			ctx: ctx.current,
			img: planetImg.current,
			coords: {
				x: 123,
				y: 456
			},
			scale: 0.1,
			zoom: zoom.current,
			zoomShift: zoomShift.current,
			moveShift: moveShift.current,
			render
		})
		planet2.current = new Sprite({
			ctx: ctx.current,
			img: planetImg.current,
			coords: {
				x: 789,
				y: 987
			},
			scale: 0.1,
			zoom: zoom.current,
			zoomShift: zoomShift.current,
			moveShift: moveShift.current,
			render
		})
		starships.current = [starship.current]
		planets.current = [planet.current, planet2.current]
		sprites.current = [...planets.current, ...starships.current]
		render(ctx.current, canvas.current, sprites.current, zoom.current, zoomShift.current, moveShift.current)
	}, [])

	useEffect(() => {
		starship.current.goTo(currentLocation)
		starship.current.target = target
	})

	// window.onmousedown = window.ontouchstart
	const onMouseDown = e => {
		e.persist()
		mouse.current = {
			x: (e.pageX || e.touches[0].pageX) - canvas.current.offsetLeft,
			y: (e.pageY || e.touches[0].pageY) - canvas.current.offsetTop
		}
		isMouseDown.current = true
	}
	// window.onmousemove = window.ontouchmove
	const onMouseMove = e => {
		e.persist()
		zoomShiftOnMove.current = {
			x: ((e.pageX || e.touches[0].pageX) - canvas.current.offsetLeft) / zoom.current - ((e.pageX || e.touches[0].pageX) - canvas.current.offsetLeft),
			y: ((e.pageY || e.touches[0].pageY) - canvas.current.offsetTop) / zoom.current - ((e.pageY || e.touches[0].pageY) - canvas.current.offsetTop)
		}
		if (isMouseDown.current) {
			canvas.current.style.cursor = 'all-scroll'
			moveShift.current = {
				x: moveShift.current.x + (((e.pageX || e.touches[0].pageX) - canvas.current.offsetLeft) - mouse.current.x) / zoom.current,
				y: moveShift.current.y + (((e.pageY || e.touches[0].pageY) - canvas.current.offsetTop) - mouse.current.y) / zoom.current
			}
			mouse.current = {
				x: (e.pageX || e.touches[0].pageX) - canvas.current.offsetLeft,
				y: (e.pageY || e.touches[0].pageY) - canvas.current.offsetTop
			}
			render(ctx.current, canvas.current, sprites.current, zoom.current, zoomShift.current, moveShift.current)
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
		if ((zoom.current > 0.2 && e.deltaY >= 0) || e.deltaY < 0) {
			zoom.current = (zoom.current - e.deltaY / 1000).toFixed(1)
			zoomShift.current = {
				x: ((e.pageX || e.touches[0].pageX) - canvas.current.offsetLeft) / zoom.current - ((e.pageX || e.touches[0].pageX) - canvas.current.offsetLeft) - (zoomShiftOnMove.current.x - zoomShift.current.x),
				y: ((e.pageY || e.touches[0].pageY) - canvas.current.offsetTop) / zoom.current - ((e.pageY || e.touches[0].pageY) - canvas.current.offsetTop) - (zoomShiftOnMove.current.y - zoomShift.current.y)
			}
			zoomShiftOnMove.current = {
				x: ((e.pageX || e.touches[0].pageX) - canvas.current.offsetLeft) / zoom.current - ((e.pageX || e.touches[0].pageX) - canvas.current.offsetLeft),
				y: ((e.pageY || e.touches[0].pageY) - canvas.current.offsetTop) / zoom.current - ((e.pageY || e.touches[0].pageY) - canvas.current.offsetTop)
			}
		}
		render(ctx.current, canvas.current, sprites.current, zoom.current, zoomShift.current, moveShift.current)
	}

	const onClick = e => {
		e.persist()
		const coords = {
			x: (e.pageX - canvas.current.offsetLeft) / zoom.current - zoomShift.current.x - moveShift.current.x,
			y: (e.pageY - canvas.current.offsetTop) / zoom.current - zoomShift.current.y - moveShift.current.y
		}
		dispatch(setTarget(coords))
	}

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
					width={window.innerWidth}
					height={window.innerHeight}
					ref={canvas}
					onMouseDown={onMouseDown}
					onMouseMove={onMouseMove}
					onMouseUp={onMouseUp}
					onWheel={onWheel}
					onClick={onClick}
					className={styles.canvas}
				>
					Ваш браузер устарел, и не поддерживает данное приложение
				</canvas>
			</Div>
		</Panel>
	)
}

export default Map
