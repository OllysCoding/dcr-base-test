import React from 'react';
import { css, cx } from 'emotion';

import { until, from, between } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import {
    brandAltBackground,
    border,
    neutral,
} from '@guardian/src-foundations/palette';

import { Picture, PictureSource } from '@root/src/web/components/Picture';
import { Caption } from '@root/src/web/components/Caption';
import { Hide } from '@root/src/web/components/Hide';
import { StarRating } from '@root/src/web/components/StarRating/StarRating';

type Props = {
    display: Display;
    designType: DesignType;
    element: ImageBlockElement;
    role: RoleType;
    pillar: Pillar;
    hideCaption?: boolean;
    isMainMedia?: boolean;
    starRating?: number;
    title?: string;
};

const widths = [1020, 660, 480, 0];

const bestFor = (
    desiredWidth: number,
    inlineSrcSets: SrcSetItem[],
): SrcSetItem => {
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
): SrcSetItem[] =>
    imageSources.filter(
        ({ weighting }) =>
            // Use toLowerCase to handle cases where we have halfWidth comparing to halfwidth
            weighting.toLowerCase() === forWeighting.toLowerCase(),
    )[0].srcSet;

const makeSource = (
    hidpi: boolean,
    minWidth: number,
    srcSet: SrcSetItem,
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
    background-color: ${brandAltBackground.primary};

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

    ${until.phablet} {
        padding-left: 10px;
        margin-left: 0px;
    }
`;

const PositionStarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className={starsWrapper}>
        <StarRating rating={rating} size="large" />
    </div>
);

const basicTitlePadding = css`
    ${until.tablet} {
        padding-top: 4px;
        padding-bottom: 14px;
        padding-left: 20px;
        padding-right: 20px;
    }

    ${from.tablet} {
        padding-top: 4px;
        padding-bottom: 17px;
        padding-left: 20px;
        padding-right: 20px;
    }
`;

const moreTitlePadding = css`
    ${basicTitlePadding}

    ${from.leftCol} {
        padding-top: 4px;
        padding-bottom: 17px;
        padding-left: 180px;
        padding-right: 20px;
    }

    ${from.wide} {
        padding-top: 4px;
        padding-bottom: 17px;
        padding-left: 260px;
        padding-right: 20px;
    }
`;

const titleWrapper = css`
    position: absolute;
    bottom: 0;
    width: 100%;

    ${until.desktop} {
        ${headline.xxsmall({ fontWeight: 'light' })}
    }
    ${until.phablet} {
        ${headline.xxxsmall({ fontWeight: 'light' })}
    }
    ${from.desktop} {
        ${headline.xsmall({ fontWeight: 'light' })}
    }
    color: ${neutral[100]};
    background: linear-gradient(transparent, ${neutral[0]});

    :before {
        background-color: ${border.focusHalo};
        display: block;
        content: '';
        width: 8.75rem;
        ${until.desktop} {
            height: 0.5rem;
        }
        ${from.desktop} {
            height: 0.75rem;
        }

        margin-bottom: calc(1.25rem / 3);
    }
`;

const ImageTitle: React.FC<{ title: string; role: RoleType }> = ({
    title,
    role,
}) => {
    switch (role) {
        case 'inline':
        case 'thumbnail':
        case 'halfWidth':
        case 'supporting':
            return (
                <h2 className={cx(titleWrapper, basicTitlePadding)}>{title}</h2>
            );
        case 'showcase':
        case 'immersive':
            return (
                <h2 className={cx(titleWrapper, moreTitlePadding)}>{title}</h2>
            );
    }
};

const Row = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
    <div
        className={css`
            display: flex;
            flex-direction: row;
        `}
    >
        {children}
    </div>
);

const CaptionToggle = () => (
    <>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
            htmlFor="the-checkbox"
            className={css`
                position: absolute;
                right: 5px;
                width: 32px;
                height: 32px;
                z-index: 1;
                /* We're using rgba here for the opactiy */
                background-color: rgba(18, 18, 18, 0.6);
                border-radius: 50%;
                bottom: 6px;
                border: none;
                cursor: pointer;

                svg {
                    top: 0;
                    bottom: 0;
                    right: 0;
                    left: 0;
                    margin: auto;
                    position: absolute;
                    fill: white;
                }
            `}
        >
            <svg width="6" height="14" fill="white" viewBox="0 0 6 14">
                <path d="M4.6 12l-.4 1.4c-.7.2-1.9.6-3 .6-.7 0-1.2-.2-1.2-.9 0-.2 0-.3.1-.5l2-6.7H.7l.4-1.5 4.2-.6h.2L3 12h1.6zm-.3-9.2c-.9 0-1.4-.5-1.4-1.3C2.9.5 3.7 0 4.6 0 5.4 0 6 .5 6 1.3c0 1-.8 1.5-1.7 1.5z" />
            </svg>
        </label>
        {/* Hidden input used to toggle the caption using css */}
        <input type="checkbox" id="the-checkbox" />
    </>
);

export const ImageComponent = ({
    display,
    designType,
    element,
    pillar,
    hideCaption,
    role,
    isMainMedia,
    starRating,
    title,
}: Props) => {
    const { imageSources } = element;
    const sources = makeSources(imageSources, role);
    const shouldLimitWidth =
        !isMainMedia &&
        (role === 'showcase' || role === 'supporting' || role === 'immersive');
    const isNotOpinion =
        designType !== 'Comment' && designType !== 'GuardianView';

    if (isMainMedia && display === 'immersive' && isNotOpinion) {
        return (
            <div
                className={css`
                    /* These styles depend on the containing layout component wrapping the main media
                    with a div set to 100vh. This is the case for ImmersiveLayout which should
                    always be used if display === 'immersive' */
                    position: absolute;
                    top: 0;
                    height: 100%;
                    width: 100%;

                    img {
                        object-fit: cover;
                    }
                `}
            >
                <Picture
                    sources={sources}
                    alt={element.data.alt || ''}
                    src={getFallback(element.imageSources)}
                />
                {starRating && <PositionStarRating rating={starRating} />}
                {title && <ImageTitle title={title} role={role} />}
            </div>
        );
    }

    if (hideCaption) {
        return (
            <div
                className={css`
                    position: relative;

                    img {
                        width: 100%;
                        object-fit: cover;
                    }
                `}
            >
                <Picture
                    sources={sources}
                    alt={element.data.alt || ''}
                    src={getFallback(element.imageSources)}
                />
                {starRating && <PositionStarRating rating={starRating} />}
                {title && <ImageTitle title={title} role={role} />}
            </div>
        );
    }

    return (
        <>
            <div
                className={css`
                    position: relative;

                    img {
                        width: 100%;
                        object-fit: cover;
                    }
                `}
            >
                <Picture
                    sources={sources}
                    alt={element.data.alt || ''}
                    src={getFallback(element.imageSources)}
                />
                {isMainMedia && (
                    // Below tablet, main media images show an info toggle at the bottom right of
                    // the image which, when clicked, toggles the caption as an overlay
                    <Hide when="above" breakpoint="tablet">
                        <Row>
                            <div
                                className={css`
                                    #the-checkbox {
                                        /* Never show the input */
                                        display: none;
                                    }
                                    #the-caption {
                                        /* Hide caption by default */
                                        display: none;
                                    }
                                    #the-checkbox:checked + #the-caption {
                                        /* Show the caption if the input is checked */
                                        display: block;
                                    }
                                `}
                            >
                                <CaptionToggle />
                                <div id="the-caption">
                                    <Caption
                                        display={display}
                                        designType={designType}
                                        captionText={element.data.caption || ''}
                                        pillar={pillar}
                                        credit={element.data.credit}
                                        displayCredit={element.displayCredit}
                                        shouldLimitWidth={shouldLimitWidth}
                                        isOverlayed={true}
                                    />
                                </div>
                            </div>
                        </Row>
                    </Hide>
                )}
                {starRating && <PositionStarRating rating={starRating} />}
                {title && <ImageTitle title={title} role={role} />}
            </div>
            {isMainMedia ? (
                <Hide when="below" breakpoint="tablet">
                    <Caption
                        display={display}
                        designType={designType}
                        captionText={element.data.caption || ''}
                        pillar={pillar}
                        credit={element.data.credit}
                        displayCredit={element.displayCredit}
                        shouldLimitWidth={shouldLimitWidth}
                    />
                </Hide>
            ) : (
                <Caption
                    display={display}
                    designType={designType}
                    captionText={element.data.caption || ''}
                    pillar={pillar}
                    credit={element.data.credit}
                    displayCredit={element.displayCredit}
                    shouldLimitWidth={shouldLimitWidth}
                />
            )}
        </>
    );
};
