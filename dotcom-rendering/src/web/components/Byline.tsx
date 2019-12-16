import React from 'react';
import { css, cx } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { until } from '@guardian/src-foundations/mq';

type Props = {
    text: string;
    designType: DesignType;
    pillar: Pillar;
    size: SmallHeadlineSize;
};

const bylineStyles = (size: SmallHeadlineSize) => {
    switch (size) {
        case 'large':
            return css`
                display: block;
                font-style: italic;
                ${headline.xsmall()};
                ${until.desktop} {
                    ${headline.xxsmall()};
                }
            `;
        case 'medium':
            return css`
                display: block;
                font-style: italic;
                ${headline.xxsmall()};
                ${until.desktop} {
                    ${headline.xxxsmall()};
                }
            `;
        case 'small':
            return css`
                display: block;
                font-style: italic;
                ${headline.xxxsmall()};
            `;
    }
};

const colourStyles = (designType: DesignType, pillar: Pillar) => {
    switch (designType) {
        case 'Comment':
        case 'Comment':
        case 'Analysis':
        case 'Feature':
        case 'Interview':
        case 'Article':
        case 'Media':
        case 'Review':
        case 'Live':
        case 'SpecialReport':
        case 'Recipe':
        case 'MatchReport':
        case 'GuardianView':
        case 'GuardianLabs':
        case 'Quiz':
        case 'AdvertisementFeature':
        case 'Immersive':
        default:
            return css`
                color: ${palette[pillar].main};
            `;
    }
};

export const Byline = ({ text, designType, pillar, size }: Props) => (
    <span className={cx(bylineStyles(size), colourStyles(designType, pillar))}>
        {text}
    </span>
);
