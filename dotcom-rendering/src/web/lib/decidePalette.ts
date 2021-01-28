import { Display, Design, Special } from '@guardian/types';
import type { Format } from '@guardian/types';
import {
	neutral,
	text,
	specialReport,
	opinion,
} from '@guardian/src-foundations';

import { pillarPalette } from '@root/src/lib/pillars';

const WHITE = neutral[100];
const BLACK = text.primary;

const textHeadline = (format: Format): string => {
	switch (format.display) {
		case Display.Immersive:
			switch (format.design) {
				case Design.PrintShop:
					return BLACK;
				default:
					return WHITE;
			}
		case Display.Showcase:
		case Display.Standard: {
			switch (format.design) {
				case Design.Review:
				case Design.Recipe:
				case Design.Feature:
					return pillarPalette[format.theme].dark;
				case Design.Interview:
					return WHITE;
				default:
					return BLACK;
			}
		}
		default:
			return BLACK;
	}
};

const textSeriesTitle = (format: Format): string => {
	switch (format.display) {
		case Display.Immersive:
			return WHITE;
		case Display.Showcase:
		case Display.Standard:
			switch (format.design) {
				case Design.MatchReport:
					return BLACK;
				default:
					return pillarPalette[format.theme].main;
			}
		default:
			return BLACK;
	}
};

const textSectionTitle = textSeriesTitle;

const backgroundArticle = (format: Format): string => {
	// Order matters. We want comment special report pieces to have the opinion background
	if (format.design === Design.Comment) return opinion[800];
	if (format.theme === Special.SpecialReport) return specialReport[800];
	return 'transparent';
};

const backgroundSeriesTitle = (format: Format): string => {
	switch (format.display) {
		case Display.Immersive:
			return pillarPalette[format.theme].main;
		case Display.Showcase:
		case Display.Standard:
		default:
			return 'transparent';
	}
};

const backgroundSectionTitle = backgroundSeriesTitle;

export const decidePalette = (format: Format) => {
	return {
		text: {
			headline: textHeadline(format),
			seriesTitle: textSeriesTitle(format),
			sectionTitle: textSectionTitle(format),
		},
		background: {
			article: backgroundArticle(format),
			seriesTitle: backgroundSeriesTitle(format),
			sectionTitle: backgroundSectionTitle(format),
		},
	};
};
