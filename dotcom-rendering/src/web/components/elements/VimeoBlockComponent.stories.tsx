import React from 'react';
import { css } from 'emotion';

import { VimeoBlockComponent } from './VimeoBlockComponent';

export default {
    component: VimeoBlockComponent,
    title: 'Components/VimeoComponent',
};

const Container = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
    <div
        className={css`
            width: 620px;
            padding: 20px;
        `}
    >
        {children}
    </div>
);

export const smallAspectRatio = () => {
    return (
        <Container>
            <p>abc</p>
            <VimeoBlockComponent
                url="https://player.vimeo.com/video/327310297?app_id=122963"
                pillar="news"
                height={250}
                width={250}
                caption="blah"
                credit=""
                title=""
                display="standard"
                designType="Article"
            />
            <p>abc</p>
        </Container>
    );
};
smallAspectRatio.story = { name: 'with small aspect ratio' };

export const largeAspectRatio = () => {
    return (
        <Container>
            <p>abc</p>
            <VimeoBlockComponent
                url="https://player.vimeo.com/video/327310297?app_id=122963"
                pillar="news"
                height={259}
                width={460}
                caption="blah"
                credit=""
                title=""
                display="standard"
                designType="Article"
            />
            <p>abc</p>
        </Container>
    );
};
largeAspectRatio.story = { name: 'with large aspect ratio' };

export const verticalAspectRatio = () => {
    return (
        <Container>
            <p>abc</p>
            <VimeoBlockComponent
                url="https://player.vimeo.com/video/265111898?app_id=122963"
                pillar="news"
                height={818}
                width={460}
                caption="blah"
                credit=""
                title=""
                display="standard"
                designType="Article"
            />
            <p>abc</p>
        </Container>
    );
};
verticalAspectRatio.story = { name: 'with vertical aspect ratio' };
