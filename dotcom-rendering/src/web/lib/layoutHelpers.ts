import { Design, Pillar } from '@guardian/types';
import { decidePillar } from './decidePillar';

export const decideLineEffect = (
	design: Design,
	pillar: Theme,
): LineEffectType => {
	if (pillar === Pillar.Sport) {
		return 'dotted';
	}

	switch (design) {
		case Design.Feature:
		case Design.Recipe:
			return 'squiggly';
		default:
			return 'straight';
	}
};

export const decideLineCount = (design?: Design): 8 | 4 => {
	if (design === Design.Comment) {
		return 8;
	}
	return 4;
};

export const getCurrentPillar = (CAPI: CAPIType): Theme => {
	const currentPillar =
		(CAPI.nav.currentPillar &&
			CAPI.nav.currentPillar.title.toLowerCase()) ||
		CAPI.pillar;
	return decidePillar({ pillar: currentPillar });
};
