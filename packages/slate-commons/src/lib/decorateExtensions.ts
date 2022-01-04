import type { NodeEntry, Range } from 'slate';

import type { Decorate, Extension } from '../types';

export function decorateExtensions(extensions: Extension[], decorateList: Decorate[]) {
    return (entry: NodeEntry) => {
        let ranges: Range[] = [];

        function addRanges(newRanges: Range[]) {
            if (newRanges.length) {
                ranges = [...ranges, ...newRanges];
            }
        }

        decorateList.forEach((decorate) => {
            addRanges(decorate(entry));
        });

        extensions.forEach(({ decorate }) => {
            if (decorate) {
                addRanges(decorate(entry));
            }
        });

        return ranges;
    };
}
