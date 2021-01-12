const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

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

const clear = () => {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
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
        const { img, x, y, scale, isSpace } = data
        this.img = img
        this.x = x || 0
        this.y = y || 0
        this.scale = scale || 1
        this.width = this.img.width * this.scale
        this.height = this.img.height * this.scale
        this.skewX = 0
        this.skewY = 0
        this.degree = Math.PI * 2
        this.isSpace = isSpace
    }

    prepareCtx() {
        ctx.setTransform(
            this.scale,
            this.skewY,
            this.skewX,
            this.scale,
            this.x,
            this.y
        )
        ctx.rotate(this.degree)
    }

    clearCtx() {
        ctx.setTransform(1, 0, 0, 1, 0, 0)
    }

    render() {
        this.prepareCtx()
        ctx.drawImage(this.img, (-this.width / this.scale) / 2, (-this.height / this.scale) / 2)
        if (!this.isSpace) {
            this.generatePath()
        }
        this.clearCtx()
    }

    goTo(point) {
        const { x, y } = point
        this.x = x
        this.y = y
        render()
    }

    rotateTo(point) {
        const { x, y } = point
        this.degree = degToRad(90 - radToDeg(Math.atan2(-y + this.y, x - this.x)))
        render()
    }

    generatePath() {
        if (this.isSpace) {
            return
        }
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
        const startPoint = { x: this.x, y: this.y }
        const newPoint = getNewPoint(startPoint, this._target, this.speed)
        this.goTo(newPoint)
    }

    set target(planet) {
        this._target = { x: planet.x, y: planet.y }
    }
}

const starshipImg = new Image()
starshipImg.src = 'starship.png'

const planetImg = new Image()
planetImg.src = 'planet.png'

const spaceImg = new Image()
spaceImg.src = 'space.jpg'

const main = () => {
    const space = new Sprite({ img: spaceImg, x: window.innerWidth / 2, y: window.innerHeight / 2, isSpace: true })
    const starship = new Starship({ img: starshipImg, x: 150, y: 200, speed: 100, scale: 0.2 })
    const planet = new Sprite({ img: planetImg, x: 1000, y: 500, scale: 0.1 })
    render([space, planet, starship])
    window.onresize = () => render
    canvas.onclick = e => {
        if (planet.isPointInPath({ x: e.clientX, y: e.clientY })) {
            starship.target = planet
            starship.move()
        }
    }
}

window.onload = main