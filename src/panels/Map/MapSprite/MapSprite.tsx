import React, { useRef, useState, useEffect } from 'react'
import { Image } from 'react-konva'
import { coords } from '../../../types'

interface mapSpriteProps {
    src: string,
    coords: coords,
    target?: coords,
    scale: number,
    map: {
        zoom: number,
        zoomShift: coords,
        moveShift: coords
    }
}

const MapSprite = (props: mapSpriteProps) => {
    const ref = useRef(null)
    const imageRef = useRef<HTMLImageElement>()
    const [image, setImage] = useState<HTMLImageElement>()
    const coords = {
        x: (props.coords.x + props.map.moveShift.x + props.map.zoomShift.x) * props.map.zoom,
        y: (props.coords.y + props.map.moveShift.y + props.map.zoomShift.y) * props.map.zoom
    }
    const scale = {
        x: props.scale * props.map.zoom,
        y: props.scale * props.map.zoom
    }

    let angle = 0
    if (props.target) {
        angle = 90 - Math.atan2(-props.target.y + props.coords.y, props.target.x - props.coords.x) * 180 / Math.PI
    }

    const handleLoad = () => {
        setImage(imageRef.current)
    }

    const loadImage = () => {
        const img = new window.Image()
        img.src = props.src
        img.crossOrigin="Anonymous"
        imageRef.current = img
        imageRef.current.addEventListener('load', handleLoad)
    }

    useEffect(() => {
        loadImage()
        return () => {
            if (imageRef.current) {
                imageRef.current.removeEventListener('load', handleLoad)
            }
        }
    }, [])
  
    useEffect(() => {
        loadImage()
    }, [props.src])

    return (
        <Image
            x={coords.x}
            y={coords.y}
            image={image}
            scale={scale}
            ref={ref}
            offsetX={image ? image.width / 2 : 0}
            offsetY={image ? image.height / 2 : 0}
            rotation={angle}
        />
    )
}

export default MapSprite