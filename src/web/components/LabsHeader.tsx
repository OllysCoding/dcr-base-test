import React from 'react';
import { css } from 'emotion';

import { from } from '@guardian/src-foundations/mq';
import { border, labs, space } from '@guardian/src-foundations';

import { Section } from '@frontend/web/components/Section';
import { Dropdown } from '@root/src/web/components/Dropdown';

import LabsLogo from '@frontend/static/logos/the-guardian-labs.svg';
import { textSans } from '@guardian/src-foundations/typography';
import { LinkButton } from '@guardian/src-button';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import { Link } from '@guardian/src-link';

const Container = ({ children }: { children: React.ReactNode }) => (
	<div
		className={css`
			position: relative;
			height: 55px;
			display: flex;
			justify-content: space-between;
		`}
	>
		{children}
	</div>
);

const Left = ({ children }: { children: React.ReactNode }) => (
	<div
		className={css`
			display: flex;
		`}
	>
		{children}
	</div>
);

const Right = ({ children }: { children: React.ReactNode }) => (
	<div
		className={css`
			display: flex;
			padding: ${space[1]}px 0;
		`}
	>
		{children}
	</div>
);

const HeaderSection = ({
	children,
	isFirst,
}: {
	children: React.ReactNode;
	isFirst?: boolean;
}) => (
	<div
		className={css`
			border-right: 1px solid ${border.primary};
			height: 100%;
			display: flex;
			align-items: center;

			${isFirst ? null : 'padding-left: 10px;'}
			padding-right: 10px;
			${from.mobileLandscape} {
				${isFirst ? null : 'padding-left: 20px;'}
				padding-right: 20px;
			}
		`}
	>
		{children}
	</div>
);

const Title = () => (
	<div
		className={css`
			${textSans.small({ fontWeight: 'bold' })};
			margin-bottom: 4px;
		`}
	>
		Paid content
	</div>
);

const AboutDropdown = ({ children }: { children: React.ReactNode }) => (
	<div
		className={css`
			> button {
				${textSans.small()};
				color: black;
				:hover {
					color: black;
				}
			}
		`}
	>
		{children}
	</div>
);

const About = () => (
	<div
		className={css`
			${textSans.small()};
			position: absolute;
			top: 55px;
			left: 0;
			background-color: ${labs[400]};
			border-top: 1px solid ${border.primary};

			width: 100vw;
			${from.desktop} {
				width: 235px;
			}

			margin-left: -10px;
			${from.mobileLandscape} {
				margin-left: -20px;
			}
			padding: ${space[2]}px 10px;
			${from.mobileLandscape} {
				padding: ${space[3]}px 20px;
			}

			> a {
				color: black;
			}
		`}
	>
		<p>
			Paid content is paid for and controlled by an advertiser and
			produced by the Guardian Labs team.
		</p>
		<br />
		<LinkButton
			iconSide="right"
			size="xsmall"
			priority="subdued"
			icon={<SvgArrowRightStraight />}
			href="https://www.theguardian.com/info/2016/jan/25/content-funding"
		>
			Learn more
		</LinkButton>
	</div>
);

const Logo = () => (
	<Link href="https://www.theguardian.com/guardian-labs">
		<LabsLogo />
	</Link>
);

export const LabsHeader = () => (
	<Section
		showSideBorders={true}
		showTopBorder={false}
		backgroundColour={labs[400]}
		borderColour={border.primary}
	>
		<Container>
			<Left>
				<HeaderSection isFirst={true}>
					<Title />
				</HeaderSection>
				<HeaderSection>
					<AboutDropdown>
						<Dropdown
							label="About"
							links={[]}
							id="paidfor"
							dataLinkName=""
						>
							<About />
						</Dropdown>
					</AboutDropdown>
				</HeaderSection>
			</Left>
			<Right>
				<Logo />
			</Right>
		</Container>
	</Section>
);