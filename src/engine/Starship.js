import Sprite from './Sprite'
import { getNewPoint } from './helpers'

export default class Starship extends Sprite {
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