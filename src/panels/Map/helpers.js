import Sprite from './sprites/Sprite'
import Starship from './sprites/Starship'

export const createSprites = (ctx, sprites, isLoaded) => (
    sprites.map(sprite => {
        const Class = sprite.type === 'planet' ? Sprite : Starship
        const img = new Image()
        img.src = sprite.img
        
        const instance = new Class({
            ctx,
            img,
            coords: {...sprite.coords},
            scale: sprite.scale,
            target: sprite.target || null
        })
        return isLoaded ? instance : new Promise(resolve => {
            img.onload = () => resolve(instance)
        })
    })
)

export const render = props => {
    if (props) {
        const { ctx, canvas, sprites, zoom, zoomShift, moveShift } = props
        if (sprites) {
            render.sprites = sprites
        }
        if (ctx) {
            render.ctx = ctx
        }
        if (canvas) {
            render.canvas = canvas
        }
        if (zoom) {
            render.zoom = zoom
        }
        if (zoomShift) {
            render.zoomShift = {...zoomShift}
        }
        if (moveShift) {
            render.moveShift = {...moveShift}
        }
    }
    render.ctx.clearRect(0, 0, render.canvas.width, render.canvas.height)
    render.sprites.forEach(sprite => {
        sprite.renderSprite(render.zoom, render.zoomShift, render.moveShift)
    })
}

export const radToDeg = rad => (rad * 180) / Math.PI

export const degToRad = deg => (deg * Math.PI) / 180
