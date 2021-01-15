export const render = (ctx, canvas, sprites, zoom, zoomShift, moveShift) => {
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
    render.ctx.clearRect(0, 0, render.canvas.width, render.canvas.height);
    render.sprites.forEach(sprite => {
        sprite.renderSprite(render.zoom, render.zoomShift, render.moveShift)
    })
}