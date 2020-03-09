import React from 'react';

import { css } from 'emotion';
import { text } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';

const captionFont = css`
    ${textSans.xsmall()};
    color: ${text.supporting};
`;

const dateline = css`
    ${captionFont};

    padding-top: 2px;
    margin-bottom: 6px;
`;

const description = css`
    ${visuallyHidden}
`;

export const Dateline: React.FC<{
    dateDisplay: string;
    descriptionText: string;
}> = ({ dateDisplay, descriptionText }) => (
    <>
        <div className={dateline} role="textbox">
            <span className={description}>{descriptionText} </span>
            {dateDisplay}
        </div>
    </>
);
