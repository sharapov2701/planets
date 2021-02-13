import * as React from 'react'
import { useState, useEffect } from 'react'
import View from '@vkontakte/vkui/dist/components/View/View'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import { PanelHeaderBack } from '@vkontakte/vkui'
import Improvement from './Improvement/Improvement'
import { useSelector } from 'react-redux'
import { getRequirementsList } from './helpers'
import { state, IPanelProps } from '../../types'
import * as styles from './improvements.module.scss'

const Improvements = ({ id, go }: IPanelProps) => {
	const fetchedImprovements = useSelector((state: state) => state.improvements)
	const playerImprovements = useSelector((state: state) => state.player.improvements)
	const playerResearches = useSelector((state: state) => state.player.researches)
	const [improvements, setImprovements] = useState<JSX.Element[]>([])

	useEffect(() => {
		const processedImprovements = fetchedImprovements.map((improvement, i) => {
			let available = false
	
			if (playerImprovements.includes(improvement)) {
				available = true
			} else {
				for (let j = 0; j < improvement.requirements.length; j++) {
					const requirment = improvement.requirements[j]
					if (playerResearches.includes(requirment)) {
						available = true
						break
					}
				}
			}
	
			return <Improvement
				{...improvement}
				available={available}
				requirements={!available && getRequirementsList(improvement.requirements)}
				key={i}
			/>
		})

		setImprovements(processedImprovements)
	}, [fetchedImprovements, playerImprovements, playerResearches])

	return (
		<View id={id} activePanel={id}>
			<Panel id={id}>
				<PanelHeader left={<PanelHeaderBack onClick={() => go('starship')}/>}>
					Улучшения
				</PanelHeader>

				<Div className={styles.root} style={{ minHeight: window.innerHeight - 78 }}>
					{improvements}
				</Div>
			</Panel>
		</View>
	)
}

export default Improvements
