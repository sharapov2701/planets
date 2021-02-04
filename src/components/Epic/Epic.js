import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import VKEpic from '@vkontakte/vkui/dist/components/Epic/Epic'
import Tabbar from '@vkontakte/vkui/dist/components/Tabbar/Tabbar'
import TabbarItem from '@vkontakte/vkui/dist/components/TabbarItem/TabbarItem'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { toggleGrayFilter } from './helpers'
import transition from './transition.module.scss'
import styles from './epic.module.scss'
import rocket from './rocket.svg'

const Epic = ({ go }) => {
	const totalClicksCount = useSelector(state => state.player.totalClicksCount)
	const [grayFilterBeenUsed, setGrayFilterBeenUsed] = useState(false)
	const [inProp, setInProp] = useState(false)
    const timeout = 1500

    useEffect(() => {
		switch (totalClicksCount) {
			case 5:
			case 30:
			case 50:
			case 100:
			case 1000:
                setInProp(true)
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
                setInProp(false)
				setGrayFilterBeenUsed(false)
				break
		}
    }, [totalClicksCount, grayFilterBeenUsed])
    
    return (
        <VKEpic>
            <TransitionGroup component={Tabbar}>
                {totalClicksCount >= 5 && (
                    <CSSTransition timeout={timeout} classNames={transition} in={inProp} mountOnEnter>
                        <TabbarItem
                            className={styles.tabbarItem}
                            onClick={go}
                            data-to='improvements'
                            text='Улучшения'
                        >
                            <img src={rocket} width={28} />
                        </TabbarItem>
                    </CSSTransition>
                )}
                {totalClicksCount >= 30 && (
                    <CSSTransition timeout={timeout} classNames={transition} in={inProp} mountOnEnter>
                        <TabbarItem
                            className={styles.tabbarItem}
                            onClick={go}
                            data-to='researches'
                            text='Исследования'
                        >
                            <img src={rocket} width={28} />
                        </TabbarItem>
                    </CSSTransition>
                )}
                {totalClicksCount >= 50 && (
                    <CSSTransition timeout={timeout} classNames={transition} in={inProp} mountOnEnter>
                        <TabbarItem
                            className={styles.tabbarItem}
                            onClick={go}
                            data-to='home'
                            text='Звездный путь'
                        >
                            <img src={rocket} width={28} />
                        </TabbarItem>
                    </CSSTransition>
                )}
                {totalClicksCount >= 100 && (
                    <CSSTransition timeout={timeout} classNames={transition} in={inProp} mountOnEnter>
                        <TabbarItem
                            className={styles.tabbarItem}
                            onClick={go}
                            data-to='home'
                            text='Достижения'
                        />
                    </CSSTransition>
                )}
                {totalClicksCount >= 1000 && (
                    <CSSTransition timeout={timeout} classNames={transition} in={inProp} mountOnEnter>
                        <TabbarItem
                            className={styles.tabbarItem}
                            onClick={go}
                            data-to='home'
                            text='Рейтинг'
                        />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </VKEpic>
    )
}

export default Epic