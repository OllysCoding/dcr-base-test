import React, { useState, useRef, useEffect } from 'react';
import { css, cx } from 'emotion';

import { GuardianLines } from '@frontend/web/components/GuardianLines';
import { text, news, neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { pillarPalette, pillarMap } from '@root/src/lib/pillars';

type Props = {
    subNavSections: SubNavType;
    pillar: Pillar;
    currentNavLink: string;
};

const wrapperCollapsed = css`
    height: 36px;
    overflow: hidden;

    ${from.tablet} {
        height: 42px;
    }
`;

const rootSubnavStyles = css`
    list-style: none;
    padding: 0 5px;

    ${from.mobileLandscape} {
        padding: 0 15px;
    }

    li {
        float: left;
        display: block;
    }
`;

const subnavExpanded = css`
    ${rootSubnavStyles};
`;

const subnavCollapsed = css`
    ${rootSubnavStyles};
    max-width: calc(100% - 60px);

    ${from.mobileLandscape} {
        max-width: calc(100% - 70px);
    }
`;

const fontStyle = css`
    ${textSans.medium()};
    font-weight: 500;
    color: ${neutral[7]};
    padding: 0 5px;
    height: 36px;
    /* Design System: Line height is being used here for centering layout, we need the primitives */
    line-height: 36px;

    ${from.tablet} {
        height: 42px;
        /* Design System: Line height is being used here for centering layout, we need the primitives */
        /* stylelint-disable-next-line property-blacklist */
        line-height: 42px;
    }
`;

const linkStyle = css`
    ${fontStyle};
    float: left;
    text-decoration: none;

    :hover {
        text-decoration: underline;
    }
`;
const selected = css`
    font-weight: 700;
`;
const moreStyle = css`
    ${fontStyle};

    cursor: pointer;
    border: none;
    background-color: transparent;
    color: ${text.supporting};

    :hover {
        color: ${news.main};
    }

    ${from.desktop} {
        display: none;
    }
`;

const parentLinkStyle = css`
    ${linkStyle};
    font-weight: 700;
`;
const ps1 = css`
    :after {
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 10px solid ${neutral[7]};
        margin-top: 12px;
        margin-left: 2px;

        ${from.tablet} {
            margin-top: 16px;
        }
    }
`; // I'm not sure what the palette.neutral is for this should always receive a pillar by types.
const psp = pillarMap(
    pillar => css`
        :after {
            border-left-color: ${pillarPalette[pillar].main};
        }
    `,
);

const trimLeadingSlash = (url: string): string =>
    url.substr(0, 1) === '/' ? url.slice(1) : url;

export const SubNav = ({ subNavSections, pillar, currentNavLink }: Props) => {
    const [showMore, setShowMore] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const ulRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const ulEl = ulRef.current;
        if (ulEl) {
            const lis = ulEl.querySelectorAll('li');
            const lastLi = lis[lis.length - 1];

            const ulTop = ulEl.getBoundingClientRect().top;
            const liTop = lastLi.getBoundingClientRect().top;

            setShowMore(ulTop !== liTop);
        } else {
            setShowMore(false);
        }
    }, [ulRef, setShowMore]);

    const collapseWrapper = !showMore || !isExpanded;
    const expandSubNav = !showMore || isExpanded;

    return (
        <div>
            <div className={cx({ [wrapperCollapsed]: collapseWrapper })}>
                <ul
                    ref={ulRef}
                    className={cx({
                        [subnavCollapsed]: !expandSubNav,
                        [subnavExpanded]: expandSubNav,
                    })}
                >
                    {subNavSections.parent && (
                        <li
                            key={subNavSections.parent.url}
                            className={cx(ps1, psp[pillar])}
                        >
                            <a
                                className={parentLinkStyle}
                                href={subNavSections.parent.url}
                            >
                                {subNavSections.parent.title}
                            </a>
                        </li>
                    )}
                    {subNavSections.links.map(link => (
                        <li key={link.url}>
                            <a
                                className={cx(linkStyle, {
                                    [selected]:
                                        link.title === currentNavLink,
                                })}
                                href={link.url}
                                data-link-name={`nav2 : subnav : ${trimLeadingSlash(
                                    link.url,
                                )}`}
                            >
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>
                {showMore && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={moreStyle}
                    >
                        {isExpanded ? 'Less' : 'More'}
                    </button>
                )}
            </div>
            <GuardianLines pillar={pillar} />
        </div>
    );
};
