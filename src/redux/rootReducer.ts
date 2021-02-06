import { initialState } from './initialState'
import { state, action, buff } from '../types'
import { increaseScore, multiplyScore } from './helpers'

export const rootReducer = (state: state = initialState, action: action<any>): state => {
    switch (action.type) {
        case 'CLICK':
            const score = state.player.score + state.player.buffs.reduce(increaseScore, 0) + state.player.buffs.reduce(multiplyScore, 1)
            return {
                ...state,
                player: {
                    ...state.player,
                    score,
                    totalClicksCount: ++state.player.totalClicksCount,
                    tenSecondClicks: ++state.player.tenSecondClicks
                }
            }

        case 'SET_COORDS':
            return {
                ...state,
                player: {
                    ...state.player,
                    currentStarship: {
                        ...state.player.currentStarship,
                        coords: action.payload
                    }
                }
            }
            
        case 'SET_TARGET':
            return {
                ...state,
                player: {
                    ...state.player,
                    currentStarship: {
                        ...state.player.currentStarship,
                        target: action.payload
                    }
                }
            }

        case 'BUY':
            return { ...state, player: { ...state.player, money: state.player.money - action.payload}}
            
        case 'RESEARCH':
            return { ...state, player: { ...state.player, researches: [...state.player.researches, action.payload]}}

        case 'TIMER':
            const playTime = ++state.player.playTime
            const scorePerSecond = +(state.player.score / playTime).toFixed(2)
            return { ...state, player: { ...state.player, playTime, scorePerSecond }}

        case 'TEN_SECOND_BONUS':
            const currTenSecClicks = Math.round(state.player.tenSecondClicks / 10)
            const tenSecBuffNames = ['tenSecondBuffX2', 'tenSecondBuffX3', 'tenSecondBuffX4', 'tenSecondBuffX5']
            const playerB = {...state.player}
            if (currTenSecClicks > playerB.tenSecondBonus) {
                const prevBuff = playerB.buffs.find(b => tenSecBuffNames.includes(b.name))
                if (!prevBuff) {
                    playerB.tenSecondBonus += 1
                    const newBuff: buff | undefined = state.buffs.find(b => b.name === tenSecBuffNames[0])
                    if (newBuff) {
                        playerB.buffs.push(newBuff)
                    }
                } else if (playerB.tenSecondBonus < 5) {
                    playerB.tenSecondBonus += 1
                    playerB.buffs = playerB.buffs.filter(b => b.name !== prevBuff.name)
                    const newBuff = state.buffs.find(b => b.name === `tenSecondBuffX${playerB.tenSecondBonus}`)
                    if (newBuff) {
                        playerB.buffs.push(newBuff)
                    }
                }
            } else if (currTenSecClicks < playerB.tenSecondBonus) {
                const prevBuff = playerB.buffs.find(b => tenSecBuffNames.includes(b?.name))
                if (prevBuff) {
                    if (playerB.tenSecondBonus > 1) {
                        playerB.tenSecondBonus -= 1
                        playerB.buffs = playerB.buffs.filter(b => b.name !== prevBuff.name)
                        const newBuff = state.buffs.find(b => b.name === `tenSecondBuffX${playerB.tenSecondBonus}`)
                        if (newBuff) {
                            playerB.buffs.push(newBuff)
                        }
                    }
                }
            }

            return {
                ...state,
                player: {
                    ...playerB,
                    tenSecondClicks: 0
                }
            }

        default:
            return { ...state }
    }
}