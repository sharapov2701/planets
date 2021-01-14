const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let ZOOM_COOF = 1
let MAP_MOVE_SHIFT = { x: 0, y: 0 }
let MAP_ZOOM_SHIFT = { x: 0, y: 0 }
let MAP_ZOOM_SHIFT_ON_MOVE = { x: 0, y: 0 }
let MOUSE_COORDS = { x: 0, y: 0 }
let IS_MOUSE_DOWN = false


const radToDeg = rad => (rad * 180) / Math.PI
const degToRad = deg => (deg * Math.PI) / 180
const getPathLength = (startPoint, endPoint) => Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2))
const getNewPoint = (startPoint, endPoint, speed) => {
    if (!speed) {
        return endPoint
    }
    const oldPathLength = getPathLength(startPoint, endPoint)
    const newPathLength = oldPathLength > speed ? oldPathLength - speed : 1
    const x = endPoint.x + newPathLength * (startPoint.x - endPoint.x) / oldPathLength
    const y = endPoint.y + newPathLength * (startPoint.y - endPoint.y) / oldPathLength
    return { x, y }
}

const render = (sprites) => {
    if (sprites) {
        render.sprites = sprites
    }
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight
    render.sprites.forEach(sprite => sprite.render())
}

class Sprite {
    constructor(data) {
        const { img, x, y, scale } = data
        this.img = img
        this.coords = { x, y }
        this.mapCoords = {
            x: (this.coords.x + MAP_MOVE_SHIFT.x) * ZOOM_COOF,
            y: (this.coords.y + MAP_MOVE_SHIFT.y) * ZOOM_COOF
        }
        this.scale = scale || 1
        this.mapScale = this.scale * ZOOM_COOF
        this.width = this.img.width * this.scale
        this.height = this.img.height * this.scale
        this.skewX = 0
        this.skewY = 0
        this.degree = Math.PI * 2
    }

    prepareCtx() {
        ctx.setTransform(
            this.mapScale,
            this.skewY,
            this.skewX,
            this.mapScale,
            this.mapCoords.x,
            this.mapCoords.y
        )
        ctx.rotate(this.degree)
    }

    clearCtx() {
        ctx.setTransform(1, 0, 0, 1, 0, 0)
    }

    render() {
        this.updateCoords()
        this.prepareCtx()
        ctx.drawImage(this.img, (-this.width / this.scale) / 2, (-this.height / this.scale) / 2)
        this.generatePath()
        this.clearCtx()
    }

    goTo(point) {
        const { x, y } = point
        this.coords.x = x
        this.coords.y = y
        render()
    }

    rotateTo(point) {
        const { x, y } = point
        this.degree = degToRad(90 - radToDeg(Math.atan2(-y + this.coords.y, x - this.coords.x)))
        render()
    }

    generatePath() {
        const path = new Path2D()
        ctx.fillStyle = 'transparent'
        path.rect(-(this.width / this.scale) / 2, -(this.height / this.scale) / 2, this.width / this.scale, this.height / this.scale)
        ctx.fill(path)
        this.path = path
    }

    isPointInPath(point) {
        const { x, y } = point
        this.prepareCtx()
        const result = ctx.isPointInPath(this.path, x, y)
        this.clearCtx()
        return result
    }

    updateCoords() {
        this.mapScale = this.scale * ZOOM_COOF
        this.mapCoords.x = (this.coords.x + MAP_MOVE_SHIFT.x + MAP_ZOOM_SHIFT.x) * ZOOM_COOF
        this.mapCoords.y = (this.coords.y + MAP_MOVE_SHIFT.y + MAP_ZOOM_SHIFT.y) * ZOOM_COOF
    }
}

class Starship extends Sprite {
    constructor(data) {
        super(data)
        this.speed = data.speed
    }

    move() {
        if (!this._target) {
            return
        }
        this.rotateTo(this._target)
        const startPoint = { x: this.coords.x, y: this.coords.y }
        const newPoint = getNewPoint(startPoint, this._target, this.speed)
        this.goTo(newPoint)
    }

