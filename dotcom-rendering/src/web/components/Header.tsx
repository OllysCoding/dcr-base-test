import React from 'react';
import { css } from 'emotion';

import { EditionDropdown } from '@frontend/web/components/EditionDropdown';
import { Hide } from '@root/src/web/components/Hide';
import { Logo } from '@frontend/web/components/Logo';
import { Links } from '@frontend/web/components/Links';

const headerStyles = css`
    /* Ensure header height contains it's children */
    overflow: auto;
    /* Prevent a scrollbar appearing here on IE/Edge */
    -ms-overflow-style: none;
`;

type Props = {
    isSignedIn?: boolean;
    edition: Edition;
};

export const Header = ({ isSignedIn, edition }: Props) => (
    <header className={headerStyles}>
        <Hide when="below" breakpoint="desktop">
            <div data-island="edition-root">
                <EditionDropdown
                    edition={edition}
                    dataLinkName="nav2 : topbar : edition-picker: toggle"
                />
            </div>
        </Hide>
        <Logo />
        <div id="reader-revenue-links-header" />
        <div id="links-root">
            <Links isSignedIn={isSignedIn} />
        </div>
    </header>
);
