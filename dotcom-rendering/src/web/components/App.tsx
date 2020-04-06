import React, { useState, useEffect } from 'react';

import { Nav } from '@frontend/web/components/Nav/Nav';
import { EditionDropdown } from '@frontend/web/components/EditionDropdown';
import { MostViewedFooter } from '@frontend/web/components/MostViewed/MostViewedFooter/MostViewedFooter';
import { MostViewedRightWrapper } from '@frontend/web/components/MostViewed/MostViewedRight/MostViewedRightWrapper';
import { Counts } from '@frontend/web/components/Counts';
import { RichLinkComponent } from '@frontend/web/components/elements/RichLinkComponent';
import { ReaderRevenueLinks } from '@frontend/web/components/ReaderRevenueLinks';
import { CMP } from '@frontend/web/components/CMP';
import { OnwardsUpper } from '@frontend/web/components/Onwards/OnwardsUpper';
import { OnwardsLower } from '@frontend/web/components/Onwards/OnwardsLower';
import { SlotBodyEnd } from '@frontend/web/components/SlotBodyEnd';
import { Links } from '@frontend/web/components/Links';
import { SubNav } from '@frontend/web/components/SubNav/SubNav';
import { CommentsLayout } from '@frontend/web/components/CommentsLayout';
import { incrementWeeklyArticleCount } from '@guardian/automat-client';

import { Portal } from '@frontend/web/components/Portal';
import { Hydrate } from '@frontend/web/components/Hydrate';
import { Lazy } from '@frontend/web/components/Lazy';

import { getCookie } from '@root/src/web/browser/cookie';
import { getCountryCode } from '@frontend/web/lib/getCountryCode';
import { getDiscussion } from '@root/src/web/lib/getDiscussion';
import { getUser } from '@root/src/web/lib/getUser';
import { getCommentContext } from '@root/src/web/lib/getCommentContext';

type Props = { CAPI: CAPIBrowserType; NAV: NavType };

const commentIdFromUrl = () => {
    const { hash } = window.location;
    if (!hash) return;
    if (!hash.includes('comment')) return;
    if (!hash.split('-')[1]) return;
    return parseInt(hash.split('-')[1], 10);
};

const hasCommentsHashInUrl = () => {
    const { hash } = window.location;
    return hash && hash === '#comments';
};