    set target(planet) {
        this._target = { x: planet.coords.x, y: planet.coords.y }
    }
}

const starshipImg = new Image()
starshipImg.src = 'starship.png'

const planetImg = new Image()
planetImg.src = 'planet.png'

const main = () => {
    const starship = new Starship({ img: starshipImg, x: 500, y: 500, speed: 100, scale: 0.2 })
    const planet = new Sprite({ img: planetImg, x: 0, y: 0, scale: 0.1 })
    const planet2 = new Sprite({ img: planetImg, x: 1000, y: 1000, scale: 0.1 })
    const starships = [starship]
    const planets = [planet, planet2]
    const sprites = [...planets, ...starships]
    render(sprites)

    window.onresize = () => render

    window.onmousedown = window.ontouchstart = e => {
        MOUSE_COORDS.x = e.pageX || e.touches[0].pageX
        MOUSE_COORDS.y = e.pageY || e.touches[0].pageY
        IS_MOUSE_DOWN = true
    }

    window.onmousemove = window.ontouchmove = e => {
        MAP_ZOOM_SHIFT_ON_MOVE.x = (e.pageX || e.touches[0].pageX) / ZOOM_COOF - (e.pageX || e.touches[0].pageX)
        MAP_ZOOM_SHIFT_ON_MOVE.y = (e.pageY || e.touches[0].pageY) / ZOOM_COOF - (e.pageY || e.touches[0].pageY)
        if (IS_MOUSE_DOWN) {
            canvas.style.cursor = 'all-scroll'
            MAP_MOVE_SHIFT.x += ((e.pageX || e.touches[0].pageX) - MOUSE_COORDS.x) / ZOOM_COOF
            MAP_MOVE_SHIFT.y += ((e.pageY || e.touches[0].pageY) - MOUSE_COORDS.y) / ZOOM_COOF
            MOUSE_COORDS.x = e.pageX || e.touches[0].pageX
            MOUSE_COORDS.y = e.pageY || e.touches[0].pageY
            render()
        }
    }

    window.onmouseup = window.ontouchend = e => {
        IS_MOUSE_DOWN = false
        canvas.style.cursor = 'auto'
    }

    window.onwheel = e => {
        if ((ZOOM_COOF > 0.2 && e.deltaY === 100) || e.deltaY === -100) {
            ZOOM_COOF -= e.deltaY / 1000
            ZOOM_COOF = ZOOM_COOF.toFixed(1)
            MAP_ZOOM_SHIFT.x = (e.pageX || e.touches[0].pageX) / ZOOM_COOF - (e.pageX || e.touches[0].pageX) - (MAP_ZOOM_SHIFT_ON_MOVE.x - MAP_ZOOM_SHIFT.x)
            MAP_ZOOM_SHIFT.y = (e.pageY || e.touches[0].pageY) / ZOOM_COOF - (e.pageY || e.touches[0].pageY) - (MAP_ZOOM_SHIFT_ON_MOVE.y - MAP_ZOOM_SHIFT.y)
            MAP_ZOOM_SHIFT_ON_MOVE.x = (e.pageX || e.touches[0].pageX) / ZOOM_COOF - (e.pageX || e.touches[0].pageX)
            MAP_ZOOM_SHIFT_ON_MOVE.y = (e.pageY || e.touches[0].pageY) / ZOOM_COOF - (e.pageY || e.touches[0].pageY)
        }
        render()
    }

    canvas.onclick = e => {
        planets.forEach(planet => {
            if (planet.isPointInPath({ x: e.pageX, y: e.pageY })) {
                starship.target = planet
                starship.move()
            }
        })
    }

    window.onkeydown = e => {
        if (e.code === 'ArrowUp') {
            MAP_MOVE_SHIFT.y += 100
            render()
        } else if (e.code === 'ArrowDown') {
            MAP_MOVE_SHIFT.y -= 100
            render()
        }
    }
}

window.onload = main