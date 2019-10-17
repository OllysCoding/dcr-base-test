import React from 'react';
import { Caption } from '@guardian/guui/components/Caption/Caption';
import { constructQuery } from '../../lib/querystring';

export const YoutubeVideo: React.FC<{
    element: YoutubeBlockElement;
    pillar: Pillar;
    adTargeting?: any;
}> = ({ element, pillar, adTargeting }) => {
    // https://www.ampproject.org/docs/reference/components/amp-youtube
    // https://developers.google.com/youtube/player_parameters

    const embedConfig = {
        adsConfig: {
            adTagParameters: {
                iu: `${adTargeting.adUnit || ''}`,
                cust_params: constructQuery(adTargeting.customParams),
            },
        },
    };
    const encodedEmbedConfig = encodeURIComponent(JSON.stringify(embedConfig));

    const attributes: any = {
        id: `gu-video-youtube-${element.id}`,
        'data-videoid': element.assetId,
        layout: 'responsive',
        width: '16',
        height: '9',
        'data-param-modestbranding': true, // Remove YouTube logo
    };

    if (element.channelId) {
        // related videos metadata
        attributes['data-param-rel'] = '0';
        attributes['data-param-listType'] = 'playlist';
        attributes['data-param-list'] = element.channelId;
        attributes['data-param-embed_config'] = encodedEmbedConfig;
    }

    return (
        <Caption
            captionText={element.mediaTitle}
            pillar={pillar}
            padCaption={true}
        >
            <amp-youtube {...attributes} />
        </Caption>
    );
};
