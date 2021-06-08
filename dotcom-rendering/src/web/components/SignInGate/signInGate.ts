import { ABTest } from '@guardian/ab-core';

// Sign in Gate A/B Tests
import { signInGateMainVariant } from '@root/src/web/experiments/tests/sign-in-gate-main-variant';
import { signInGateMainControl } from '@root/src/web/experiments/tests/sign-in-gate-main-control';
import { signInGateAusMandatory } from '@root/src/web/experiments/tests/sign-in-gate-aus-mandatory';

// Sign in Gate Types
import { signInGateComponent as gateMainVariant } from '@root/src/web/components/SignInGate/gates/main-variant';
import { signInGateComponent as gateMainControl } from '@root/src/web/components/SignInGate/gates/main-control';
import { signInGateComponent as gateAusMandatoryVariant } from '@root/src/web/components/SignInGate/gates/aus-mandatory-variant';
import { signInGateComponent as gateAusMandatoryControl } from '@root/src/web/components/SignInGate/gates/aus-mandatory-control';
import { SignInGateTestMap } from './types';

// component name, should always be sign-in-gate
export const componentName = 'sign-in-gate';

/* When adding a new test, you need to add the test name to the tests array below,
   and add a entry for each variant that maps it to a SignInGateComponent in
   signInGateTestVariantToGateMapping, and in turn match each test id to an component
   id in signInGateTestIdToComponentId
*/
export const signInGateTests: ReadonlyArray<ABTest> = [
	signInGateMainVariant,
	signInGateMainControl,
	signInGateAusMandatory,
];

export const signInGateTestVariantToGateMapping: SignInGateTestMap = {
	'main-control-4': gateMainControl,
	'main-variant-4': gateMainVariant,
	'aus-mandatory-gate-control': gateAusMandatoryControl,
	'aus-mandatory-gate-variant': gateAusMandatoryVariant,
};

export const signInGateTestIdToComponentId: { [key: string]: string } = {
	SignInGateMainVariant: 'main_variant_4',
	SignInGateMainControl: 'main_control_4',
	SignInGateAusMandatory: 'aus_mandatory',
};
