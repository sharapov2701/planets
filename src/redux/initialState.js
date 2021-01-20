import planetImage from '../img/planet.png'
import starshipImage from '../img/starship.png'

export default {
    totalClicksCount: 0,
    player: {
        money: 750000,
        researches: []
    },
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
    ],
    researches: [
        {
            name: 'Квантовые двигатели',
            desc: 'Установим новейшие квантовые двигатели на ваш космолёт. Быстро! Дешего! Надежно! Гарантия 3 мес.',
            cost: 10000000
        },
        {
            name: 'Минеральное топливо',
            desc: 'Выгодно и экологично',
            cost: 25000
        },
        {
            name: 'Мобильный Хаббл',
            desc: 'Лучший телескоп в галактике прямо у вас на корабле!',
            cost: 750000
        },
    ]
}