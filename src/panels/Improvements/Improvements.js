import React, { useState, useEffect } from 'react'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import { PanelHeaderBack } from '@vkontakte/vkui';
import styles from './improvements.module.scss'
import Improvement from './Improvement/Improvement';
import { useSelector } from 'react-redux';
import { getRequirementsList } from './helpers'

const Improvements = ({ id, go }) => {
	const fetchedImprovements = useSelector(state => state.improvements)
	const playerImprovements = useSelector(state => state.player.improvements)
	const playerResearches = useSelector(state => state.player.researches)
	const [improvements, setImprovements] = useState([])

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
		<Panel id={id}>
			<PanelHeader
				left={<PanelHeaderBack
				onClick={go}
				data-to='starship'
			/>}>
				Улучшения
			</PanelHeader>

			<Div className={styles.root} style={{ minHeight: window.innerHeight - 78 }}>
				{improvements}
			</Div>
		</Panel>
	)
}

export default Improvements
