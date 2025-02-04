/* eslint-disable no-restricted-imports */
/**
 * External Dependencies
 */
import { recordTracksEvent } from '@automattic/calypso-analytics';
import { CardBody } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { getSectionName } from 'calypso/state/ui/selectors';
/**
 * Internal Dependencies
 */
import { HELP_CENTER_STORE } from '../stores';
import { HelpCenterContactForm } from './help-center-contact-form';
import { HelpCenterContactPage } from './help-center-contact-page';
import { HelpCenterEmbedResult } from './help-center-embed-result';
import { HelpCenterSearch } from './help-center-search';
import { SuccessScreen } from './ticket-success-screen';
import type { HelpCenterSelect } from '@automattic/data-stores';

const HelpCenterContent: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const className = classnames( 'help-center__container-content' );
	const containerRef = useRef< HTMLDivElement >( null );
	const section = useSelector( getSectionName );

	useEffect( () => {
		recordTracksEvent( 'calypso_helpcenter_page_open', {
			pathname: location.pathname,
			search: location.search,
			section,
			force_site_id: true,
			location: 'help-center',
		} );
	}, [ location, section ] );

	const { initialRoute } = useSelect(
		( select ) => ( {
			initialRoute: ( select( HELP_CENTER_STORE ) as HelpCenterSelect ).getInitialRoute(),
		} ),
		[]
	);

	useEffect( () => {
		if ( initialRoute ) {
			navigate( initialRoute );
		}
	}, [ initialRoute ] );

	// reset the scroll location on navigation, TODO: unless there's an anchor
	useEffect( () => {
		if ( containerRef.current ) {
			containerRef.current.scrollTo( 0, 0 );
		}
	}, [ location ] );

	return (
		<CardBody ref={ containerRef } className={ className }>
			<Routes>
				<Route path="/" element={ <HelpCenterSearch /> } />
				<Route path="/post" element={ <HelpCenterEmbedResult /> } />
				<Route path="/contact-options" element={ <HelpCenterContactPage /> } />
				<Route path="/contact-form" element={ <HelpCenterContactForm /> } />
				<Route path="/success" element={ <SuccessScreen /> } />
			</Routes>
		</CardBody>
	);
};

export default HelpCenterContent;
