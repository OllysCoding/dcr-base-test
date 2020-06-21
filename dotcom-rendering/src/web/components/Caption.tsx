import React from 'react';

import { text, brandBackground } from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';
import { textSans } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { css, cx } from 'emotion';
import { pillarPalette } from '@root/src/lib/pillars';
import TriangleIcon from '@frontend/static/icons/triangle.svg';

type Props = {
    display: Display;
    designType: DesignType;
    captionText?: string;
    pillar: Pillar;
    padCaption?: boolean;
    credit?: string;
    displayCredit?: boolean;
    shouldLimitWidth?: boolean;
    isOverlayed?: boolean;
};

const captionStyle = css`
    ${textSans.xsmall()};
    padding-top: 6px;
    ${textSans.xsmall()};
    word-wrap: break-word;
    color: ${text.supporting};
`;

const bottomMargin = css`
    margin-bottom: 6px;
`;

const overlayedStyles = css`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(18, 18, 18, 0.8);

    span {
        color: white;
        font-size: 0.75rem;
        line-height: 1rem;
    }
    color: white;
    font-size: 0.75rem;
    line-height: 1rem;
    padding-top: 0.375rem;
    padding-right: 2.5rem;
    padding-left: 0.75rem;
    padding-bottom: 0.375rem;

    flex-grow: 1;
    min-height: 2.25rem;
`;

const limitedWidth = css`
    ${from.leftCol} {
        width: 140px;
        /* use absolute position here to allow the article text to push up alongside
           the caption when it is limited in width */
        position: absolute;
    }
    ${from.wide} {
        width: 220px;
    }
`;

const veryLimitedWidth = css`
    ${from.leftCol} {
        width: 104px;
        /* use absolute position here to allow the article text to push up alongside
           the caption when it is limited in width */
        position: absolute;
    }
    ${from.wide} {
        width: 184px;
    }
`;

const captionPadding = css`
    padding-left: 8px;
    padding-right: 8px;
`;

const leftMargin = css`
    margin-left: ${space[9]}px;
`;

const hideIconBelowLeftCol = css`
    ${until.leftCol} {
        display: none;
    }
`;

const iconStyle = (pillar: Pillar) => css`
    fill: ${pillarPalette[pillar].main};
    padding-right: 3px;
`;

const captionLink = (pillar: Pillar) => css`
    a {
        color: ${pillarPalette[pillar].main};
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
    strong {
        font-weight: bold;
    }
`;

export const Caption = ({
    display,
    designType,
    captionText,
    pillar,
    padCaption = false,
    credit,
    displayCredit = true,
    shouldLimitWidth = false,
    isOverlayed,
}: Props) => {
    const noCaption = !captionText;
    const noCredit = !credit;
    const hideCredit = !displayCredit;
    if (noCaption && (noCredit || hideCredit)) return null;

    switch (designType) {
        case 'PhotoEssay':
            return (
                <figcaption
                    className={cx(
                        css`
                            ${textSans.xsmall()};
                            color: ${pillarPalette[pillar].dark};
                            width: 100%;
                            line-height: ${space[5]}px;
                            margin-top: ${space[2]}px;
                            padding-top: ${space[1]}px;
                            border-top: 1px solid ${brandBackground.primary};
                        `,
                        bottomMargin,
                        padCaption && captionPadding,
                        shouldLimitWidth && veryLimitedWidth,
                        shouldLimitWidth && leftMargin,
                    )}
                >
                    {captionText}
                    {credit && displayCredit && ` ${credit}`}
                </figcaption>
            );
        case 'Article':
        case 'Media':
        case 'Live':
        case 'SpecialReport':
        case 'Recipe':
        case 'MatchReport':
        case 'GuardianView':
        case 'GuardianLabs':
        case 'Quiz':
        case 'AdvertisementFeature':
        case 'Feature':
        case 'Comment':
        case 'Analysis':
        case 'Review':
        case 'Immersive':
        case 'Interview':
            return (
                <figcaption
                    className={cx(
                        captionStyle,
                        shouldLimitWidth && limitedWidth,
                        !isOverlayed && bottomMargin,
                        isOverlayed && overlayedStyles,
                        {
                            [captionPadding]: padCaption,
                        },
                    )}
                >
                    <span
                        className={cx(
                            iconStyle(pillar),
                            display === 'immersive' && hideIconBelowLeftCol,
                        )}
                    >
                        <TriangleIcon />
                    </span>
                    {captionText && (
                        <span
                            className={captionLink(pillar)}
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                                __html: captionText || '',
                            }}
                            key="caption"
                        />
                    )}
                    {credit && displayCredit && ` ${credit}`}
                </figcaption>
            );
    }
};
