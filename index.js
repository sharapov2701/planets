const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const radToDeg = rad => rad * 180 / Math.PI
const degToRad = deg => deg * Math.PI / 180

const clear = () => {
    ctx.moveTo(0, 0)
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

class Sprite {
    constructor(image) {
        this.img = image
        this.width = this.img.width
        this.height = this.img.height
        this.x = this.width / 2
        this.y = this.height / 2
        this.scaleX = 1
        this.scaleY = 1
        this.skewX = 0
        this.skewY = 0
        this.degree = Math.PI * 2
    }

    render() {
        clear()
        ctx.setTransform(this.scaleX, this.skewY, this.skewX, this.scaleY, this.x, this.y)
        ctx.rotate(this.degree)
        ctx.drawImage(this.img, -this.width / 2, -this.height / 2)
    }

    moveTo(x, y) {
        this.x = x
        this.y = y
        this.render()
    }

    rotateTo(x, y) {
        this.degree = degToRad(90 - radToDeg(Math.atan2(-y + this.y, x - this.x)))
        this.render()
    }
}

const starshipImg = new Image()
starshipImg.src = "starship.png"

window.onload = () => {
    const starship = new Sprite(starshipImg)
    starship.render()
}