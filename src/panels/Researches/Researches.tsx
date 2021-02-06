import React from 'react'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import { PanelHeaderBack } from '@vkontakte/vkui'
import styles from './researches.module.scss'
import Research from './Research/Research'
import { useSelector } from 'react-redux'
import { state, IPanelProps } from '../../types'

const Researches = ({ id, go }: IPanelProps) => {
	const researches = useSelector((state: state) => state.researches)
	const playerResearches = useSelector((state: state) => state.player.researches)
	const money = useSelector((state: state) => state.player.money)

	return (
		<Panel id={id}>
			<PanelHeader left={<PanelHeaderBack onClick={go} data-to='starship' />}>Исследования</PanelHeader>
			<Div className={styles.root} style={{ minHeight: window.innerHeight - 78 }}>
				{researches.map((research, i) => (
					<Research {...research} disabled={money < research.cost} researched={playerResearches.includes(research.name)} key={i} />
				))}
			</Div>
		</Panel>
	)
}

export default Researches
