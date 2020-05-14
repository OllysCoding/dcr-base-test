import React from 'react';

import { joinUrl } from '@root/src/web/lib/joinUrl';
import { initPerf } from '@root/src/web/browser/initPerf';

const OnwardsData = React.lazy(() => {
    const { start, end } = initPerf('OnwardsData');
    start();
    return import(/* webpackChunkName: "OnwardsData" */ './OnwardsData').then(
        module => {
            end();
            return { default: module.OnwardsData };
        },
    );
});

type Props = {
    ajaxUrl: string;
    hasStoryPackage: boolean;
    tags: TagType[];
};

export const OnwardsLower = ({ ajaxUrl, hasStoryPackage, tags }: Props) => {
    // In this context, Blog tags are treated the same as Series tags
    const seriesTag = tags.find(
        tag => tag.type === 'Series' || tag.type === 'Blog',
    );

    let url;
    let ophanComponentName: OphanComponentName = 'default-onwards';

    if (hasStoryPackage && seriesTag) {
        // Use the series tag to get other data in the same series
        // Example: {
        //              id: "cities/series/the-illustrated-city",
        //              title: "The illustrated city",
        //              type: "Series",
        //          }
        //
        url = joinUrl([ajaxUrl, 'series', `${seriesTag.id}.json?dcr`]);
        ophanComponentName = 'series';
    }

    if (!url) return null;

    return (
        <OnwardsData
            url={url}
            limit={4}
            ophanComponentName={ophanComponentName}
        />
    );
};
