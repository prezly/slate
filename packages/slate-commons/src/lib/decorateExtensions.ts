import type { NodeEntry, Range } from 'slate';

import type { Decorate, Extension } from '../types';

const decorateExtensions =
    (extensions: Extension[], decorateList: Decorate[]) => (entry: NodeEntry) => {
        let ranges: Range[] = [];

        const addRanges = (newRanges: Range[]) => {
            if (newRanges.length) {
                ranges = [...ranges, ...newRanges];
            }
        };

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

export default decorateExtensions;
