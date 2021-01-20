import {
    SET_TOTAL_CLICKS_COUNT,
    SET_COORDS,
    SET_TARGET,
    BUY,
    RESEARCH
} from './types'

import initialState from './initialState'

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOTAL_CLICKS_COUNT:
            return { ...state, totalClicksCount: ++state.totalClicksCount }

        case SET_COORDS:
            return { ...state, currentStarship: {...state.currentStarship, coords: action.payload }}
            
        case SET_TARGET:
            return { ...state, currentStarship: {...state.currentStarship, target: action.payload }}

        case BUY:
            return { ...state, player: {...state.player, money: state.player.money - action.payload}}
            
        case RESEARCH:
            return { ...state, player: {...state.player, researches: [...state.player.researches, action.payload]}}

        default:
            return { ...state }
    }
}