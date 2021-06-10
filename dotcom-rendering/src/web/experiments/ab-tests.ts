import { ABTest } from '@guardian/ab-core';
import { abTestTest } from '@frontend/web/experiments/tests/ab-test-test';
import { signInGateMainVariant } from '@frontend/web/experiments/tests/sign-in-gate-main-variant';
import { signInGateMainControl } from '@frontend/web/experiments/tests/sign-in-gate-main-control';
import {
	newsletterMerchUnitLighthouseControl,
	newsletterMerchUnitLighthouseVariants,
} from '@frontend/web/experiments/tests/newsletter-merch-unit-test';
import { signInGateAusMandatory } from '@frontend/web/experiments/tests/sign-in-gate-aus-mandatory';

export const tests: ABTest[] = [
	abTestTest,
	signInGateMainVariant,
	signInGateMainControl,
	signInGateAusMandatory,
	newsletterMerchUnitLighthouseControl,
	newsletterMerchUnitLighthouseVariants,
];
