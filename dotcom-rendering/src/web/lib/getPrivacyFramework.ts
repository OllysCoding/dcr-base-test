import { getCountryCode } from '@frontend/web/lib/getCountryCode';

const switches =
    'guardian' in window &&
    'config' in window.guardian &&
    'switches' in window.guardian.config
        ? window.guardian.config.switches
        : {};

let frameworks: undefined | Record<string, boolean>;

export const getPrivacyFramework = async () => {
    if (typeof frameworks === 'undefined') {
        const isInUS = (await getCountryCode()) === 'US';

        frameworks = {
            ccpa: isInUS && switches.frameworkCcpa,
            tcfv2: !isInUS && switches.frameworkTcfv2,
        };
    }
    return frameworks;
};
