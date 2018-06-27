// @flow
import { styled } from '@guardian/guui';

import { headline } from '@guardian/pasteup/fonts';
import { pillars } from '@guardian/pasteup/palette';
import { desktop } from '@guardian/pasteup/breakpoints';

import { columnsConfig } from '../../../../Nav/__config__';

import type { ColumnType } from '../../../../Nav/__config__';

const MainMenuColumnButton = styled('button')(
    ({ pillar, isLastIndex, showColumnLinks }) => ({
        backgroundColor: 'transparent',
        border: 0,
        boxSizing: 'border-box',
        color: pillars[pillar],
        cursor: 'pointer',
        display: 'block',
        fontFamily: headline,
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 1,
        outline: 'none',
        padding: '6px 34px 18px 50px',
        position: 'relative',
        textAlign: 'left',
        width: '100%',
        '> *': {
            pointerEvents: 'none',
        },
        textTransform: 'capitalize',
        ':before': {
            marginTop: showColumnLinks ? 8 : 4,
            color: '#5d5f5f',
            left: 25,
            position: 'absolute',
            border: '2px solid currentColor',
            borderTop: 0,
            borderLeft: 0,
            content: '""',
            display: 'inline-block',
            height: 10,
            transform: showColumnLinks ? 'rotate(-135deg)' : 'rotate(45deg)',
            width: 10,
        },
        [desktop]: {
            display: 'none',
        },
        ':after': {
            backgroundColor: '#abc2c9',
            bottom: 0,
            content: '""',
            display: !showColumnLinks && !isLastIndex ? 'block' : 'none',
            height: 1,
            left: 50,
            position: 'absolute',
            width: '100%',
        },
    }),
);

type Props = {
    column: ColumnType,
    showColumnLinks: boolean,
    toggleColumnLinks: () => void,
    ariaControls: string,
};

export default ({
    column,
    showColumnLinks,
    toggleColumnLinks,
    ariaControls,
}: Props) => {
    const pillarColumns = columnsConfig.filter(
        columnConfig => !!columnConfig.pillar,
    );
    const isLastIndex = column === pillarColumns[pillarColumns.length - 1];

    return (
        <MainMenuColumnButton
            pillar={column.pillar}
            isLastIndex={isLastIndex}
            showColumnLinks={showColumnLinks}
            onClick={() => {
                toggleColumnLinks();
            }}
            aria-haspopup="true"
            aria-controls={ariaControls}
            role="menuitem"
        >
            {column.label}
        </MainMenuColumnButton>
    );
};
