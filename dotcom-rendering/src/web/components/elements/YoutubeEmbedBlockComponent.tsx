import React from 'react';
import { css } from 'emotion';

import { Caption } from '@root/src/web/components/Caption';
import { MaintainAspectRatio } from '@frontend/web/components/MaintainAspectRatio';
import { Display } from '@root/src/lib/display';

export const YoutubeEmbedBlockComponent: React.FC<{
    pillar: Pillar;
    embedUrl?: string;
    height: number;
    width: number;
    caption?: string;
    credit?: string;
    title?: string;
    display: Display;
    designType: DesignType;
}> = ({
    embedUrl,
    caption,
    title,
    pillar,
    width,
    height,
    display,
    designType,
    credit,
}) => {
    // 812 is the full height on an iphone X. This ensures that the embed doesn't display any larger than the available viewport
    // Constrain iframe embeds with a width to their natural width
    // rather than stretch them to the container using
    // a max that would prevent portrait videos from being taller than an iphone X (baseline)
    // More context: https://github.com/guardian/frontend/pull/17902
    const maxHeight = 812;
    const aspectRatio = width / height;
    const maxWidth = maxHeight * aspectRatio;
    const hasCaption = caption != null;

    const embedContainer = css`
        max-width: ${maxWidth}px;
        width: 100%;
        margin-bottom: ${hasCaption ? `0px` : `6px`};
    `;

    return (
        <div className={embedContainer}>
            <MaintainAspectRatio height={height} width={width}>
                <iframe
                    src={embedUrl}
                    title={title}
                    height={height}
                    width={width}
                    allowFullScreen={true}
                />
            </MaintainAspectRatio>
            {hasCaption && (
                <Caption
                    captionText={caption}
                    designType={designType}
                    pillar={pillar}
                    display={display}
                    credit={credit}
                />
            )}
        </div>
    );
};
