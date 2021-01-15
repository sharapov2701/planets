import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

const Home = ({ id, go }) => (
	<Panel id={id}>
		<PanelHeader>База</PanelHeader>
		<Div>
			<Button size="xl" level="2" onClick={go} data-to="starship">
				Корабль
			</Button>
			<br />
			<Button size="xl" level="2" onClick={go} data-to="map">
				Карта
			</Button>
			<br />
		</Div>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Home;
