import React, { Suspense } from 'react';
import { css, cx } from 'emotion';

import { text } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';
import { from, between, Breakpoint } from '@guardian/src-foundations/mq';

import { initPerf } from '@root/src/web/browser/initPerf';
import { AdSlot, labelStyles } from '@root/src/web/components/AdSlot';
import { Lazy } from '@root/src/web/components/Lazy';

import { useAB } from '@guardian/ab-react';
import { abTestTest } from '@frontend/web/experiments/tests/ab-test-test';
import { Display } from '@guardian/types/Format';

const MostViewedFooterData = React.lazy(() => {
	const { start, end } = initPerf('MostViewedFooterData');
	start();
	return import(
		/* webpackChunkName: "MostViewedFooterData" */ './MostViewedFooterData'
	).then((module) => {
		end();
		return { default: module.MostViewedFooterData };
	});
});

const stackBelow = (breakpoint: Breakpoint) => css`
	display: flex;
	flex-direction: column;

	${from[breakpoint]} {
		flex-direction: row;
	}
`;

const asideWidth = css`
	${between.leftCol.and.wide} {
		/* above 1140, below 1300 */
		flex-basis: 151px;
		flex-grow: 0;
		flex-shrink: 0;
	}

	${from.wide} {
		/* above 1300 */
		flex-basis: 230px;
		flex-grow: 0;
		flex-shrink: 0;
	}
`;

const headingStyles = css`
	${headline.xsmall()};
	color: ${text.primary};
	font-weight: 900;
	padding-right: 5px;
	padding-bottom: 14px;
	padding-top: 3px;

	${from.leftCol} {
		${headline.xsmall()};
		font-weight: 900;
	}

	${from.wide} {
		font-weight: 900;
	}
`;

const adSlotUnspecifiedWidth = css`
	.ad-slot {
		margin: 12px auto;
		min-width: 300px;
		min-height: 274px;
		text-align: center;
	}
`;

const mostPopularAdStyle = css`
	.ad-slot--mostpop {
		width: 300px;
		margin: 12px auto;
		min-width: 300px;
		min-height: 274px;
		text-align: center;
		${from.desktop} {
			margin: 0;
			width: auto;
		}
	}
	${labelStyles};
`;

interface Props {
	sectionName?: string;
	pillar: CAPIPillar;
	ajaxUrl: string;
	display: Display;
	design: DesignType;
}

export const MostViewedFooter = ({
	sectionName,
	pillar,
	ajaxUrl,
	display,
	design,
}: Props) => {
	// Example usage of AB Tests
	// Used in the Cypress tests as smoke test of the AB tests framework integration
	const ABTestAPI = useAB();
	const abTestCypressDataAttr =
		(ABTestAPI.isUserInVariant('AbTestTest', 'control') &&
			'ab-test-control') ||
		(ABTestAPI.isUserInVariant('AbTestTest', 'variant') &&
			'ab-test-variant') ||
		'ab-test-not-in-test';
	const runnableTest = ABTestAPI.runnableTest(abTestTest);
	const variantFromRunnable =
		(runnableTest && runnableTest.variantToRun.id) || 'not-runnable';

	const inDeeplyReadTestVariant = ABTestAPI.isUserInVariant(
		'DeeplyReadTest',
		'variant',
	);

	return (
		<div
			data-print-layout="hide"
			className={`content-footer ${cx(adSlotUnspecifiedWidth)}`}
		>
			<div
				className={cx(stackBelow('leftCol'), mostPopularAdStyle)}
				data-link-name="most-popular"
				data-component="most-popular"
				data-cy-ab-user-in-variant={abTestCypressDataAttr}
				data-cy-ab-runnable-test={variantFromRunnable}
			>
				<section className={asideWidth}>
					{inDeeplyReadTestVariant ? (
						<h2 className={headingStyles}>Accross The Guardian</h2>
					) : (
						<h2 className={headingStyles}>Most Popular</h2>
					)}
				</section>
				<section className={stackBelow('desktop')}>
					<Lazy margin={300}>
						<Suspense fallback={<></>}>
							<MostViewedFooterData
								sectionName={sectionName}
								pillar={pillar}
								ajaxUrl={ajaxUrl}
								design={design}
							/>
						</Suspense>
					</Lazy>
					<div
						className={css`
							margin: 6px 0 0 10px;
						`}
					>
						<AdSlot position="mostpop" display={display} />
					</div>
				</section>
			</div>
		</div>
	);
};
