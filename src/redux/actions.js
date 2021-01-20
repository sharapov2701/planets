import {
    SET_TOTAL_CLICKS_COUNT,
    SET_COORDS,
    SET_TARGET,
    BUY,
    RESEARCH
} from './types'

export const setTotalClicksCount = () => ({ type: SET_TOTAL_CLICKS_COUNT })

export const setCoords = coords => ({ type: SET_COORDS, payload: coords })

export const setTarget = coords => ({ type: SET_TARGET, payload: coords })

export const buy = price => ({ type: BUY, payload: price })

export const research = research => ({ type: RESEARCH, payload: research })