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


function mentions() {
  var Parser = this.Parser;
  var tokenizers = Parser.prototype.inlineTokenizers;
  var methods = Parser.prototype.inlineMethods;

  /* Add an inline tokenizer (defined in the following example). */
  tokenizers.mention = tokenSlideSeparator;

  /* Run it just before `text`. */
  methods.splice(methods.indexOf('text'), 0, 'mention');
}


module.exports = mentions;