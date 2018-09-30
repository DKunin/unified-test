'use strict';

const unified = require('unified');
const createStream = require('unified-stream');
const markdown = require('remark-parse');
const slideParse = require('./slide-parse');
const fs = require('fs');

const slides = fs.readFileSync('./slide.md').toString();

const processor = unified()
  .use(markdown)
  .use(slideParse)
  .parse(slides)

console.log(JSON.stringify(processor, null, 4));
