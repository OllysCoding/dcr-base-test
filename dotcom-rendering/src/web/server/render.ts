import express from 'express';
import { extractNAV } from '@root/src/model/extract-nav';

import { document } from '@root/src/web/server/document';
import { validateAsCAPIType } from '@root/src/model/validate';
import { addDividers } from '@root/src/model/add-dividers';
import { enhanceDots } from '@root/src/model/add-dots';
import { setIsDev } from '@root/src/model/set-is-dev';
import { enhanceImages } from '@root/src/model/enhance-images';
import { enhanceBlockquotes } from '@root/src/model/enhance-blockquotes';
import { enhanceAnniversaryAtom } from '@root/src/model/enhance-AnniversaryInteractiveAtom';
import { extract as extractGA } from '@root/src/model/extract-ga';
import { Article as ExampleArticle } from '@root/fixtures/generated/articles/Article';

class CAPIEnhancer {
	capi: CAPIType;

	constructor(capi: CAPIType) {
		this.capi = capi;
	}

	addDividers() {
		this.capi = addDividers(this.capi);
		return this;
	}

	enhanceDots() {
		this.capi = enhanceDots(this.capi);
		return this;
	}

	enhanceImages() {
		this.capi = enhanceImages(this.capi);
		return this;
	}

	enhanceBlockquotes() {
		this.capi = enhanceBlockquotes(this.capi);
		return this;
	}

	validateAsCAPIType() {
		this.capi = validateAsCAPIType(this.capi);
		return this;
	}

	setIsDev() {
		this.capi = setIsDev(this.capi);
		return this;
	}

	enhanceAnniversaryAtom() {
		this.capi = enhanceAnniversaryAtom(this.capi);
		return this;
	}
}

export const render = (
	{ body }: express.Request,
	res: express.Response,
): void => {
	try {
		const CAPI = new CAPIEnhancer(body)
			.validateAsCAPIType()
			.addDividers()
			.enhanceBlockquotes()
			.enhanceDots()
			.enhanceImages()
			.enhanceAnniversaryAtom().capi;
		const resp = document({
			data: {
				CAPI,
				site: 'frontend',
				page: 'Article',
				NAV: extractNAV(CAPI.nav),
				GA: extractGA(CAPI),
				linkedData: CAPI.linkedData,
			},
		});

		res.status(200).send(resp);
	} catch (e) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		res.status(500).send(`<pre>${e.stack}</pre>`);
	}
};

export const renderPerfTest = (
	req: express.Request,
	res: express.Response,
): void => {
	req.body = ExampleArticle;
	render(req, res);
};
