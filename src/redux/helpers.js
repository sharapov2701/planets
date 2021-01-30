export const multiplyScore = (score, buff) => {
    if (buff.type === 'multiply') {
        return score * buff.value
    } else {
        return score
    }
}

export const increaseScore = (score, buff) => {
    if (buff.type === 'increase') {
        return score + buff.value
    } else {
        return score
    }
}