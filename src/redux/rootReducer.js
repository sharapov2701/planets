import {
    CLICK,
    SET_COORDS,
    SET_TARGET,
    BUY,
    RESEARCH,
    TIMER
} from './types'

import initialState from './initialState'

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLICK:
            const multiplyScore = (score, buff) => {
                if (buff.type === 'multiply') {
                    return score * buff.value
                } else {
                    return score
                }
            }
            const increaseScore = (score, buff) => {
                if (buff.type === 'increase') {
                    return score + buff.value
                } else {
                    return score
                }
            }
            const score = state.player.score + state.player.buffs.reduce(increaseScore, 0) + state.player.buffs.reduce(multiplyScore, 1)
            return { ...state, player: {...state.player, score, totalClicksCount: ++state.player.totalClicksCount } }

        case SET_COORDS:
            return { ...state, player: { ...state.player, currentStarship: {...state.currentStarship, coords: action.payload }}}
            
        case SET_TARGET:
            return { ...state, player: { ...state.player, currentStarship: {...state.currentStarship, target: action.payload }}}

        case BUY:
            return { ...state, player: { ...state.player, money: state.player.money - action.payload}}
            
        case RESEARCH:
            return { ...state, player: { ...state.player, researches: [...state.player.researches, action.payload]}}

        case TIMER:
            const playTime = ++state.player.playTime
            const scorePerSecond = (state.player.score / playTime).toFixed(2)
            return { ...state, player: { ...state.player, playTime, scorePerSecond }}

        default:
            return { ...state }
    }
}