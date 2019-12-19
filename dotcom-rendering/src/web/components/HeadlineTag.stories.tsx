import React from 'react';

import { HeadlineTag } from './HeadlineTag';
import { css } from 'emotion';

/* tslint:disable */
export default {
    component: HeadlineTag,
    title: 'Components/HeadlineTag',
};
/* tslint:enable */

export const defaultStory = () => {
    return <HeadlineTag tagText="Tag name" pillar="culture" />;
};
defaultStory.story = { name: 'default' };

export const longTagNameStory = () => {
    return <HeadlineTag tagText="Slightly longer tag name" pillar="news" />;
};
longTagNameStory.story = { name: 'With a longer tag name' };

export const wrappedTagNameStory = () => {
    return (
        <div
            className={css`
                max-width: 400px;
            `}
        >
            <HeadlineTag
                tagText="Very long tag name with enough text to wrap to a second line"
                pillar="labs"
            />
        </div>
    );
};
wrappedTagNameStory.story = { name: 'With wrapped tag name' };
