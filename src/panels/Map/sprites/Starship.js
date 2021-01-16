import Sprite from './Sprite'
import { degToRad, radToDeg } from '../helpers'

export default class Starship extends Sprite {
    constructor(data) {
        super(data)
        this.target = data.target
        this.degree = degToRad(90 - radToDeg(Math.atan2(-this.target.y + this.coords.y, this.target.x - this.coords.x)))
    }

    prepareCtx() {
        super.prepareCtx()
        this.ctx.rotate(this.degree)
    }
}