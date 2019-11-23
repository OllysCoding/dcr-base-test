import React from 'react';

import { Section } from './Section';
import { ArticleHeadline } from './ArticleHeadline';
import { Flex } from './Flex';
import { ArticleLeft } from './ArticleLeft';
import { ArticleContainer } from './ArticleContainer';
import { MainMedia } from './MainMedia';
import { mainMediaElements } from './ArticleHeadline.mocks';

/* tslint:disable */
export default {
    component: ArticleHeadline,
    title: 'Components/ArticleHeadline',
};
/* tslint:enable */

export const ArticleStory = () => (
    <Section>
        <Flex>
            <ArticleLeft>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <ArticleHeadline
                    headlineString="This is how the default headline looks"
                    designType="Article"
                    pillar="news"
                    webPublicationDate=""
                    tags={[]}
                />
            </ArticleContainer>
        </Flex>
    </Section>
);
ArticleStory.story = { name: 'Article' };

export const oldHeadline = () => (
    <Section>
        <Flex>
            <ArticleLeft>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <ArticleHeadline
                    headlineString="This is an old headline"
                    designType="Article"
                    pillar="news"
                    webPublicationDate="2014-07-13T18:46:01.933Z"
                    tags={[
                        // Age warnings only show for old articles when the tone/news tag is present
                        {
                            id: 'tone/news',
                            type: '',
                            title: '',
                        },
                    ]}
                />
            </ArticleContainer>
        </Flex>
    </Section>
);
oldHeadline.story = { name: 'Article, with age warning' };

export const Feature = () => (
    <Section>
        <Flex>
            <ArticleLeft>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <ArticleHeadline
                    headlineString="This is a Feature headline, it has colour applied based on pillar"
                    designType="Feature"
                    pillar="lifestyle"
                    webPublicationDate=""
                    tags={[]}
                />
            </ArticleContainer>
        </Flex>
    </Section>
);
Feature.story = { name: 'Feature' };

export const Interview = () => (
    <Section>
        <Flex>
            <ArticleLeft>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <ArticleHeadline
                    headlineString="This is an Interview headline. It has a black background, white text and overlays the image below it (as a sibling)"
                    designType="Interview"
                    pillar="culture"
                    webPublicationDate=""
                    tags={[]}
                />
                <MainMedia
                    hideCaption={true}
                    elements={mainMediaElements}
                    pillar="news"
                />
            </ArticleContainer>
        </Flex>
    </Section>
);
Interview.story = { name: 'Interview' };

export const Comment = () => (
    <Section>
        <Flex>
            <ArticleLeft>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <ArticleHeadline
                    headlineString="Yes, the billionaire club is one we really need to shut down"
                    designType="Comment"
                    pillar="opinion"
                    webPublicationDate=""
                    tags={[]}
                />
            </ArticleContainer>
        </Flex>
    </Section>
);
Comment.story = { name: 'Comment' };

export const Analysis = () => (
    <Section>
        <Flex>
            <ArticleLeft>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <ArticleHeadline
                    headlineString="This is an Analysis headline, it's underlined. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                    designType="Analysis"
                    pillar="news"
                    webPublicationDate=""
                    tags={[]}
                />
            </ArticleContainer>
        </Flex>
    </Section>
);
Analysis.story = { name: 'Analysis' };

export const Media = () => (
    <Section>
        <Flex>
            <ArticleLeft>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <ArticleHeadline
                    headlineString="This is the headline you see when design type is Media"
                    designType="Media"
                    pillar="news"
                    webPublicationDate=""
                    tags={[]}
                />
            </ArticleContainer>
        </Flex>
    </Section>
);
Media.story = { name: 'Media' };

export const Review = () => (
    <Section>
        <Flex>
            <ArticleLeft>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <ArticleHeadline
                    headlineString="This is the headline you see when design type is Review"
                    designType="Review"
                    pillar="news"
                    webPublicationDate=""
                    tags={[]}
                />
            </ArticleContainer>
        </Flex>
    </Section>
);
Review.story = { name: 'Review' };

