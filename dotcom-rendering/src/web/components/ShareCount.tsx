import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { from, between } from '@guardian/src-foundations/mq';

import ShareIcon from '@frontend/static/icons/share.svg';
import { integerCommas } from '@root/src/lib/formatters';
import { useApi } from '@root/src/web/components/lib/api';

type Props = {
    ajaxUrl: string;
    pageId: string;
};

type ShareCountType = {
    path: string;
    share_count: number;
    refreshStatus: boolean;
};

const shareCountStyles = css`
    ${textSans.medium()};
    font-weight: bold;
    color: ${palette.neutral[46]};

    ${from.leftCol} {
        border-top: 1px solid ${palette.neutral[86]};
        width: 100%;
        padding-top: 6px;
    }

    ${from.wide} {
        flex: 1;
        border: 0;
        padding-top: 0;
        text-align: right;
    }
`;

const containerStyles = css`
    ${from.leftCol} {
        display: inline-block;
    }
`;

const headerStyles = css`
    position: relative;
    height: 15px;
    margin: 0;
`;

const iconStyles = css`
    position: absolute;
    top: 0;
    right: 0;
    fill: ${palette.neutral[46]};
`;

const longStyles = css`
    display: block;

    ${between.leftCol.and.wide} {
        display: none;
    }
`;

const shortStyles = css`
    display: none;

    ${between.leftCol.and.wide} {
        display: block;
    }
`;

export const ShareCount = ({ ajaxUrl, pageId }: Props) => {
    const url = `${ajaxUrl}/sharecount/${pageId}.json`;
    const { data, error } = useApi<ShareCountType>(url);

    if (error) {
        window.guardian.modules.sentry.reportError(error, 'share-count');

        return null;
    }

    if (!data || !data.share_count) {
        return null;
    }

    const countAsInteger = parseInt(data.share_count.toFixed(0), 10);
    const displayCountLong = integerCommas(countAsInteger);
    const displayCountShort =
        countAsInteger > 10000
            ? `${Math.round(countAsInteger / 1000)}k`
            : countAsInteger;

    return (
        <div
            className={shareCountStyles}
            aria-label={`${displayCountShort} Shares`}
            data-cy="share-count"
        >
            <div className={containerStyles}>
                <div className={headerStyles}>
                    <ShareIcon className={iconStyles} />
                </div>
                <div
                    data-testid="countFull"
                    className={longStyles}
                    aria-hidden="true"
                >
                    {displayCountLong}
                </div>
                <div
                    data-testid="countShort"
                    className={shortStyles}
                    aria-hidden="true"
                >
                    {displayCountShort}
                </div>
            </div>
        </div>
    );
};
