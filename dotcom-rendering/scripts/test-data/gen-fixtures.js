/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const fetch = require('node-fetch');
const execa = require('execa');
const fs = require('fs');
const { resolve } = require('path');
const { config } = require('../../fixtures/config');

const root = resolve(__dirname, '..', '..');

/**
 * gen-fixtures.ts
 *
 * A script to automatically download the latest json data for a production article and
 * insert it into a fixture file to use for testing. In particular, we use these fixtures
 * for our layoout stories
 *
 * Edit the articles array below to add or amend the urls that we use. The script will fetch
 * ${article.url}.json?dcr and save the response in ${article.name}.ts in the fixtures folder
 *
 * Usage
 * $ node scripts/test-data/gen-schema.js
 */

const articles = [
	{
		name: 'Article',
		url:
			'https://www.theguardian.com/environment/2020/feb/10/fires-floods-maps-europe-climate-catastrophe',
	},
	{
		name: 'Analysis',
		url:
			'https://www.theguardian.com/world/2020/feb/10/irish-general-election-everything-you-need-to-know',
	},
	{
		name: 'Comment',
		url:
			'https://www.theguardian.com/commentisfree/2020/feb/10/austerity-level-up-newcastle-budget-cuts',
	},
	{
		name: 'Feature',
		url:
			'https://www.theguardian.com/film/2020/feb/10/quotes-of-the-oscars-2020',
	},
	{
		name: 'Live',
		url:
			'https://www.theguardian.com/science/live/2021/feb/19/mars-landing-nasa-perseverance-rover-briefing-latest-live-news-updates',
	},
	{
		name: 'GuardianView',
		url:
			'https://www.theguardian.com/commentisfree/2021/feb/03/the-guardian-view-on-quarantine-an-old-method-and-a-vital-one',
	},
	{
		name: 'SpecialReport',
		url:
			'https://www.theguardian.com/environment/2019/oct/12/top-three-asset-managers-fossil-fuel-investments',
	},
	{
		name: 'Interview',
		url:
			'https://www.theguardian.com/global/2020/feb/09/halima-aden-model-activist-hijab-refugee-fashion-we-all-deserve-representation',
	},
	{
		name: 'MatchReport',
		url:
			'https://www.theguardian.com/football/2021/feb/05/andre-ayew-sparks-swansea-victory-over-norwich-to-close-gap-at-top',
	},
	{
		name: 'PhotoEssay',
		url:
			'https://www.theguardian.com/travel/2020/dec/09/my-year-of-roaming-free-in-cornwall-photo-essay-cat-vinton',
	},
	{
		name: 'PrintShop',
		url:
			'https://www.theguardian.com/artanddesign/2020/dec/17/buy-a-classic-sport-photograph-the-immortal-bobby-moore',
	},
	{
		name: 'Recipe',
		url:
			'https://www.theguardian.com/food/2021/feb/06/meera-sodhas-vegan-recipe-for-spring-onion-pancakes',
	},
	{
		name: 'Review',
		url:
			'https://www.theguardian.com/tv-and-radio/2020/jan/17/sex-education-season-two-review-netflix',
	},
	{
		name: 'Quiz',
		url:
			'https://www.theguardian.com/football/that-1980s-sports-blog/2020/jun/12/sports-quiz-football-in-the-1980s',
	},
];

const HEADER = `/**
* DO NOT EDIT THIS FILE!
*
* This file was automatically generated using the gen-fixtures.ts script. Any edits
* you make here will be lost.
*
* If the data in these fixtures is not what you expect then
*
* 1. Refresh the data using '$ node scrips/test-data/gen-fixtures.ts' or
* 2. if the latest live data is not what you need, then consider editing
*    gen-fixtures.ts directly.
*/

`;

try {
	// Article fixtures
	const requests = articles.map((article) => {
		return fetch(`${article.url}.json?dcr`)
			.then((res) => res.json())
			.then((json) => {
				// Add test config
				json.config = config;
				// Write the new fixture data
				const contents = `${HEADER}export const ${
					article.name
				}: CAPIType = ${JSON.stringify(json, null, 4)}`;
				fs.writeFileSync(
					`${root}/fixtures/generated/articles/${article.name}.ts`,
					contents,
					'utf8',
				);
				console.log(`Created ${article.name}.ts`);
			});
	});
	// Images fixture
	requests.push(
		fetch(
			'https://www.theguardian.com/travel/2020/dec/09/my-year-of-roaming-free-in-cornwall-photo-essay-cat-vinton.json?dcr',
		)
			.then((res) => res.json())
			.then((json) => {
				const images = json.blocks[0].elements.filter(
					(element) =>
						element._type ===
						'model.dotcomrendering.pageElements.ImageBlockElement',
				);

				// Write the new fixture data
				const contents = `${HEADER}export const images: ImageBlockElement[] = ${JSON.stringify(
					images,
					null,
					4,
				)}`;
				fs.writeFileSync(
					`${root}/fixtures/generated/images.ts`,
					contents,
					'utf8',
				);
				console.log(`Created Images.ts`);
			}),
	);

	Promise.all(requests).finally(() => {
		console.log('\nFormatting files...');
		execa('prettier', [
			'./fixtures/**/*',
			'--write',
			'--loglevel',
			'error',
		]).then(() => {
			console.log(
				`\nDone ✅ Successfully created ${requests.length} fixtures\n`,
			);
		});
	});
} catch (e) {
	console.log(e);
}
