import React from 'react';

import { text } from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';
import { textSans } from '@guardian/src-foundations/typography';
import { css, cx } from 'emotion';
import { pillarPalette } from '@root/src/lib/pillars';
import TriangleIcon from '@frontend/static/icons/triangle.svg';

type Props = {
    display: Display;
    captionText?: string;
    pillar: Pillar;
    padCaption?: boolean;
    credit?: string;
    displayCredit?: boolean;
    shouldLimitWidth?: boolean;
};

const captionStyle = css`
    padding-top: 6px;
    margin-bottom: 6px;
    ${textSans.xsmall()};
    word-wrap: break-word;
    color: ${text.supporting};

    ${until.tablet} {
        display: none;
    }
`;

const limitedWidth = css`
    /* use absolute position here to allow the article text to push up alongside
    the caption when it is limited in width */
    position: absolute;

    ${from.leftCol} {
        width: 140px;
    }
    ${from.wide} {
        width: 220px;
    }
`;

const captionPadding = css`
    padding-left: 8px;
    padding-right: 8px;
`;

const hideIconBelowLeftCol = css`
    ${until.leftCol} {
        display: none;
    }
`;

export const Caption = ({
    display,
    captionText,
    pillar,
    padCaption = false,
    credit,
    displayCredit = true,
    shouldLimitWidth = false,
}: Props) => {
    const iconStyle = css`
        fill: ${pillarPalette[pillar].main};
        padding-right: 3px;
    `;

    const captionLink = css`
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

    const getCaptionHtml = () => {
        return (
            <span
                className={captionLink}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: captionText || '',
                }}
                key="caption"
            />
        );
    };

    if (!captionText) return null;

    return (
        <figcaption
            className={cx(captionStyle, shouldLimitWidth && limitedWidth, {
                [captionPadding]: padCaption,
            })}
        >
            <span
                className={cx(
                    iconStyle,
                    display === 'immersive' && hideIconBelowLeftCol,
                )}
            >
                <TriangleIcon />
            </span>
            {getCaptionHtml()} {displayCredit && credit}
        </figcaption>
    );
};
