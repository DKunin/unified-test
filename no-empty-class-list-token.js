'use strict';

function locateClassListRow(value, fromIndex) {
    return value.indexOf('===', fromIndex);
}

tokenClassListSeparator.notInLink = true;
tokenClassListSeparator.locator = locateClassListRow;

function tokenClassListSeparator(process, value) {
    const match = /^class:(.+)/g.exec(value);
    if (match) {
        return process(match[0])({
            type: 'classRow',
            children: [{ type: 'classList', value: match[0] }]
        });
    }
}

function classListParse() {
    const Parser = this.Parser;
    const tokenizers = Parser.prototype.inlineTokenizers;
    const methods = Parser.prototype.inlineMethods;
    tokenizers.classListParse = tokenClassListSeparator;
    methods.splice(methods.indexOf('text'), 0, 'classListParse');
}

module.exports = classListParse;
