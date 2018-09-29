
var remark = require('remark');
var guide = require('remark-preset-lint-markdown-style-guide');
var html = require('remark-html');
var report = require('vfile-reporter');
var rule = require('unified-lint-rule');
var markdown = require('remark-parse');
var slideParser = require('./slide-parse');

const extraRule = rule(
  'remark-lint:no-file-name-mixed-case',
  noFileNameMixedCase
)

var reason = 'Do not mix casing in file names'

function noFileNameMixedCase(tree, file) {
  var name = file.stem
  // console.log(JSON.stringify(tree, null, 4));
  console.log(name);
  // if (name && !(name === name.toLowerCase() || name === name.toUpperCase())) {
  // }
    file.message(reason)
}


guide.plugins = guide.plugins.concat(extraRule)

remark()
  .use(markdown)
  .use(slideParser)
  .use(guide)
  .use(html)
  .process('=== == =  *emphasis* and _importance_', function (err, file) {
    console.log(String(file));
    console.error(report(err || file));
  });