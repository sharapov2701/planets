type actionType = 
    'CLICK' |
    'SET_COORDS' |
    'SET_TARGET' |
    'BUY' |
    'RESEARCH' |
    'TIMER' |
    'TEN_SECOND_BONUS' |
    'FIVE_MINUTES_BOOST'

export type action<T> = {
    type: actionType,
    payload?: T
}

export type thunk = (dispatch: actionCreator, getState: () => state) => void

export type actionCreator = <T>(data?: T) => action<T> | thunk

export type attribute = 'speed' | 'score'

export type buffType = 'increase' | 'multiply'

export type buff = {
    name: string,
    target: attribute,
    type: buffType,
    value: number
}

export type coords = {
    x: number,
    y: number
}

export type research = {
    name: string,
    desc: string,
    cost: number,
    dependencies?: string[]
}

export type improvement = {
    name: string,
    desc: string,
    buffs: buff[],
    requirements: string[]
}

export type starship = {
    img: string,
    scale: number,
    speed: number,
    coords: coords,
    target: coords
}

export type planet = {
    img: string,
    coords: coords,
    scale: number
}

export type playerState = {
    money: number,
    researches: string[],
    improvements: improvement[],
    buffs: buff[],
    totalClicksCount: number,
    tenSecondClicks: number,
    tenSecondBonus: number,
    fiveMinutesTimer: number,
    fiveMinutesBoost: number,
    cometsEventCounter: number,
    score: number,
    playTime: number,
    scorePerSecond: number,
    scoreLastSecond: number,
    currentStarship: starship
}

export type state = {
    player: playerState,
    planets: planet[],
    researches: research[],
    improvements: improvement[],
    buffs: buff[]
}

export type viewTypes = 'intro' | 'starship' | 'improvements' | 'researches'

export interface IPanelProps {
	id: string,
	go: (to: viewTypes) => void
}