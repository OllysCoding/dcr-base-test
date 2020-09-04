/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { css } from 'emotion';
import { unescapeData } from '@root/src/lib/escapeData';
import { Caption } from '@root/src/web/components/Caption';
import { Display } from '@root/src/lib/display';

export const GuVideoBlockComponent: React.FC<{
    html: string;
    pillar: Pillar;
    designType: DesignType;
    display: Display;
    credit: string;
    caption?: string;
}> = ({ html, pillar, designType, display, credit, caption }) => {
    const embedContainer = css`
        width: 100%;
        margin-bottom: ${caption ? `0px` : `6px`};
    `;

    return (
        <div className={embedContainer}>
            <div dangerouslySetInnerHTML={{ __html: unescapeData(html) }} />

            {caption && (
                <Caption
                    captionText={caption}
                    designType={designType}
                    pillar={pillar}
                    credit={credit}
                    display={display}
                />
            )}
        </div>
    );
};
