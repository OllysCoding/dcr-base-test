// @flow
import { h } from 'preact';
import { render as renderToStringPreact } from 'preact-render-to-string';
import { StyletronProvider } from 'styletron-preact';

const renderToString = (styletron: Object, node: React.Element<any>): string =>
    renderToStringPreact(
        <StyletronProvider styletron={styletron}>{node}</StyletronProvider>
    );

export default renderToString;
