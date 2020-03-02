import React from 'react';
import { css } from 'emotion';

import { body } from '@guardian/src-foundations/typography';
import { sanitise } from '@frontend/lib/sanitise-html';

import { unwrapHtml } from '@root/src/model/unwrapHtml';
import { RewrappedComponent } from '@root/src/web/components/elements/RewrappedComponent';

import { DropCap } from '@frontend/web/components/DropCap';
// tslint:disable:react-no-dangerous-html

type Props = {
    html: string;
    pillar: Pillar;
    designType: DesignType;
    dropCap?: boolean;
};

const isLetter = (letter: string) => {
    return letter.toLowerCase() !== letter.toUpperCase();
};

const isLongEnough = (html: string) => {
    return html.length > 199;
};

const decideDropCap = (html: string) => {
    const first = html.substr(0, 1);
    if (first === '“') {
        const second = html.substr(1, 1);

        if (!isLetter(second)) {
            return false;
        }
        return `${first}${second}`;
    }

    return isLetter(first) && first;
};

const sanitiserOptions = {
    // Defaults: https://www.npmjs.com/package/sanitize-html#what-are-the-default-options
    allowedTags: false, // Leave tags from CAPI alone
    allowedAttributes: false, // Leave attributes from CAPI alone
    transformTags: {
        a: (tagName: string, attribs: {}) => ({
            tagName, // Just return anchors as is
            attribs: {
                ...attribs, // Merge into the existing attributes
                ...{
                    'data-link-name': 'in body link', // Add the data-link-name for Ophan to anchors
                },
            },
        }),
    },
};

export const TextBlockComponent: React.FC<Props> = ({
    html,
    pillar,
    designType,
    dropCap,
}: Props) => {
    const { willUnwrap: isUnwrapped, unwrappedHtml } = unwrapHtml({
        prefix: '<p>',
        suffix: '</p>',
        html,
    });

    const paraStyles = css`
        margin-bottom: 16px;
        ${body.medium()};
    `;

    const firstLetter = decideDropCap(unwrappedHtml);
    const remainingLetters = firstLetter
        ? unwrappedHtml.substr(firstLetter.length)
        : unwrappedHtml;

    if (dropCap && firstLetter && isLongEnough(remainingLetters)) {
        return (
            <>
                <DropCap
                    letter={firstLetter}
                    pillar={pillar}
                    designType={designType}
                />
                <RewrappedComponent
                    isUnwrapped={isUnwrapped}
                    html={sanitise(remainingLetters, sanitiserOptions)}
                    elCss={paraStyles}
                    tagName="p"
                />
            </>
        );
    }

    return (
        <RewrappedComponent
            isUnwrapped={isUnwrapped}
            html={sanitise(unwrappedHtml, sanitiserOptions)}
            elCss={paraStyles}
            tagName="p"
        />
    );
};
