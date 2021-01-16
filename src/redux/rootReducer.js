import {
    SET_TOTAL_CLICKS_COUNT,
    SET_COORDS,
    SET_TARGET
} from './types'

import planetImage from '../img/planet.png'
import starshipImage from '../img/starship.png'

const initialState = {
    totalClicksCount: 0,
    currentStarship: {
        type: 'starship',
        img: starshipImage,
        scale: 0.2,
        speed: 100,
        coords: {
            x: 0,
            y: 0
        },
        target: {
            x: 0,
            y: 0
        }
    },
    planets: [
        {
            type: 'planet',
			img: planetImage,
			coords: {
				x: 123,
				y: 456
			},
			scale: 0.1,
        },
        {
            type: 'planet',
			img: planetImage,
			coords: {
				x: 789,
				y: 987
			},
			scale: 0.1,
		}
    ]
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