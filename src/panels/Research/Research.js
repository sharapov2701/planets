import React, { useState } from 'react'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import { PanelHeaderBack } from '@vkontakte/vkui';
import styles from './research.module.scss'

const Research = ({ id, go }) => {

	return (
		<Panel id={id}>
			<PanelHeader left={<PanelHeaderBack onClick={go} data-to='starship' />}>Исследования</PanelHeader>
			<Div className={styles.root} style={{ height: window.innerHeight - 78 }}>
				f
			</Div>
		</Panel>
	)
}

export default Research
