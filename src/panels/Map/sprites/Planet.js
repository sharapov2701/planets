import React, { useRef, useState, useEffect } from 'react'
import { Image } from 'react-konva';

const Planet = props => {
    const imageRef = useRef(null)
    const [image, setImage] = useState(null)
    const coords = {
        x: (props.coords.x + props.map.moveShift.x + props.map.zoomShift.x) * props.map.zoom,
        y: (props.coords.y + props.map.moveShift.y + props.map.zoomShift.y) * props.map.zoom
    }
    const scale = {
        x: props.scale * props.map.zoom,
        y: props.scale * props.map.zoom
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
        />
    )
}

export default Planet