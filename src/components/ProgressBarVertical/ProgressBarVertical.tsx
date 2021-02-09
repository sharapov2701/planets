import React from 'react'
import styles from './progressBarVertical.module.scss'
import cn from 'classnames'

interface IProps {
    className?: string,
    progress: number,
    color?: string
}

const ProgressBarVertical = ({ className, progress, color }: IProps) => {
    return (
        <div className={cn(styles.progressBar, className)}>
            <div className={styles.progress} style={{ height: progress, backgroundColor: color || 'green' }} />
        </div>
    )
}

export default ProgressBarVertical