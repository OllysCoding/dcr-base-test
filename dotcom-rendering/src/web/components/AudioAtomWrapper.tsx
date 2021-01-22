import React, { useEffect, useState } from 'react';
import { AudioAtom } from '@guardian/atoms-rendering';
import {
	onConsentChange,
	getConsentFor,
} from '@guardian/consent-management-platform';

import { themeToPillar } from '@root/src/web/lib/themeToPillar';

type Props = {
	id: string;
	trackUrl: string;
	kicker: string;
	title?: string | undefined;
	pillar: Theme;
	contentIsNotSensitive: boolean;
	aCastisEnabled: boolean;
	readerCanBeShownAds: boolean;
};

export const AudioAtomWrapper = ({
	id,
	trackUrl,
	kicker,
	title,
	pillar,
	contentIsNotSensitive,
	aCastisEnabled,
	readerCanBeShownAds,
}: Props) => {
	// *****************
	// *     ACast     *
	// *****************
	const [shouldUseAcast, setShouldUseAcast] = useState<boolean>(false);
	useEffect(() => {
		onConsentChange((state: any) => {
			// Should we use ad enabled audio? If so, then set the shouldUseAcast
			// state to true, triggering a rerender of AudioAtom using a new track url
			// (one with adverts)
			const consentGiven = getConsentFor('acast', state);
			if (
				aCastisEnabled &&
				consentGiven &&
				readerCanBeShownAds && // Eg. Not a subscriber
				contentIsNotSensitive
			) {
				setShouldUseAcast(true);
			}
		});
	}, [contentIsNotSensitive, aCastisEnabled, readerCanBeShownAds]);

	return (
		<AudioAtom
			id={id}
			trackUrl={trackUrl}
			kicker={kicker}
			title={title}
			pillar={themeToPillar(pillar)}
			shouldUseAcast={shouldUseAcast}
		/>
	);
};
