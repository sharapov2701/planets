import React from 'react'
import cn from 'classnames'
import icon from './research.png'
import styles from './research.module.scss'
import { useDispatch } from 'react-redux'
import { buy, research } from '../../../redux/actions'

const Research = ({ name, desc, cost, disabled, researched }) => {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(buy(cost))
        dispatch(research(name))
    }

    return (
        <div className={styles.research} onClick={!disabled && !researched ? handleClick : null}>
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