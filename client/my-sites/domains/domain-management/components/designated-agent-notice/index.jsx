import { Gridicon } from '@automattic/components';
import { localizeUrl } from '@automattic/i18n-utils';
import { localize } from 'i18n-calypso';
import { DESIGNATED_AGENT, DOMAIN_REGISTRATION_AGREEMENTS } from 'calypso/lib/url/support';

import './style.scss';

const DesignatedAgentNotice = ( props ) => (
	<div className="designated-agent-notice">
		<Gridicon icon="info-outline" size={ 18 } />
		<p className="designated-agent-notice__copy">
			{ props.translate(
				'By clicking {{strong}}%(saveButtonLabel)s{{/strong}}, you agree to the ' +
					'applicable {{draLink}}Domain Registration Agreement{{/draLink}} and confirm that the Transferee has ' +
					'agreed in writing to be bound by the same agreement. You authorize the respective registrar to act as ' +
					'your {{supportLink}}Designated Agent{{/supportLink}}.',
				{
					args: {
						saveButtonLabel: props.saveButtonLabel,
					},
					components: {
						strong: <strong />,
						draLink: (
							<a
								href={
									props.domainRegistrationAgreementUrl ||
									localizeUrl( DOMAIN_REGISTRATION_AGREEMENTS )
								}
								target="_blank"
								rel="noopener noreferrer"
							/>
						),
						supportLink: (
							<a
								href={ localizeUrl( DESIGNATED_AGENT ) }
								target="_blank"
								rel="noopener noreferrer"
							/>
						),
					},
				}
			) }
		</p>
	</div>
);

export default localize( DesignatedAgentNotice );
