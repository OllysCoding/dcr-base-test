import React from 'react';
import { render } from 'react-testing-library';
import { SubMetaLinksList } from './SubMetaLinksList';

describe('SubMetaLinksList', () => {
    const links: SimpleLinkType[] = [
        {
            url: '/test/1',
            title: 'Test 1',
        },
        {
            url: '/test/2',
            title: 'Test 2',
        },
    ];
    const pillar: Pillar = 'news';

    describe('snapshots', () => {
        it('It should render correctly if isSectionLinkList true', () => {
            const { container } = render(
                <SubMetaLinksList
                    links={links}
                    isSectionLinkList={true}
                    pillar={pillar}
                />,
            );

            expect(container.firstChild).toMatchSnapshot();
        });

        it('It should render correctly if isSectionLinkList false', () => {
            const { container } = render(
                <SubMetaLinksList
                    links={links}
                    isSectionLinkList={false}
                    pillar={pillar}
                />,
            );

            expect(container.firstChild).toMatchSnapshot();
        });
    });

    it('It should render correct amount of links', () => {
        const { container, getByText } = render(
            <SubMetaLinksList
                links={links}
                isSectionLinkList={false}
                pillar={pillar}
            />,
        );

        const listItems = container.querySelectorAll('li');

        expect(container.firstChild).not.toBeNull();
        expect(listItems.length).toBe(2);
        expect(getByText(links[0].title)).toBeInTheDocument();
        expect(getByText(links[1].title)).toBeInTheDocument();
    });
});
