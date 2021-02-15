import React from 'react'
import cn from 'classnames'
import icon from './research.png'
import styles from './research.module.scss'
import { useDispatch } from 'react-redux'
import { doResearch } from '../../../redux/actions'
import { research } from '../../../types'

interface ResearchProps {
    researchData: research,
    disabled: boolean,
    researched: boolean
}

const Research = ({ researchData, disabled, researched }: ResearchProps) => {
    const dispatch = useDispatch()
    const { name, desc, cost } = researchData
    const handleClick = () => dispatch(doResearch(researchData))

    return (
        <div className={styles.research} onClick={!disabled && !researched ? handleClick : undefined}>
            <img className={styles.icon} src={icon} alt={name} />
            <div className={styles.about}>
                <p className={styles.title}>{name}</p>
                <p className={styles.desc}>{desc}</p>
            </div>
            <div className={researched ? cn(styles.btn, styles.researched) : disabled ? cn (styles.btn, styles.disabled) : styles.btn}>
                <p className={styles.btnText}>{researched ? 'Открыто' : 'Открыть'}</p>
                {!researched && (
                    <div>
                        <span className={styles.currency}>$ </span>
                        <span className={styles.price}>
                            {cost.toLocaleString()}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Research