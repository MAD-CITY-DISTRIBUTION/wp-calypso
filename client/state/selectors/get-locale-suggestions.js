import { get } from 'lodash';

import 'calypso/state/i18n/init';

/**
 * Returns an object of localized language names
 *
 * @param  {Object}  state Global state tree
 * @returns {Array|null} an array of guessed locales for the user
 */
export default function getLocaleSuggestions( state ) {
	return get( state, 'i18n.localeSuggestions', null );
}
