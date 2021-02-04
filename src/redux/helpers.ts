import { buff } from '../types'

export const multiplyScore = (score: number, buff: buff): number => {
    if (buff.type === 'multiply') {
        return score * buff.value
    } else {
        return score
    }
}

export const increaseScore = (score: number, buff: buff): number => {
    if (buff.type === 'increase') {
        return score + buff.value
    } else {
        return score
    }
}