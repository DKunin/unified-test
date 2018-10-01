'use strict';

const visit = require('unist-util-visit');
const reason = 'ClassName cannot be empty';

function visitor(file) {
    return (node) => {
        const classList = node.value
            .replace('class:', '')
            .split(',')
            .map(singleClassName => {
                return singleClassName.trim();
            })
            .filter(Boolean);
        if (classList.length === 0) {
            file.message(reason);
        }
    };
}

function noEmptyClassList(tree, file) {
    visit(tree, 'classList', visitor(file));
}

module.exports = noEmptyClassList;
