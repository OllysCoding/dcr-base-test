import React from 'react';
import { css } from 'emotion';
import fetchMock from 'fetch-mock';

import { sharecount } from '@root/fixtures/article';

import { Counts } from './Counts';
import { ShareCount } from './ShareCount';
import { CommentCount } from './CommentCount';

export default {
    component: Counts,
    title: 'Components/Counts',
};

const Container = ({ children }: { children: JSXElements }) => (
    <div
        className={css`
            margin: 40px;
        `}
    >
        {children}
    </div>
);

export const Both = () => {
    fetchMock
        .restore()
        // Share count
        .getOnce(
            'begin:https://api.nextgen.guardianapps.co.uk/sharecount/',
            {
                status: 200,
                body: {
                    path:
                        'money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software',
                    share_count: 80,
                    refreshStatus: true,
                },
            },
            { overwriteRoutes: false },
        );

    return (
        <Container>
            <Counts>
                <aside>
                    <ShareCount
                        ajaxUrl="https://api.nextgen.guardianapps.co.uk"
                        pageId="/lifeandstyle/2020/jan/25/deborah-orr-parents-jailers-i-loved"
                    />
                </aside>
                <aside>
                    <CommentCount
                        isCommentable={true}
                        commentCount={239}
                        pillar="news"
                        setIsExpanded={() => {}}
                    />
                </aside>
            </Counts>
        </Container>
    );
};
Both.story = { name: 'with both results' };

export const ShareOnly = () => {
    fetchMock
        .restore()
        // Share count
        .getOnce(
            'begin:https://api.nextgen.guardianapps.co.uk/sharecount/',
            {
                status: 200,
                body: sharecount,
            },
            { overwriteRoutes: false },
        );

    return (
        <Container>
            <Counts>
                <aside>
                    <ShareCount
                        ajaxUrl="https://api.nextgen.guardianapps.co.uk"
                        pageId="/lifeandstyle/2020/jan/25/deborah-orr-parents-jailers-i-loved"
                    />
                </aside>
                <aside>
                    <CommentCount
                        isCommentable={false}
                        commentCount={239}
                        pillar="news"
                        setIsExpanded={() => {}}
                    />
                </aside>
            </Counts>
        </Container>
    );
};
ShareOnly.story = { name: 'with comments disabled' };

export const CommentOnly = () => {
    fetchMock
        .restore()
        // Share count
        .getOnce(
            'begin:https://api.nextgen.guardianapps.co.uk/sharecount/',
            {
                status: 200,
                body: {
                    path:
                        'money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software',
                    share_count: 0,
                    refreshStatus: true,
                },
            },
            { overwriteRoutes: false },
        );

    return (
        <Container>
            <Counts>
                <aside>
                    <ShareCount
                        ajaxUrl="https://api.nextgen.guardianapps.co.uk"
                        pageId="/lifeandstyle/2020/jan/25/deborah-orr-parents-jailers-i-loved"
                    />
                </aside>
                <aside>
                    <CommentCount
                        isCommentable={true}
                        commentCount={239}
                        pillar="news"
                        setIsExpanded={() => {}}
                    />
                </aside>
            </Counts>
        </Container>
    );
};
CommentOnly.story = { name: 'with zero shares' };

export const ZeroComments = () => {
    fetchMock
        .restore()
        // Share count
        .getOnce(
            'begin:https://api.nextgen.guardianapps.co.uk/sharecount/',
            {
                status: 200,
                body: {
                    path:
                        'money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software',
                    share_count: 60,
                    refreshStatus: true,
                },
            },
            { overwriteRoutes: false },
        );

    return (
        <Container>
            <Counts>
                <aside>
                    <ShareCount
                        ajaxUrl="https://api.nextgen.guardianapps.co.uk"
                        pageId="/lifeandstyle/2020/jan/25/deborah-orr-parents-jailers-i-loved"
                    />
                </aside>
                <aside>
                    <CommentCount
                        isCommentable={true}
                        commentCount={0}
                        pillar="news"
                        setIsExpanded={() => {}}
                    />
                </aside>
            </Counts>
        </Container>
    );
};
ZeroComments.story = { name: 'with zero comments' };

export const BigNumbers = () => {
    fetchMock
        .restore()
        // Share count
        .getOnce(
            'begin:https://api.nextgen.guardianapps.co.uk/sharecount/',
            {
                status: 200,
                body: {
                    path:
                        'money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software',
                    share_count: 204320,
                    refreshStatus: true,
                },
            },
            { overwriteRoutes: false },
        );

    return (
        <Container>
            <Counts>
                <aside>
                    <ShareCount
                        ajaxUrl="https://api.nextgen.guardianapps.co.uk"
                        pageId="/lifeandstyle/2020/jan/25/deborah-orr-parents-jailers-i-loved"
                    />
                </aside>
                <aside>
                    <CommentCount
                        isCommentable={true}
                        commentCount={4320}
                        pillar="news"
                        setIsExpanded={() => {}}
                    />
                </aside>
            </Counts>
        </Container>
    );
};
BigNumbers.story = { name: 'with long numbers' };