export const AdvertisementFeature = () => (
    <Section>
        <Flex>
            <ArticleLeft>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <ArticleHeadline
                    headlineString="This is the headline you see when design type is AdvertisementFeature"
                    designType="AdvertisementFeature"
                    pillar="news"
                    webPublicationDate=""
                    tags={[]}
                />
            </ArticleContainer>
        </Flex>
    </Section>
);
AdvertisementFeature.story = { name: 'AdvertisementFeature' };

export const Quiz = () => (
    <Section>
        <Flex>
            <ArticleLeft>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <ArticleHeadline
                    headlineString="This is the headline you see when design type is Quiz"
                    designType="Quiz"
                    pillar="news"
                    webPublicationDate=""
                    tags={[]}
                />
            </ArticleContainer>
        </Flex>
    </Section>
);
Quiz.story = { name: 'Quiz' };

export const GuardianLabs = () => (
    <Section>
        <Flex>
            <ArticleLeft>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <ArticleHeadline
                    headlineString="This is the headline you see when design type is GuardianLabs"
                    designType="GuardianLabs"
                    pillar="news"
                    webPublicationDate=""
                    tags={[]}
                />
            </ArticleContainer>
        </Flex>
    </Section>
);
GuardianLabs.story = { name: 'GuardianLabs' };

export const Recipe = () => (
    <Section>
        <Flex>
            <ArticleLeft>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <ArticleHeadline
                    headlineString="This is the headline you see when design type is Recipe"
                    designType="Recipe"
                    pillar="news"
                    webPublicationDate=""
                    tags={[]}
                />
            </ArticleContainer>
        </Flex>
    </Section>
);
Recipe.story = { name: 'Recipe' };

export const GuardianView = () => (
    <Section>
        <Flex>
            <ArticleLeft>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <ArticleHeadline
                    headlineString="This is the headline you see when design type is GuardianView"
                    designType="GuardianView"
                    pillar="news"
                    webPublicationDate=""
                    tags={[]}
                />
            </ArticleContainer>
        </Flex>
    </Section>
);
GuardianView.story = { name: 'GuardianView' };

export const MatchReport = () => (
    <Section>
        <Flex>
            <ArticleLeft>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <ArticleHeadline
                    headlineString="This is the headline you see when design type is MatchReport"
                    designType="MatchReport"
                    pillar="news"
                    webPublicationDate=""
                    tags={[]}
                />
            </ArticleContainer>
        </Flex>
    </Section>
);
MatchReport.story = { name: 'MatchReport' };

export const SpecialReport = () => (
    <Section>
        <Flex>
            <ArticleLeft>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <ArticleHeadline
                    headlineString="This is the headline you see when design type is SpecialReport"
                    designType="SpecialReport"
                    pillar="news"
                    webPublicationDate=""
                    tags={[]}
                />
            </ArticleContainer>
        </Flex>
    </Section>
);
SpecialReport.story = { name: 'SpecialReport' };

export const Live = () => (
    <Section>
        <Flex>
            <ArticleLeft>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <ArticleHeadline
                    headlineString="This is the headline you see when design type is Live"
                    designType="Live"
                    pillar="news"
                    webPublicationDate=""
                    tags={[]}
                />
            </ArticleContainer>
        </Flex>
    </Section>
);
Live.story = { name: 'Live' };

export const Immersive = () => (
    <>
        <MainMedia
            hideCaption={true}
            elements={mainMediaElements}
            pillar="news"
        />
        <Section
            showTopBorder={false}
            showSideBorders={false}
            padded={false}
            shouldCenter={false}
        >
            <Flex>
                <ArticleLeft showRightBorder={false}>
                    <></>
                </ArticleLeft>
                <ArticleContainer>
                    <ArticleHeadline
                        headlineString="Here the headline overlays the image above it, the text is larger and the black background should extend to the right"
                        designType="Immersive"
                        pillar="culture"
                        webPublicationDate=""
                        tags={[]}
                    />
                </ArticleContainer>
            </Flex>
        </Section>
    </>
);
Immersive.story = { name: 'Immersive' };
