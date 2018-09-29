var unified = require('unified');
var createStream = require('unified-stream');
var markdown = require('remark-parse');
var html = require('remark-html');


var processor = unified()
  .use(markdown)
  .use(mentions)
  .use(html)


process.stdin
  .pipe(createStream(processor))
  .pipe(process.stdout);