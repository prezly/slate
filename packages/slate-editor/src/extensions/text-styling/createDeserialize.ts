import type { DeserializeHtml } from '@prezly/slate-commons';
import {HEADING_1_NODE_TYPE, HEADING_2_NODE_TYPE, LINK_NODE_TYPE, PARAGRAPH_NODE_TYPE} from '@prezly/slate-types';

import { detectMarks } from './lib';

export function createDeserialize(): DeserializeHtml {
    return {
        element: {
            [HEADING_1_NODE_TYPE]: () => ({ type: PARAGRAPH_NODE_TYPE }), // FIXME
            [HEADING_2_NODE_TYPE]: () => ({ type: PARAGRAPH_NODE_TYPE }), // FIXME
            [LINK_NODE_TYPE]: () => ({ type: PARAGRAPH_NODE_TYPE }), // FIXME
            BR: () => ({ type: PARAGRAPH_NODE_TYPE }),
            LI: () => ({ type: PARAGRAPH_NODE_TYPE }), // FIXME
            OL: () => ({ type: PARAGRAPH_NODE_TYPE }), // FIXME
            UL: () => ({ type: PARAGRAPH_NODE_TYPE }), // FIXME
        },
        leaf: {
            A: detectMarks,
            ABBR: detectMarks,
            ACRONYM: detectMarks,
            AUDIO: detectMarks,
            B: detectMarks,
            BDI: detectMarks,
            BDO: detectMarks,
            BIG: detectMarks,
            BR: detectMarks,
            BUTTON: detectMarks,
            CANVAS: detectMarks,
            CITE: detectMarks,
            CODE: detectMarks,
            DATA: detectMarks,
            DATALIST: detectMarks,
            DEL: detectMarks,
            DFN: detectMarks,
            EM: detectMarks,
            EMBED: detectMarks,
            I: detectMarks,
            IFRAME: detectMarks,
            IMG: detectMarks,
            INPUT: detectMarks,
            INS: detectMarks,
            KBD: detectMarks,
            LABEL: detectMarks,
            MAP: detectMarks,
            MARK: detectMarks,
            METER: detectMarks,
            NOSCRIPT: detectMarks,
            OBJECT: detectMarks,
            OUTPUT: detectMarks,
            PICTURE: detectMarks,
            PROGRESS: detectMarks,
            Q: detectMarks,
            RUBY: detectMarks,
            S: detectMarks,
            SAMP: detectMarks,
            SCRIPT: detectMarks,
            SELECT: detectMarks,
            SLOT: detectMarks,
            SMALL: detectMarks,
            SPAN: detectMarks,
            STRONG: detectMarks,
            SUB: detectMarks,
            SUP: detectMarks,
            SVG: detectMarks,
            TEMPLATE: detectMarks,
            TEXTAREA: detectMarks,
            TIME: detectMarks,
            U: detectMarks,
            TT: detectMarks,
            VAR: detectMarks,
            VIDEO: detectMarks,
            WBR: detectMarks,
        },
    };
}
