import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import VKEpic from '@vkontakte/vkui/dist/components/Epic/Epic'
import Tabbar from '@vkontakte/vkui/dist/components/Tabbar/Tabbar'
import TabbarItem from '@vkontakte/vkui/dist/components/TabbarItem/TabbarItem'
import { CSSTransition } from 'react-transition-group'
import { toggleGrayFilter } from './helpers'
import transition from './transition.module.scss'
import styles from './epic.module.scss'
import rocket from './rocket.svg'
import { state } from '../../types'

const Epic = () => {
    const [activeStory, setActiveStory] = useState<string>('profile')
	const totalClicksCount = useSelector((state: state) => state.player.totalClicksCount)
	const [grayFilterBeenUsed, setGrayFilterBeenUsed] = useState(false)
    const timeout = 1500
    const go = (e: React.SyntheticEvent<HTMLElement>) => e.currentTarget.dataset.to && setActiveStory(e.currentTarget.dataset.to)

    useEffect(() => {
		switch (totalClicksCount) {
			case 5:
			case 30:
			case 50:
			case 100:
			case 1000:
				if (!grayFilterBeenUsed) {
					setGrayFilterBeenUsed(true)
					toggleGrayFilter()
					setTimeout(() => {
						toggleGrayFilter()
						setGrayFilterBeenUsed(true)
					}, timeout)
				}
				break
			default:
				setGrayFilterBeenUsed(false)
				break
		}
    }, [totalClicksCount, grayFilterBeenUsed])
    
    return (
        <VKEpic activeStory={activeStory} tabbar={
            <Tabbar>
                <CSSTransition timeout={timeout} classNames={transition} in={totalClicksCount >= 5} mountOnEnter>
                    <TabbarItem
                        className={styles.tabbarItem}
                        onClick={go}
                        data-to='improvements'
                        text='Улучшения'
                    >
                        <img src={rocket} width={28} />
                    </TabbarItem>
                </CSSTransition>
                <CSSTransition timeout={timeout} classNames={transition} in={totalClicksCount >= 30} mountOnEnter>
                    <TabbarItem
                        className={styles.tabbarItem}
                        onClick={go}
                        data-to='researches'
                        text='Исследования'
                    >
                        <img src={rocket} width={28} />
                    </TabbarItem>
                </CSSTransition>
                <CSSTransition timeout={timeout} classNames={transition} in={totalClicksCount >= 50} mountOnEnter>
                    <TabbarItem
                        className={styles.tabbarItem}
                        onClick={go}
                        data-to='home'
                        text='Звездный путь'
                    >
                        <img src={rocket} width={28} />
                    </TabbarItem>
                </CSSTransition>
                <CSSTransition timeout={timeout} classNames={transition} in={totalClicksCount >= 100} mountOnEnter>
                    <TabbarItem
                        className={styles.tabbarItem}
                        onClick={go}
                        data-to='home'
                        text='Достижения'
                    >
                        <img src={rocket} width={28} />
                    </TabbarItem>
                </CSSTransition>
                <CSSTransition timeout={timeout} classNames={transition} in={totalClicksCount >= 1000} mountOnEnter>
                    <TabbarItem
                        className={styles.tabbarItem}
                        onClick={go}
                        data-to='home'
                        text='Рейтинг'
                    >
                        <img src={rocket} width={28} />
                    </TabbarItem>
                </CSSTransition>
            </Tabbar>
        }/>
    )
}

export default Epic