import {
    SET_TOTAL_CLICKS_COUNT,
    SET_COORDS,
    SET_TARGET
} from './types'

export const setTotalClicksCount = () => ({ type: SET_TOTAL_CLICKS_COUNT })

export const setCoords = coords => ({ type: SET_COORDS, payload: coords })

export const setTarget = coords => ({ type: SET_TARGET, payload: coords })