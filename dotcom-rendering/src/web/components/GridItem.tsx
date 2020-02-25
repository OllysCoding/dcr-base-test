import React from 'react';
import { css } from 'emotion';
import { getZIndex } from '@frontend/web/lib/getZIndex';

type Props = {
    children: JSX.Element | JSX.Element[];
    area: string;
};

const gridAreaStyles = (area: string) => {
    if (area === 'right-column') {
        return css`
            /* IE Fallback */
            position: absolute;
            top: 0;
            right: 0;
            /* Pop me below the body */
            ${getZIndex({ group: 'bodyGroup', name: 'rightColumnArea' })}

            @supports (display: grid) {
                position: relative;
                grid-area: ${area};
            }
        `;
    }

    if (area === 'body') {
        return css`
            grid-area: ${area};
            /* Pop me above the right column */
            ${getZIndex({ group: 'bodyGroup', name: 'bodyArea' })}
        `;
    }

    return css`
        grid-area: ${area};
    `;
};

export const GridItem = ({ children, area }: Props) => (
    <div className={gridAreaStyles(area)}>{children}</div>
);
