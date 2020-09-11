import { ABTest } from '@guardian/ab-core';

export const curatedContainerTest: ABTest = {
    id: 'CuratedContainerTest',
    start: '2020-09-14',
    expiry: '2020-11-02',
    author: 'nicl',
    description:
        'Tests an additional "curated" onwards container below the article body',
    audience: 0.0, // TODO will update once we are confident things are working
    audienceOffset: 0,
    successMeasure: 'CTR on article pages',
    audienceCriteria: 'Everyone',
    idealOutcome:
        'A significant increase in CTR compared to when the additional container is not present',
    showForSensitive: true,
    canRun: () => true,
    variants: [
        {
            id: 'control',
            test: (): void => {},
            impression: (impression) => {
                impression();
            },
            success: (success) => {
                success();
            },
        },
        {
            id: 'variant',
            test: (): void => {},
            impression: (impression) => {
                impression();
            },
            success: (success) => {
                success();
            },
        },
    ],
};
