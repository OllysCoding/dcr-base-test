import React from 'react';
import { css, cx } from 'emotion';

import { headline, textSans } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';

import { Hide } from '@frontend/web/components/Hide';
import { Display, Design, Special } from '@guardian/types';
import { Badge } from '@frontend/web/components/Badge';

type Props = {
	format: Format;
	palette: Palette;
	tags: TagType[];
	sectionLabel: string;
	sectionUrl: string;
	guardianBaseURL: string;
	badge?: BadgeType;
};

const sectionLabelLink = css`
	text-decoration: none;
	:hover {
		text-decoration: underline;
	}
`;

const rowBelowLeftCol = css`
	flex-direction: column;
	display: inline-block;
	${until.leftCol} {
		display: flex;
		flex-direction: row;
	}
`;

const marginBottom = css`
	margin-bottom: 5px;
`;

const marginRight = css`
	${until.leftCol} {
		margin-right: ${space[2]}px;
	}
`;

const invertedStyle = css`
	/* Handle text wrapping onto a new line */
	white-space: pre-wrap;
	box-decoration-break: clone;
	line-height: 28px;
	${from.leftCol} {
		line-height: 28px;
	}

	padding-right: ${space[1]}px;
	padding-top: ${space[1]}px;
	padding-bottom: ${space[3]}px;
	padding-left: ${space[3]}px;
	${from.mobileLandscape} {
		padding-left: ${space[5]}px;
	}
	${from.tablet} {
		padding-left: ${space[1]}px;
	}
`;

const fontStyles = (format: Format) => css`
	${format.theme === Special.Labs
		? textSans.medium({ fontWeight: 'bold' })
		: headline.xxxsmall({ fontWeight: 'bold' })}
	line-height: 23px;
	${from.leftCol} {
		${format.theme === Special.Labs
			? textSans.large({ fontWeight: 'bold' })
			: headline.xxsmall({ fontWeight: 'bold' })}
		line-height: 20px;
	}
`;

const secondaryFontStyles = (format: Format) => css`
	${format.theme === Special.Labs
		? textSans.medium({ fontWeight: 'regular' })
		: headline.xxxsmall({ fontWeight: 'regular' })}
	line-height: 20px;
`;

const displayBlock = css`
	display: block;
`;

const titleBadgeWrapper = css`
	margin-bottom: ${space[1]}px;
	margin-top: ${space[1]}px;
	margin-right: ${space[2]}px;
`;

const immersiveTitleBadgeStyle = (palette: Palette) => css`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding-bottom: 0px;
	max-width: max-content;
	line-height: 1.15;
	/* Offset parent container margins when Immersive */
	margin-bottom: -10px;
	background-color: ${palette.background.seriesTitle};
	box-shadow: -6px 0 0 0 ${palette.background.seriesTitle},
		6px 0 0 0 ${palette.background.seriesTitle};
`;