export const App = ({ CAPI, NAV }: Props) => {
    const [isSignedIn, setIsSignedIn] = useState<boolean>();
    const [user, setUser] = useState<UserProfile>();
    const [countryCode, setCountryCode] = useState<string>();
    const [commentCount, setCommentCount] = useState<number>(0);
    const [isClosedForComments, setIsClosedForComments] = useState<boolean>(
        true,
    );
    const [commentPage, setCommentPage] = useState<number>();
    const [commentPageSize, setCommentPageSize] = useState<25 | 50 | 100>();
    const [commentOrderBy, setCommentOrderBy] = useState<
        'newest' | 'oldest' | 'mostrecommended'
    >();
    const [openComments, setOpenComments] = useState<boolean>(false);

    const hashCommentId = commentIdFromUrl();
    const hasCommentsHash = hasCommentsHashInUrl();

    useEffect(() => {
        setIsSignedIn(!!getCookie('GU_U'));
    }, []);

    useEffect(() => {
        const callGetUser = async () => {
            setUser(await getUser(CAPI.config.discussionApiUrl));
        };

        if (isSignedIn) {
            callGetUser();
        }
    }, [isSignedIn, CAPI.config.discussionApiUrl]);

    useEffect(() => {
        const callFetch = async () =>
            setCountryCode((await getCountryCode()) || '');
        callFetch();
    }, []);

    useEffect(() => {
        const callFetch = async () => {
            const response = await getDiscussion(
                CAPI.config.discussionApiUrl,
                CAPI.config.shortUrlId,
            );
            setCommentCount(
                (response && response.discussion.commentCount) || 0,
            );
            setIsClosedForComments(
                response && response.discussion.isClosedForComments,
            );
        };

        if (CAPI.isCommentable) {
            callFetch();
        }
    }, [
        CAPI.config.discussionApiUrl,
        CAPI.config.shortUrlId,
        CAPI.isCommentable,
    ]);

    // Log an article view using the Slot Machine client lib
    // This function must be called once per article serving.
    // We should monitor this function call to ensure it only happens within an
    // article pages when other pages are supported by DCR.
    useEffect(() => {
        incrementWeeklyArticleCount();
    }, []);

    // Check the url to see if there is a comment hash, e.g. ...crisis#comment-139113120
    // If so, make a call to get the context of this comment so we know what page it is
    // on.
    useEffect(() => {
        if (hashCommentId) {
            getCommentContext(CAPI.config.discussionApiUrl, hashCommentId).then(
                context => {
                    setCommentPage(context.page);
                    setCommentPageSize(context.pageSize);
                    setCommentOrderBy(context.orderBy);
                    setOpenComments(true);
                },
            );
        }
    }, [CAPI.config.discussionApiUrl, hashCommentId]);

    useEffect(() => {
        if (hasCommentsHash) {
            setOpenComments(true);
        }
    }, [hasCommentsHash]);

    return (
        // Do you need to Hydrate or do you want a Portal?
        //
        // Hydrate: If your component is server rendered and you're hydrating it with
        // more data or making it interactive on the client and you do not need to access
        // global application state.
        //
        // Portal: If your component is not server rendered but a pure client-side component
        // and/or you want to access global application state, you want to use a Portal.
        //
        // Note: Both require a 'root' element that needs to be server rendered.
        <>
            <Portal root="reader-revenue-links-header">
                <ReaderRevenueLinks
                    urls={CAPI.nav.readerRevenueLinks.footer}
                    edition={CAPI.editionId}
                    dataLinkNamePrefix="footer : "
                    inHeader={true}
                />
            </Portal>
            <Hydrate root="links-root">
                <Links isSignedIn={isSignedIn} />
            </Hydrate>
            <Hydrate root="edition-root">
                <EditionDropdown
                    edition={CAPI.editionId}
                    dataLinkName="nav2 : topbar : edition-picker: toggle"
                />
            </Hydrate>
            <Hydrate root="nav-root">
                <Nav pillar={CAPI.pillar} nav={NAV} />
            </Hydrate>
            {NAV.subNavSections && (
                <Hydrate root="sub-nav-root">
                    <>
                        <SubNav
                            subNavSections={NAV.subNavSections}
                            currentNavLink={NAV.currentNavLink}
                            pillar={CAPI.pillar}
                        />
                    </>
                </Hydrate>
            )}
            {CAPI.richLinks.map((link, index) => (
                <Portal
                    key={index}
                    root="rich-link"
                    richLinkIndex={link.richLinkIndex}
                >
                    <RichLinkComponent
                        element={link}
                        pillar={CAPI.pillar}
                        ajaxEndpoint={CAPI.config.ajaxUrl}
                        richLinkIndex={index}
                    />
                </Portal>
            ))}
            <Portal root="share-comment-counts">
                <Counts
                    ajaxUrl={CAPI.config.ajaxUrl}
                    pageId={CAPI.config.pageId}
                    commentCount={commentCount}
                    pillar={CAPI.pillar}
                    setOpenComments={setOpenComments}
                />
            </Portal>
            <Portal root="most-viewed-right">
                <Lazy margin={100}>
                    <MostViewedRightWrapper pillar={CAPI.pillar} />
                </Lazy>
            </Portal>
            <Portal root="slot-body-end">
                <SlotBodyEnd
                    isSignedIn={isSignedIn}
                    countryCode={countryCode}
                    contentType={CAPI.contentType}
                    sectionName={CAPI.sectionName}
                    shouldHideReaderRevenue={CAPI.shouldHideReaderRevenue}
                    isMinuteArticle={CAPI.pageType.isMinuteArticle}
                    isPaidContent={CAPI.pageType.isPaidContent}
                    isSensitive={CAPI.config.isSensitive}
                    tags={CAPI.tags}
                    contributionsServiceUrl={CAPI.contributionsServiceUrl}
                />
            </Portal>
            <Portal root="onwards-upper">
                <Lazy margin={300}>
                    <OnwardsUpper
                        ajaxUrl={CAPI.config.ajaxUrl}
                        hasRelated={CAPI.hasRelated}
                        hasStoryPackage={CAPI.hasStoryPackage}
                        isAdFreeUser={CAPI.isAdFreeUser}
                        pageId={CAPI.pageId}
                        isPaidContent={CAPI.config.isPaidContent || false}
                        showRelatedContent={CAPI.config.showRelatedContent}
                        keywordIds={CAPI.config.keywordIds}
                        contentType={CAPI.contentType}
                        tags={CAPI.tags}
                    />
                </Lazy>
            </Portal>
            <Portal root="onwards-lower">
                <Lazy margin={300}>
                    <OnwardsLower
                        ajaxUrl={CAPI.config.ajaxUrl}
                        hasStoryPackage={CAPI.hasStoryPackage}
                        tags={CAPI.tags}
                    />
                </Lazy>
            </Portal>

            {/* Don't lazy render comments if we have a comment id in the url or the comments hash. In
                these cases we will be scrolling to comments and want them loaded */}
            <Portal root="comments-root">
                {openComments ? (
                    <CommentsLayout
                        user={user}
                        pillar={CAPI.pillar}
                        baseUrl={CAPI.config.discussionApiUrl}
                        shortUrl={CAPI.config.shortUrlId}
                        commentCount={commentCount}
                        commentPage={commentPage}
                        commentPageSize={commentPageSize}
                        commentOrderBy={commentOrderBy}
                        isClosedForComments={isClosedForComments}
                        discussionD2Uid={CAPI.config.discussionD2Uid}
                        discussionApiClientHeader={
                            CAPI.config.discussionApiClientHeader
                        }
                        enableDiscussionSwitch={
                            CAPI.config.enableDiscussionSwitch
                        }
                        expanded={true}
                        commentToScrollTo={hashCommentId}
                    />
                ) : (
                    <Lazy margin={300}>
                        <CommentsLayout
                            user={user}
                            pillar={CAPI.pillar}
                            baseUrl={CAPI.config.discussionApiUrl}
                            shortUrl={CAPI.config.shortUrlId}
                            commentCount={commentCount}
                            commentPage={commentPage}
                            commentPageSize={commentPageSize}
                            commentOrderBy={commentOrderBy}
                            isClosedForComments={isClosedForComments}
                            discussionD2Uid={CAPI.config.discussionD2Uid}
                            discussionApiClientHeader={
                                CAPI.config.discussionApiClientHeader
                            }
                            enableDiscussionSwitch={
                                CAPI.config.enableDiscussionSwitch
                            }
                            expanded={false}
                        />
                    </Lazy>
                )}
            </Portal>
            <Portal root="most-viewed-footer">
                <MostViewedFooter
                    pillar={CAPI.pillar}
                    sectionName={CAPI.sectionName}
                    ajaxUrl={CAPI.config.ajaxUrl}
                />
            </Portal>
            <Portal root="reader-revenue-links-footer">
                <Lazy margin={300}>
                    <ReaderRevenueLinks
                        urls={CAPI.nav.readerRevenueLinks.header}
                        edition={CAPI.editionId}
                        dataLinkNamePrefix="nav2 : "
                        inHeader={false}
                    />
                </Lazy>
            </Portal>
            <Portal root="cmp">
                <CMP cmpUi={CAPI.config.cmpUi} />
            </Portal>
        </>
    );
};