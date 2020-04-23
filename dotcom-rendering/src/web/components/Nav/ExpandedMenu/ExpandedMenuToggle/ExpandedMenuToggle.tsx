import React from 'react';
import { css } from 'emotion';

import { brandText, brandAlt } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';

import { VeggieBurger } from './VeggieBurger';
import { LabelButton } from './LabelButton';

const screenReadable = css`
    ${visuallyHidden};
`;

const openExpandedMenu = (display: Display) => css`
    ${headline.xsmall()};
    font-weight: 300;
    color: ${brandText.primary};
    cursor: pointer;
    display: none;
    position: relative;
    overflow: hidden;
    border: 0;
    background-color: transparent;
    height: 48px;
    padding-left: 9px;
    padding-right: 20px;
    ${from.desktop} {
        display: block;
        padding-top: ${display === 'immersive' ? '9px' : '5px'};
        height: 42px;
    }
    :hover,
    :focus {
        color: ${brandAlt[400]};
    }
`;

const showMoreTextStyles = (CHECKBOX_ID: string) => css`
    display: block;
    height: 100%;
    :after {
        content: '';
        border: 1px solid currentColor;
        border-left: transparent;
        border-top: transparent;
        display: inline-block;
        height: 8px;
        margin-left: 6px;

        /*
            IMPORTANT NOTE:
            we need to specify the adjacent path to the a (current) tag
            to apply styles to the nested tabs due to the face we use ~
            to support NoJS
        */
        transform: translateY(-3px) rotate(45deg);
        ${`#${CHECKBOX_ID}:checked ~ & {
            transform: translateY(1px) rotate(-135deg);
        }`}

        transition: transform 250ms ease-out;
        vertical-align: middle;
        width: 8px;
    }
    :hover:after {
        /*
            IMPORTANT NOTE:
            we need to specify the adjacent path to the a (current) tag
            to apply styles to the nested tabs due to the face we use ~
            to support NoJS
        */
        transform: translateY(0) rotate(45deg);
        ${`#${CHECKBOX_ID}:checked ~ & {
            transform: translateY(-2px) rotate(-135deg);
        }`}
    }
`;

interface Props {
    display: Display;
    ariaControls: string;
    CHECKBOX_ID: string;
}

export const ExpandedMenuToggle = ({
    display,
    ariaControls,
    CHECKBOX_ID,
}: Props) => (
    <>
        <VeggieBurger
            display={display}
            CHECKBOX_ID={CHECKBOX_ID}
            ariaControls={ariaControls}
            key="VeggieBurger"
        />
        <LabelButton
            className={openExpandedMenu(display)}
            ariaControls={ariaControls}
            CHECKBOX_ID={CHECKBOX_ID}
        >
            <span className={screenReadable}>Show</span>
            <span className={showMoreTextStyles(CHECKBOX_ID)}>More</span>
        </LabelButton>
    </>
);
