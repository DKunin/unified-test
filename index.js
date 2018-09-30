'use strict';

const remark = require('remark');
const guide = require('remark-preset-lint-markdown-style-guide');
const html = require('remark-html');
const report = require('vfile-reporter');
const rule = require('unified-lint-rule');
const markdown = require('remark-parse');
const slideParser = require('./slide-parse');
const fs = require('fs');
const slides = fs.readFileSync('./slide.md').toString();

const extraRule = rule(
  'remark-lint:no-file-name-mixed-case',
  noFileNameMixedCase
);

const reason = 'Do not mix casing in file names';

function noFileNameMixedCase(tree, file) {
  const name = file.stem;
  // console.log(JSON.stringify(tree, null, 4));
  console.log(name);
  // if (name && !(name === name.toLowerCase() || name === name.toUpperCase())) {
  // }
  file.message(reason);
}

guide.plugins = guide.plugins.concat(extraRule);

remark()
  .use(markdown)
  .use(slideParser)
  .use(guide)
  .use(html)
  .process(slides, function(err, file) {
    console.log(String(file));
    console.error(report(err || file));
  });
