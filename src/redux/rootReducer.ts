import { initialState } from './initialState'
import { state, action, buff } from '../types'
import { increaseScore, multiplyScore } from './helpers'

export const rootReducer = (state: state = initialState, action: action<any>): state => {
    const player = { ...state.player }
    
    switch (action.type) {
        case 'CLICK':
            const newScores: number = player.buffs.reduce(increaseScore, 0) + player.buffs.reduce(multiplyScore, 1)
            player.score = player.score + newScores
            player.cometsEventCounter = player.cometsEventCounter === 800 ? 0 : ++player.cometsEventCounter
            player.totalClicksCount = ++player.totalClicksCount
            player.scoreLastSecond += newScores
            player.tenSecondClicks = ++player.tenSecondClicks
            return { ...state, player }

        case 'SET_COORDS':
            player.currentStarship.coords = action.payload
            return { ...state, player }
            
        case 'SET_TARGET':
            player.currentStarship.target = action.payload
            return { ...state, player }

        case 'BUY':
            player.money = player.money - action.payload
            return { ...state, player }
            
        case 'RESEARCH':
            player.researches.push(action.payload)
            return { ...state, player }

        case 'TIMER':
            player.playTime = ++player.playTime
            player.scorePerSecond = player.scoreLastSecond
            player.scoreLastSecond = 0
            player.fiveMinutesTimer = player.fiveMinutesTimer === 300 ? 0 : ++player.fiveMinutesTimer
            return { ...state, player }

        case 'TEN_SECOND_BONUS':
            const currTenSecClicks: number = Math.round(player.tenSecondClicks / 10)
            const tenSecBuffNames: string[] = ['tenSecondBuffX2', 'tenSecondBuffX3', 'tenSecondBuffX4', 'tenSecondBuffX5']
            if (currTenSecClicks > player.tenSecondBonus) {
                const prevBuff = player.buffs.find(b => tenSecBuffNames.includes(b.name))
                if (!prevBuff) {
                    player.tenSecondBonus += 1
                    const newBuff: buff | undefined = state.buffs.find(b => b.name === tenSecBuffNames[0])
                    if (newBuff) {
                        player.buffs.push(newBuff)
                    }
                } else if (player.tenSecondBonus < 5) {
                    player.tenSecondBonus += 1
                    player.buffs = player.buffs.filter(b => b.name !== prevBuff.name)
                    const newBuff = state.buffs.find(b => b.name === `tenSecondBuffX${player.tenSecondBonus}`)
                    if (newBuff) {
                        player.buffs.push(newBuff)
                    }
                }
            } else if (currTenSecClicks < player.tenSecondBonus) {
                const prevBuff: buff | undefined = player.buffs.find(b => tenSecBuffNames.includes(b?.name))
                if (prevBuff) {
                    if (player.tenSecondBonus > 1) {
                        player.tenSecondBonus -= 1
                        player.buffs = player.buffs.filter(b => b.name !== prevBuff.name)
                        const newBuff: buff | undefined = state.buffs.find(b => b.name === `tenSecondBuffX${player.tenSecondBonus}`)
                        if (newBuff) {
                            player.buffs.push(newBuff)
                        }
                    }
                }
            }
            player.tenSecondClicks = 0
            return { ...state, player }

        case 'FIVE_MINUTES_BOOST':
            const playerHasBoost: buff | undefined = player.buffs.find(b => b.name === 'fiveMinutesBoost')
            if (playerHasBoost) {
                player.buffs = player.buffs.filter(b => b.name !== 'fiveMinutesBoost')
                player.fiveMinutesBoost = 1
                return { ...state, player }
            } else {
                const fiveMinutesBoost: buff | undefined = state.buffs.find(b => b.name === 'fiveMinutesBoost')
                if (fiveMinutesBoost) {
                    player.buffs.push(fiveMinutesBoost)
                    player.fiveMinutesBoost = 10
                    return { ...state, player }
                } else {
                    throw new Error('BuffError')
                }
            }

        default:
            return { ...state }
    }
}