export const SeriesSectionLink = ({
	format,
	palette,
	tags,
	sectionLabel,
	sectionUrl,
	guardianBaseURL,
	badge,
}: Props) => {
	// If we have a tag, use it to show 2 section titles
	const tag = tags.find(
		(thisTag) =>
			thisTag.type === 'Blog' ||
			thisTag.type === 'Series' ||
			thisTag.title === 'The Observer',
	);

	const hasSeriesTag = tag && tag.type === 'Series';

	switch (format.display) {
		case Display.Immersive: {
			switch (format.design) {
				case Design.Comment:
				case Design.Editorial: {
					if (tag) {
						// We have a tag, we're not immersive, show both series and section titles
						return (
							// Sometimes the tags/titles are shown inline, sometimes stacked
							<div className={cx(!badge && rowBelowLeftCol)}>
								<a
									href={`${guardianBaseURL}/${tag.id}`}
									className={cx(
										sectionLabelLink,
										marginRight,
										fontStyles(format),
										css`
											color: ${palette.text.seriesTitle};
											background-color: ${palette
												.background.seriesTitle};
											box-shadow: -6px 0 0 0
													${palette.background
														.seriesTitle},
												6px 0 0 0
													${palette.background
														.seriesTitle};
										`,
									)}
									data-component="series"
									data-link-name="article series"
								>
									<span>{tag.title}</span>
								</a>

								<Hide when="below" breakpoint="tablet">
									<a
										href={`${guardianBaseURL}/${sectionUrl}`}
										className={cx(
											sectionLabelLink,
											fontStyles(format),
											displayBlock,
											css`
												color: ${palette.text
													.sectionTitle};
												background-color: ${palette
													.background.sectionTitle};
												box-shadow: -6px 0 0 0
														${palette.background
															.seriesTitle},
													6px 0 0 0
														${palette.background
															.seriesTitle};
											`,
										)}
										data-component="section"
										data-link-name="article section"
									>
										<span>{sectionLabel}</span>
									</a>
								</Hide>
							</div>
						);
					}
					// There's no tag so fallback to section title
					return (
						<div className={marginBottom}>
							<a
								href={`${guardianBaseURL}/${sectionUrl}`}
								className={cx(
									sectionLabelLink,
									marginRight,
									fontStyles(format),
									css`
										color: ${palette.text.sectionTitle};
										background-color: ${palette.background
											.sectionTitle};
										box-shadow: -6px 0 0 0
												${palette.background
													.seriesTitle},
											6px 0 0 0
												${palette.background
													.seriesTitle};
									`,
								)}
								data-component="section"
								data-link-name="article section"
							>
								<span>{sectionLabel}</span>
							</a>
						</div>
					);
				}
				default: {
					if (hasSeriesTag) {
						if (!tag) return null; // Just to keep ts happy
						return (
							<div
								className={cx(
									badge && immersiveTitleBadgeStyle(palette),
								)}
							>
								{badge && (
									<div className={titleBadgeWrapper}>
										<Badge
											imageUrl={badge.imageUrl}
											seriesTag={badge.seriesTag}
										/>
									</div>
								)}

								<a
									className={cx(
										sectionLabelLink,
										invertedStyle,
										fontStyles(format),
										css`
											color: ${palette.text.seriesTitle};
											background-color: ${palette
												.background.seriesTitle};
											box-shadow: -6px 0 0 0
													${palette.background
														.seriesTitle},
												6px 0 0 0
													${palette.background
														.seriesTitle};
										`,
									)}
									href={`${guardianBaseURL}/${tag.id}`}
									data-component="series"
									data-link-name="article series"
								>
									<span>{tag.title}</span>
								</a>
							</div>
						);
					}
					// Immersives show nothing at all if there's no series tag
					return null;
				}
			}
		}
		case Display.Showcase:
		case Display.Standard:
		default: {
			if (tag) {
				// We have a tag, we're not immersive, show both series and section titles
				return (
					// Sometimes the tags/titles are shown inline, sometimes stacked
					<div className={cx(!badge && rowBelowLeftCol)}>
						<a
							href={`${guardianBaseURL}/${tag.id}`}
							className={cx(
								sectionLabelLink,
								css`
									color: ${palette.text.seriesTitle};
									background-color: ${palette.background
										.seriesTitle};
								`,
								marginRight,
								fontStyles(format),
								css`
									box-shadow: -6px 0 0 0
											${palette.background.seriesTitle},
										6px 0 0 0
											${palette.background.seriesTitle};
								`,
							)}
							data-component="series"
							data-link-name="article series"
						>
							<span>{tag.title}</span>
						</a>

						<Hide when="below" breakpoint="tablet">
							<a
								href={`${guardianBaseURL}/${sectionUrl}`}
								className={cx(
									sectionLabelLink,
									secondaryFontStyles(format),
									displayBlock,
									css`
										color: ${palette.text.sectionTitle};
										background-color: ${palette.background
											.sectionTitle};
									`,
								)}
								data-component="section"
								data-link-name="article section"
							>
								<span>{sectionLabel}</span>
							</a>
						</Hide>
					</div>
				);
			}
			// There's no tag so fallback to section title
			return (
				<a
					href={`${guardianBaseURL}/${sectionUrl}`}
					className={cx(
						sectionLabelLink,
						css`
							color: ${palette.text.sectionTitle};
							background-color: ${palette.background
								.sectionTitle};
						`,
						marginRight,
						fontStyles(format),
					)}
					data-component="section"
					data-link-name="article section"
				>
					<span>{sectionLabel}</span>
				</a>
			);
		}
	}
};
