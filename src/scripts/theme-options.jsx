// eslint-disable-next-line import/no-extraneous-dependencies
import { createRoot } from '@wordpress/element';
import { TabPanel } from '@wordpress/components';

function App() {
	return (
		<TabPanel
			onSelect={ function noRefCheck() {} }
			tabs={ [
				{
					disabled: true,
					name: 'tab1',
					title: 'Tab 1',
				},
				{
					name: 'tab2',
					title: 'Tab 2',
				},
				{
					name: 'tab3',
					title: 'Tab 3',
				},
				{
					name: 'tab4',
					title: 'Tab 4',
				},
			] }
		>
			{ ( tab ) => {
				return <p>{ tab.title }</p>;
			} }
		</TabPanel>
	);
}

document.addEventListener( 'DOMContentLoaded', () => {
	const container = document.getElementById( 'test-app' );
	if ( container ) {
		createRoot( container ).render( <App /> );
	} else {
		//console.error( 'Container element with id "app" not found.' );
	}
} );
