export default class Sprite {
    constructor(data) {
        const { img, coords, scale, ctx } = data
        this.img = img
        this.coords = {...coords}
        this.scale = scale || 1
        this.ctx = ctx
        this.mapCoords = {...coords}
        this.mapScale = scale
        this.skewX = 0
        this.skewY = 0
        this.width = this.img.width * this.scale
        this.height = this.img.height * this.scale
    }

    prepareCtx() {
        this.ctx.setTransform(
            this.mapScale,
            this.skewY,
            this.skewX,
            this.mapScale,
            this.mapCoords.x,
            this.mapCoords.y
        )
    }

    clearCtx() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    }

    renderSprite(zoom, zoomShift, moveShift) {
        this.updateCoords(zoom, zoomShift, moveShift)
        this.prepareCtx()
        this.ctx.drawImage(this.img, (-this.width / this.scale) / 2, (-this.height / this.scale) / 2)
        this.generatePath()
        this.clearCtx()
    }

    goTo(point) {
        const { x, y } = point
        this.coords.x = x
        this.coords.y = y
    }

    generatePath() {
        this.width = this.img.width * this.scale
        this.height = this.img.height * this.scale
        const path = new Path2D()
        this.ctx.fillStyle = 'transparent'
        path.rect(-(this.width / this.scale) / 2, -(this.height / this.scale) / 2, this.width / this.scale, this.height / this.scale)
        this.ctx.fill(path)
        this.path = path
    }

    isPointInPath(point) {
        const { x, y } = point
        this.prepareCtx()
        const result = this.ctx.isPointInPath(this.path, x, y)
        this.clearCtx()
        return result
    }

    updateCoords(zoom, zoomShift, moveShift) {
        this.zoom = zoom
        this.zoomShift = {...zoomShift}
        this.moveShift = {...moveShift}
        this.mapScale = this.scale * this.zoom
        this.mapCoords.x = (this.coords.x + this.moveShift.x + this.zoomShift.x) * this.zoom
        this.mapCoords.y = (this.coords.y + this.moveShift.y + this.zoomShift.y) * this.zoom
    }
}