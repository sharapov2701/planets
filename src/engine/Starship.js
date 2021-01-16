import Sprite from './Sprite'

export default class Starship extends Sprite {
    constructor(data) {
        super(data)
    }

    set target(target) {
        if (!target) {
            return this._target
        }
        this._target = { x: target.x, y: target.y }
        this.rotateTo(this._target)
    }
}