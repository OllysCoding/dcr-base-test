import React from 'react';
import { getIdFromUrl } from '@root/src/amp/lib/get-video-id';
import { Caption } from '@root/src/amp/components/Caption';

export const VideoVimeo: React.FC<{
    element: VideoVimeoBlockElement;
    pillar: Pillar;
}> = ({ element, pillar }) => {
    const vimeoId = getIdFromUrl(element.url, '(\\d+)($|\\/)', true);

    return (
        <Caption captionText={element.caption} pillar={pillar}>
            <amp-vimeo
                data-videoid={vimeoId}
                layout="responsive"
                width={element.width}
                height={element.height}
            />
        </Caption>
    );
};
