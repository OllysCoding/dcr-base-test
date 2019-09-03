import { AdSlotParameters } from '@frontend/web/components/AdSlot';

// We are using this function to control the activation of the commercial features
// Currently it reports that the user has opted in to a 0% AB test.
export const shouldDisplayAdvertisements = (config: ConfigType) => {
    return (
        config.stage === 'DEV' ||
        config.abTests.dotcomRenderingAdvertisementsVariant === 'variant'
    );
};

type staticAdSlotNames = 'right' | 'top-above-nav';

export const namedAdSlotParameters = (
    name: staticAdSlotNames,
): AdSlotParameters => {
    const mapping = {
        // The current parameters have been taken from looking at an example of right MPU on an article.
        // regular article: js-ad-slot ad-slot ad-slot--right ad-slot--mpu-banner-ad js-sticky-mpu ad-slot--rendered
        // dotcom rendering: js-ad-slot ad-slot ad-slot--right ad-slot--mpu-banner-ad ad-slot--rendered js-sticky-mpu
        right: {
            name: 'right',
            adTypes: ['mpu-banner-ad', 'rendered'],
            sizeMapping: {
                mobile: ['1,1|2,2|300,250|300,274|300,600|fluid|300,1050'],
            },
            showLabel: true,
            refresh: false,
            outOfPage: false,
            optId: undefined,
            optClassNames: ['js-sticky-mpu'],
        },
        'top-above-nav': {
            name: 'top-above-nav',
            adTypes: ['mpu-banner-ad', 'rendered'],
            sizeMapping: {
                tablet: ['1,1|2,2|728,90|88,71|fluid'],
            },
            showLabel: true,
            refresh: false,
            outOfPage: false,
            optId: undefined,
            optClassNames: [],
        },
    };
    return mapping[name];
};
