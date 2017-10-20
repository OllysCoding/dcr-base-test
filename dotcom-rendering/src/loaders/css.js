// @flow

// This loader breaks the webpack rule of 'do one thing' because we use it internally
// and it makes life easier than passing loads of stuff about, reparsing it per transform etc

import postcss from 'postcss';
import customProperties from 'postcss-custom-properties';
import customMedia from 'postcss-custom-media';
import apply from 'postcss-apply';
import decamelize from 'decamelize';
import { parseCSS as emotionParser } from 'babel-plugin-emotion/lib/parser';
import {
    font as pasteupFonts,
    colour as pasteupColours,
    breakpoints as pasteupBreakpoints,
} from '../pasteup';

// convert pasteup exports to css vars
// e.g. a.b.c => --a-b-c
const toVars = (vars, prefix = false) =>
    Object.keys(vars).reduce((cssVars, key) => {
        const varName = [prefix, decamelize(key, '-')]
            .filter(Boolean)
            .join('-');

        if (typeof vars[key] === 'object') {
            return Object.assign({}, cssVars, toVars(vars[key], varName));
        }

        return Object.assign({}, cssVars, {
            [varName]: vars[key],
        });
    }, {});

// our own processing of the CSS source file
const normaliseCSS = source =>
    postcss()
        .use(
            customProperties({
                variables: toVars({
                    pasteupFonts,
                    pasteupColours,
                    pasteupBreakpoints,
                }),
            })
        )
        .use(
            customMedia({
                extensions: Object.keys(pasteupBreakpoints).reduce(
                    (breakpoints, breakpoint) =>
                        Object.assign({}, breakpoints, {
                            [`--from-${breakpoint}`]: `(min-width: ${pasteupBreakpoints[
                                breakpoint
                            ] / 16}em)`,
                            [`--until-${breakpoint}`]: `(max-width: ${(pasteupBreakpoints[
                                breakpoint
                            ] -
                                1) /
                                16}em)`,
                        }),
                    {}
                ),
            })
        )
        .use(apply())
        .process(source).css;

// turn class selectors into reasonable keys
// {'.header': 'blah} => {'header': 'blah}
const normaliseKeys = styles =>
    Object.keys(styles).reduce(
        (normalised, key) =>
            Object.assign({}, normalised, {
                [key.replace(/^\./, '')]: styles[key],
            }),
        {}
    );

// bloomin heck - replace 'float's that have been converted by postcss-js
// to 'cssFloat' back to 'float'
// https://github.com/rtsao/styletron/pull/54
const reFloat = rules =>
    Object.keys(rules).reduce((refloated, key) => {
        if (key === 'cssFloat') {
            return Object.assign({}, refloated, { float: rules[key] });
        }
        if (typeof rules[key] === 'object') {
            return Object.assign({}, refloated, {
                [key]: reFloat(rules[key]),
            });
        }
        return Object.assign({}, refloated, { [key]: rules[key] });
    }, {});

// splits rules into cheap/expensive clusters which
// can then be handled appropriately. which
// basically means 'can styletron handle it?':
// {
//     color: 'red',
//     '@supports (display: flex)': {
//         display: 'flex',
//     },
// }
// becomes
// {
//     cheapCSS: { color: 'red' },
//     expensiveCSS: {
//         '@supports (display: flex)': {
//             display: 'flex',
//         },
//     },
// }
const categoriseStyles = styles =>
    Object.keys(styles).reduce((categorisedStyles, key) => {
        const rule = styles[key];

        const categorisedStyle = Object.keys(
            rule
        ).reduce(({ cheapCSS = {}, expensiveCSS = {} }, decl) => {
            if (
                typeof rule[decl] !== 'object' ||
                (decl.startsWith('@media') &&
                    Object.values(rule[decl]).every(
                        mediaDeclValue => typeof mediaDeclValue !== 'object'
                    ))
            ) {
                return {
                    expensiveCSS,
                    cheapCSS: Object.assign({}, cheapCSS, {
                        [decl]: rule[decl],
                    }),
                };
            }
            return {
                cheapCSS,
                expensiveCSS: Object.assign({}, expensiveCSS, {
                    [decl]: rule[decl],
                }),
            };
        }, {});

        return Object.assign(categorisedStyles, {
            [key]: categorisedStyle,
        });
    }, {});

module.exports = function uiCSS(source) {
    // run all our own processing
    const normalisedSource = normaliseCSS(source);

    const { styles } = reFloat(
        // have emotion parse it
        emotionParser(normalisedSource, false, this.resourcePath)
    );

    // turn '.key' keys into 'key'
    const normalisedKeysStyles = normaliseKeys(styles);

    // split out styles we can pass to styeltron
    const categorisedStyles = categoriseStyles(normalisedKeysStyles);

    return `module.exports = ${JSON.stringify(categorisedStyles)};`;
};
