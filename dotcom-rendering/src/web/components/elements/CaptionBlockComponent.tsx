import React from 'react';
// import { css } from 'emotion';
import { Caption } from '@frontend/web/components/Caption';
import { Display } from '@root/src/lib/display';

type Props = {
    display: Display;
    designType: DesignType;
    captionText?: string;
    pillar: Pillar;
    padCaption?: boolean;
    credit?: string;
    displayCredit?: boolean;
    shouldLimitWidth?: boolean;
    isOverlayed?: boolean;
};

export const CaptionBlockComponent = ({
    display,
    designType,
    captionText,
    pillar,
    padCaption = false,
    credit,
    displayCredit = true,
    shouldLimitWidth = false,
    isOverlayed,
}: Props) => (
    <Caption
        display={display}
        designType={designType}
        captionText={captionText}
        pillar={pillar}
        padCaption={padCaption}
        credit={credit}
        displayCredit={displayCredit}
        shouldLimitWidth={shouldLimitWidth}
        isOverlayed={isOverlayed}
    />
);
