import React from 'react';
import { css } from 'emotion';

import { Design } from '@guardian/types';
import { from } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';

const determinePadding = ({
	design,
	starRating,
}: {
	design: Design;
	starRating?: boolean;
}) => {
	switch (design) {
		case Design.Interview:
			return css`
				${space[1]}px;
			`;
		case Design.Review:
			if (starRating) {
				return '';
			}
			return css`
				${space[6]}px;
				${from.tablet} {
					${space[9]}px;
				}
			`;
		case Design.LiveBlog:
		case Design.DeadBlog:
			return css`
				${space[1]}px;
			`;
		default:
			return css`
				${space[1]}px;
				${space[6]}px;
				${from.tablet} {
					${space[9]}px;
				}
			`;
	}
};

export const ArticleHeadlinePadding: React.FC<{
	children: React.ReactNode;
	design: Design;
	starRating?: boolean;
}> = ({ children, design, starRating }) => (
	<div className={determinePadding({ design, starRating })}>{children}</div>
);
