import React from 'react'
import cn from 'classnames'
import icon from './improvement.png'
import styles from './improvement.module.scss'

interface improvementProps {
    name: string,
    desc: string,
    available: boolean,
    requirements: string | false
}

const Improvement = ({ name, desc, available, requirements }: improvementProps) => {

    return (
        <div className={styles.research}>
            <img className={styles.icon} src={icon} alt={name} />
            <div className={styles.about}>
                <p className={styles.title}>{name}</p>
                <p className={styles.desc}>{desc}</p>
                {requirements && <p className={styles.desc}>{requirements}</p>}
            </div>
            <div className={available ? cn(styles.btn, styles.available) : styles.btn}>
                <p className={styles.btnText}>{available ? 'Открыто' : 'Недоступно'}</p>
            </div>
        </div>
    )
}

export default Improvement