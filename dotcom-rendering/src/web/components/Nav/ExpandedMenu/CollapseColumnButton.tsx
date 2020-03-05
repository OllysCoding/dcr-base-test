import React from 'react';
import { css, cx } from 'emotion';

import { brandText } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';

import { hideDesktop } from './Column';

const showColumnLinksStyle = css`
    :before {
        margin-top: 8px;
        transform: rotate(-135deg);
    }
`;
const collapseColumnButton = css`
    background-color: transparent;
    border: 0;
    box-sizing: border-box;
    cursor: pointer;
    color: ${brandText.primary};
    display: block;
    ${headline.xsmall()};
    font-weight: 700;
    outline: none;
    padding: 6px 34px 18px 50px;
    position: relative;
    text-align: left;
    width: 100%;
    > * {
        pointer-events: none;
    }
    text-transform: capitalize;
    :before {
        margin-top: 4px;
        left: 25px;
        position: absolute;
        border: 2px solid currentColor;
        border-top: 0;
        border-left: 0;
        content: '';
        display: inline-block;
        height: 10px;
        transform: rotate(45deg);
        width: 10px;
    }
`;

export const CollapseColumnButton: React.FC<{
    title: string;
    showColumnLinks: boolean;
    toggleColumnLinks: () => void;
    ariaControls: string;
}> = ({ title, showColumnLinks, toggleColumnLinks, ariaControls }) => (
    <button
        className={cx(
            collapseColumnButton,
            {
                [showColumnLinksStyle]: showColumnLinks,
            },
            hideDesktop,
        )}
        onClick={() => {
            toggleColumnLinks();
        }}
        aria-haspopup="true"
        aria-controls={ariaControls}
        role="menuitem"
    >
        {title}
    </button>
);
