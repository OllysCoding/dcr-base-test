export const decideLineEffect = (
    designType: DesignType,
    pillar: Pillar,
): LineEffectType => {
    if (pillar === 'sport') {
        return 'dotted';
    }

    switch (designType) {
        case 'Feature':
        case 'Recipe':
            return 'squiggly';
        case 'Comment':
        case 'GuardianView':
        case 'Review':
        case 'Interview':
        case 'Live':
        case 'Media':
        case 'Analysis':
        case 'Article':
        case 'SpecialReport':
        case 'MatchReport':
        case 'GuardianLabs':
        case 'Quiz':
        case 'AdvertisementFeature':
        case 'Immersive':
        default:
            return 'straight';
    }
};

export const decideLineCount = (designType?: DesignType): 8 | 4 => {
    if (designType === 'Comment') {
        return 8;
    }
    return 4;
};

export const getCurrentPillar = (CAPI: CAPIType): Pillar => {
    return (
        (CAPI.nav.currentPillar &&
            CAPI.nav.currentPillar.title.toLowerCase()) ||
        CAPI.pillar
    );
};
