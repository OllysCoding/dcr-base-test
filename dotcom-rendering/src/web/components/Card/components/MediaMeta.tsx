import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';

import Audio from '@frontend/static/icons/audio.svg';
import Photo from '@frontend/static/icons/photo.svg';
import Video from '@frontend/static/icons/video.svg';

type Props = {
    mediaType: MediaType;
    pillar: Pillar;
    mediaDuration?: number;
};

const iconWrapperStyles = (mediaType: MediaType, pillar: Pillar) => css`
    width: 24px;
    height: 23px;
    /* Below we force the colour to be bright if the pillar is news (because it looks better) */
    background-color: ${pillar === 'news'
        ? palette[pillar].bright
        : palette[pillar].main};
    border-radius: 50%;
    display: inline-block;

    > svg {
        width: 14px;
        height: auto;
        margin-left: auto;
        margin-right: auto;
        margin-top: 6px;
        display: block;
        transform: ${mediaType === 'Video' ? `translateY(0.0625rem)` : ``};
    }
`;

const durationStyles = (pillar: Pillar) => css`
    /* Below we force the colour to be bright if the pillar is news (because it looks better) */
    color: ${pillar === 'news' ? palette[pillar].bright : palette[pillar].main};
    ${textSans.xsmall({ fontWeight: `bold` })}
`;

const wrapperStyles = css`
    display: flex;
    align-items: center;
`;

export function secondsToDuration(secs?: number): string {
    if (typeof secs === `undefined` || secs === 0) {
        return ``;
    }
    const seconds = Number(secs);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);

    const duration = [];
    if (h > 0) {
        duration.push(h);
    }
    if (m > 0 || h === 0) {
        // supports 0:59
        duration.push(m);
    }
    if (s > 0) {
        duration.push(s);
    }
    return duration.join(':');
}

const Icon = ({ mediaType }: { mediaType: MediaType }) => {
    switch (mediaType) {
        case 'Gallery':
            return <Photo />;
        case 'Video':
            return <Video />;
        case 'Audio':
            return <Audio />;
    }
};

const MediaIcon = ({
    mediaType,
    pillar,
}: {
    mediaType: MediaType;
    pillar: Pillar;
}) => (
    <span className={iconWrapperStyles(mediaType, pillar)}>
        <Icon mediaType={mediaType} />
    </span>
);

const MediaDuration = ({
    mediaDuration,
    pillar,
}: {
    mediaDuration: number;
    pillar: Pillar;
}) => (
    <p className={durationStyles(pillar)}>{secondsToDuration(mediaDuration)}</p>
);

export const MediaMeta = ({ mediaType, mediaDuration, pillar }: Props) => (
    <div className={wrapperStyles}>
        <MediaIcon mediaType={mediaType} pillar={pillar} />
        &nbsp;
        {mediaDuration && (
            <MediaDuration mediaDuration={mediaDuration} pillar={pillar} />
        )}
    </div>
);
