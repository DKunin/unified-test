'use strict';

const remark = require('remark');
const guide = require('remark-preset-lint-markdown-style-guide');
const html = require('remark-html');
const report = require('vfile-reporter');
const rule = require('unified-lint-rule');
const markdown = require('remark-parse');
const noEmptyClassListToken = require('./no-empty-class-list-token');
const noEmptyClassListRule = require('./no-empty-class-list-rule');
const fs = require('fs');
const slides = fs.readFileSync('./slide.md').toString();

const extraRule = rule('remark-lint:no-file-name-mixed-case', noEmptyClassListRule);

guide.plugins = guide.plugins.concat(extraRule);

remark()
    .use(markdown)
    .use(noEmptyClassListToken)
    .use(guide)
    .use(html)
    .process(slides, function(err, file) {
        console.error(report(err || file));
    });
