import planetImage from '../img/planet.png'
import starshipImage from '../img/starship.png'

export default {
    player: {
        money: 750000,
        researches: [],
        improvements: [],
        buffs: [],
        totalClicksCount: 0,
        tenSecondClicks: 0,
        tenSecondBonus: 1,
        score: 0,
        playTime: 0,
        scorePerSecond: 0,
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
    ],
    researches: [
        {
            name: 'Квантовые двигатели',
            desc: 'Установим новейшие квантовые двигатели на ваш космолёт. Быстро! Дешего! Надежно! Гарантия 3 мес.',
            cost: 10000000,
            dependencies: [
                'Ускорение 2 уровня'
            ]
        },
        {
            name: 'Минеральное топливо',
            desc: 'Выгодно и экологично',
            cost: 25000,
            dependencies: [
                'Ускорение 1 уровня'
            ]
        },
        {
            name: 'Мобильный Хаббл',
            desc: 'Лучший телескоп в галактике прямо у вас на корабле!',
            cost: 750000
        },
    ],
    improvements: [
        {
            name: 'Ускорение 1 уровня',
            desc: 'Ускоряет, но скоростью не балует',
            buffs: [
                {
                    name: 'Ускорение 1 уровня',
                    target: 'speed',
                    type: 'increase',
                    value: 5
                }
            ],
            requirements: [
                'Минеральное топливо'
            ]
        },
        {
            name: 'Ускорение 2 уровня',
            desc: 'Как ускорение 1 уровня, но только 2 уровня',
            buffs: [
                {
                    name: 'Ускорение 2 уровня',
                    target: 'speed',
                    type: 'increase',
                    value: 10
                }
            ],
            requirements: [
                'Квантовые двигатели'
            ]
        },
    ],
    buffs: [
        {
            name: 'Ускорение 1 уровня',
            target: 'speed',
            type: 'increase',
            value: 5
        },
        {
            name: 'Ускорение 2 уровня',
            target: 'speed',
            type: 'increase',
            value: 10
        },
        {
            name: 'tenSecondBuffX2',
            target: 'score',
            type: 'multiply',
            value: 2
        },
        {
            name: 'tenSecondBuffX3',
            target: 'score',
            type: 'multiply',
            value: 3
        },
        {
            name: 'tenSecondBuffX4',
            target: 'score',
            type: 'multiply',
            value: 4
        },
        {
            name: 'tenSecondBuffX5',
            target: 'score',
            type: 'multiply',
            value: 5
        },
    ]
}