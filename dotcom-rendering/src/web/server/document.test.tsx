import { CAPI } from '@root/fixtures/CAPI/CAPI';
import { ga } from '@root/fixtures/ga';
import { extract as extractNAV } from '@root/src/model/extract-nav';
import { document } from './document';

const linkedData = [{}];
const result = document({
    data: {
        linkedData,
        CAPI,
        page: 'article',
        site: 'site',
        NAV: extractNAV(CAPI.nav),
        GA: ga,
    },
});

console.log(result);

test('that all the required meta SEO fields exist', () => {
    const names = ['description', 'viewport'];

    names.map(name =>
        expect(result.includes(`<meta name="${name}"`)).toBe(true),
    );
});

test('that all the required links exist', () => {
    const names = ['amphtml'];

    names.map(name =>
        expect(result.includes(`<link rel="${name}" href="`)).toBe(true),
    );
});

test('Subnav data-link-name exists with correct value', () => {
    expect(result).toEqual(
        expect.stringContaining(`data-link-name="nav2 : subnav : money/debt"`),
    );

    expect(result).toEqual(
        expect.not.stringContaining(
            `data-link-name="nav2 : subnav : /money/debt"`,
        ),
    );
});
