import React from 'react';
import { css } from 'emotion';

import { body } from '@guardian/src-foundations/typography';

import { unwrapHtml } from '@root/src/model/unwrapHtml';
import { RewrappedComponent } from '@root/src/web/components/elements/RewrappedComponent';

import { DropCap } from '@frontend/web/components/DropCap';

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
                    html={remainingLetters}
                    elCss={paraStyles}
                    tagName="p"
                />
            </>
        );
    }

    return (
        <RewrappedComponent
            isUnwrapped={isUnwrapped}
            html={unwrappedHtml}
            elCss={paraStyles}
            tagName="p"
        />
    );
};
