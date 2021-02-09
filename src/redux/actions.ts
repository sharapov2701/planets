import { actionCreator } from '../types'

export const click: actionCreator = () => ({ type: 'CLICK' })

export const setCoords: actionCreator = coords => ({ type: 'SET_COORDS', payload: coords })

export const setTarget: actionCreator = coords => ({ type: 'SET_TARGET', payload: coords })

export const buy: actionCreator = price => ({ type: 'BUY', payload: price })

export const research: actionCreator = research => ({ type: 'RESEARCH', payload: research })

export const timer: actionCreator = () => ({ type: 'TIMER' })

export const tenSecondBonus: actionCreator = () => ({ type: 'TEN_SECOND_BONUS' })

export const fiveMinutesBoost: actionCreator = () => {
    return async (dispatch) => {
        dispatch({ type: 'FIVE_MINUTES_BOOST' })
        setTimeout(() => {
            dispatch({ type: 'FIVE_MINUTES_BOOST' })
        }, 3000)
    }
}