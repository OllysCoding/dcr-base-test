import React from 'react';
import { css } from 'emotion';

import { Picture, PictureSource } from '@root/src/web/components/Picture';
import { Caption } from '@root/src/web/components/Caption';
import { StarRating } from '@root/src/web/components/StarRating/StarRating';
import { until, from, between } from '@guardian/src-foundations/mq';
import { palette } from '@guardian/src-foundations';

const widths = [1020, 660, 480, 0];

const bestFor = (desiredWidth: number, inlineSrcSets: SrcSet[]): SrcSet => {
    const sorted = inlineSrcSets.sort((a, b) => b.width - a.width);

    return sorted.reduce((best, current) => {
        if (current.width < best.width && current.width >= desiredWidth) {
            return current;
        }

        return best;
    });
};

const getSrcSetsForWeighting = (
    imageSources: ImageSource[],
    forWeighting: RoleType,
): SrcSet[] =>
    imageSources.filter(
        ({ weighting }) =>
            // Use toLowerCase to handle cases where we have halfWidth comparing to halfwidth
            weighting.toLowerCase() === forWeighting.toLowerCase(),
    )[0].srcSet;

const makeSource = (
    hidpi: boolean,
    minWidth: number,
    srcSet: SrcSet,
): PictureSource => {
    return {
        hidpi,
        minWidth,
        width: srcSet.width,
        srcset: `${srcSet.src} ${hidpi ? srcSet.width * 2 : srcSet.width}w`,
    };
};

const makeSources = (
    imageSources: ImageSource[],
    role: RoleType,
): PictureSource[] => {
    const inlineSrcSets = getSrcSetsForWeighting(imageSources, role);
    const sources: PictureSource[] = [];

    // TODO: ideally the imageSources array will come from frontend with prebaked URLs for
    // hidpi images.
    // Until that happens, here we're manually injecting (inadequate) <source> elements for
    // those images, albeit without the necessary query params for hidpi images :(
    widths.forEach(width => {
        sources.push(makeSource(true, width, bestFor(width, inlineSrcSets)));
        sources.push(makeSource(false, width, bestFor(width, inlineSrcSets)));
    });

    return sources;
};

const getFallback: (imageSources: ImageSource[]) => string = imageSources => {
    const inlineSrcSets = getSrcSetsForWeighting(imageSources, 'inline');

    return bestFor(300, inlineSrcSets).src;
};

const starsWrapper = css`
    background-color: ${palette.brandYellow.main};

    position: absolute;
    ${until.tablet} {
        bottom: 0;
    }
    ${from.tablet} {
        top: 0;
    }

    /* Stars Padding from largest to smallest width */
    ${from.leftCol} {
        padding-left: 5px;
    }

    ${between.phablet.and.leftCol} {
        padding-left: 0px;
        margin-left: -0px;
    }

    ${between.mobileLandscape.and.phablet} {
        padding-left: 10px;
        margin-left: 0px;
    }

    ${until.mobileLandscape} {
        padding-left: 10px;
        margin-left: 0px;
    }
`;

export const ImageComponent: React.FC<{
    element: ImageBlockElement;
    pillar: Pillar;
    hideCaption?: boolean;
    role: RoleType;
    isMainMedia?: boolean;
    starRating?: number;
}> = ({ element, pillar, hideCaption, role, isMainMedia, starRating }) => {
    const sources = makeSources(element.imageSources, element.role);
    if (hideCaption) {
        return (
            <div
                className={css`
                    position: relative;
                `}
            >
                <Picture
                    sources={sources}
                    alt={element.data.alt || ''}
                    src={getFallback(element.imageSources)}
                />
                {starRating && (
                    <div className={starsWrapper}>
                        <StarRating rating={starRating} size="large" />
                    </div>
                )}
            </div>
        );
    }
    return (
        <Caption
            captionText={element.data.caption || ''}
            pillar={pillar}
            dirtyHtml={true}
            credit={element.data.credit}
            displayCredit={true}
            role={role}
            isMainMedia={isMainMedia}
        >
            <div
                className={css`
                    position: relative;
                `}
            >
                <Picture
                    sources={sources}
                    alt={element.data.alt || ''}
                    src={getFallback(element.imageSources)}
                />
                {starRating && (
                    <div className={starsWrapper}>
                        <StarRating rating={starRating} size="large" />
                    </div>
                )}
            </div>
        </Caption>
    );
};
