import React, { useEffect } from 'react';

import { makeGuardianBrowserCAPI } from '@root/src/model/window-guardian';
import { Article } from '@root/fixtures/articles/Article';
import { AdvertisementFeature } from '@root/fixtures/articles/AdvertisementFeature';
import { Review } from '@root/fixtures/articles/Review';
import { Analysis } from '@root/fixtures/articles/Analysis';
import { Feature } from '@root/fixtures/articles/Feature';
import { GuardianView } from '@root/fixtures/articles/GuardianView';
import { Immersive } from '@root/fixtures/articles/Immersive';
import { Interview } from '@root/fixtures/articles/Interview';
import { Quiz } from '@root/fixtures/articles/Quiz';
import { Recipe } from '@root/fixtures/articles/Recipe';
import { Comment } from '@root/fixtures/articles/Comment';
import { MatchReport } from '@root/fixtures/articles/MatchReport';

import { NAV } from '@root/fixtures/NAV';

import { HydrateApp } from '@root/src/web/components/HydrateApp';
import { mockRESTCalls } from '@root/src/web/lib/mockRESTCalls';

import { DecideLayout } from './DecideLayout';

mockRESTCalls();

/* tslint:disable */
export default {
    title: 'Layouts/Showcase',
    parameters: {
        chromatic: { viewports: [1300], delay: 800 },
    },
};
/* tslint:enable */

const convertToShowcase = (CAPI: CAPIType) => {
    return {
        ...CAPI,
        pageType: {
            ...CAPI.pageType,
            hasShowcaseMainElement: true,
        },
        isImmersive: false,
    };
};

// HydratedLayout is used here to simulated the hydration that happens after we init react on
// the client. We need a separate component so that we can make use of useEffect to ensure
// the hydrate step only runs once the dom has been rendered.
const HydratedLayout = ({ ServerCAPI }: { ServerCAPI: CAPIType }) => {
    useEffect(() => {
        const CAPI = makeGuardianBrowserCAPI(ServerCAPI);
        HydrateApp({ CAPI, NAV });
    }, [ServerCAPI]);
    return <DecideLayout CAPI={ServerCAPI} NAV={NAV} />;
};

export const ArticleStory = () => {
    const ServerCAPI = convertToShowcase(Article);
    return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
ArticleStory.story = { name: 'Article' };

export const ReviewStory = () => {
    const ServerCAPI = convertToShowcase(Review);
    return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
ReviewStory.story = { name: 'Review' };

export const CommentStory = () => {
    const ServerCAPI = convertToShowcase(Comment);
    return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
CommentStory.story = { name: 'Comment' };

export const AdvertisementFeatureStory = () => {
    const ServerCAPI = convertToShowcase(AdvertisementFeature);
    return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
AdvertisementFeatureStory.story = { name: 'AdvertisementFeature' };

export const AnalysisStory = () => {
    const ServerCAPI = convertToShowcase(Analysis);
    return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
AnalysisStory.story = { name: 'Analysis' };

export const FeatureStory = () => {
    const ServerCAPI = convertToShowcase(Feature);
    return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
FeatureStory.story = { name: 'Feature' };

export const GuardianViewStory = () => {
    const ServerCAPI = convertToShowcase(GuardianView);
    return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
GuardianViewStory.story = { name: 'GuardianView' };

export const ImmersiveStory = () => {
    const ServerCAPI = convertToShowcase(Immersive);
    return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
ImmersiveStory.story = { name: 'Immersive' };

export const InterviewStory = () => {
    const ServerCAPI = convertToShowcase(Interview);
    return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
InterviewStory.story = { name: 'Interview' };

export const QuizStory = () => {
    const ServerCAPI = convertToShowcase(Quiz);
    return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
QuizStory.story = { name: 'Quiz' };

export const RecipeStory = () => {
    const ServerCAPI = convertToShowcase(Recipe);
    return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
RecipeStory.story = { name: 'Recipe' };

export const MatchReportStory = () => {
    const ServerCAPI = convertToShowcase(MatchReport);
    return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
MatchReportStory.story = { name: 'MatchReport' };
