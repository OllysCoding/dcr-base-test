import React from 'react';
import { css } from 'emotion';
import { until, from, Breakpoint } from '@guardian/src-foundations/mq';

type Props = {
    children: JSXElements;
    when: 'above' | 'below';
    breakpoint: Breakpoint;
};

export const Hide = ({ children, when, breakpoint }: Props) => {
    let whenToHide;
    if (when === 'below') {
        whenToHide = css`
            ${until[breakpoint]} {
                display: none;
            }
        `;
    } else {
        whenToHide = css`
            ${from[breakpoint]} {
                display: none;
            }
        `;
    }
    return <div className={whenToHide}>{children}</div>;
};
