'use strict';

function locateMention(value, fromIndex) {
  return value.indexOf('===', fromIndex);
}

tokenSlideSeparator.notInLink = true;
tokenSlideSeparator.locator = locateMention;

function tokenSlideSeparator(eat, value, silent) {
  var match = /^={1,3}/g.exec(value);

  if (match) {
    if (silent) {
      return true;
    }

    return eat(match[0])({
      type: 'slideBreak',
      children: [{type: 'text', value: match[0]}]
    });
  }
}


function slideParse() {
  var Parser = this.Parser;
  var tokenizers = Parser.prototype.inlineTokenizers;
  var methods = Parser.prototype.inlineMethods;
  tokenizers.slideParse = tokenSlideSeparator;
  methods.splice(methods.indexOf('text'), 0, 'slideParse');
}


module.exports = slideParse;