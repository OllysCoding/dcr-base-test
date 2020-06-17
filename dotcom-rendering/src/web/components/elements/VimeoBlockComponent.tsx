import React from 'react';
import { css } from 'emotion';
import { Caption } from '@root/src/web/components/Caption';

const responsiveAspectRatio = (height: number, width: number) => css`
    /* https://css-tricks.com/aspect-ratio-boxes/ */
    padding-bottom: ${(height / width) * 100}%;
    position: relative;
    iframe {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
`;
export const VimeoBlockComponent: React.FC<{
    pillar: Pillar;
    url: string;
    height: number;
    width: number;
    caption: string;
    credit: string;
    title: string;
}> = ({ url, caption, title, pillar, width, height }) => {
    // 812 is the full height on an iphone X. This ensures that the embed doesn't display any larger than the available viewport
    const maxHeight = 812;
    const aspectRatio = width / height;
    const maxWidth = maxHeight * aspectRatio;

    return (
        <div
            className={css`
                max-width: ${maxWidth}px;
                width: 100%;
            `}
        >
            <div className={responsiveAspectRatio(height, width)}>
                <iframe
                    src={url}
                    title={title}
                    height={height}
                    width={width}
                    allowFullScreen={true}
                />
            </div>
            {caption && (
                <Caption
                    captionText={caption}
                    pillar={pillar}
                    display="standard"
                />
            )}
        </div>
    );
};
