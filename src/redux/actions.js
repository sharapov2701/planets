import {
    CLICK,
    SET_COORDS,
    SET_TARGET,
    BUY,
    RESEARCH,
    TIMER
} from './types'

export const click = () => ({ type: CLICK })

export const setCoords = coords => ({ type: SET_COORDS, payload: coords })

export const setTarget = coords => ({ type: SET_TARGET, payload: coords })

export const buy = price => ({ type: BUY, payload: price })

export const research = research => ({ type: RESEARCH, payload: research })

export const timer = () => ({ type: TIMER })