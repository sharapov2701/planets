import {
    SET_TOTAL_CLICKS_COUNT,
    SET_COORDS,
    SET_TARGET
} from './types'

const initialState = {
    totalClicksCount: 0,
    currentStarship: {
        speed: 100,
        coords: {
            x: 0,
            y: 0
        },
        target: null
    }
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOTAL_CLICKS_COUNT:
            return { ...state, totalClicksCount: ++state.totalClicksCount }

        case SET_COORDS:
            return { ...state, currentStarship: {...state.currentStarship, coords: action.payload }}
            
        case SET_TARGET:
                return { ...state, currentStarship: {...state.currentStarship, target: action.payload }}

        default:
            return { ...state }
    }
}