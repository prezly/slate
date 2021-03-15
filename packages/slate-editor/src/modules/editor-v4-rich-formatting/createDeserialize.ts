import { createDeserializeElement, DeserializeHtml, PARAGRAPH_TYPE } from '@prezly/slate-commons';

import { detectMarks, parseSerializedElement, parseSerializedLinkElement } from './lib';
import { ElementType, RichFormattingExtensionParameters } from './types';

const createDeserialize = (parameters: RichFormattingExtensionParameters): DeserializeHtml => {
    const deserialize: DeserializeHtml = {
        element: {
            [ElementType.BLOCK_QUOTE]: () => ({ type: PARAGRAPH_TYPE }),
            [ElementType.BULLETED_LIST]: () => ({ type: PARAGRAPH_TYPE }),
            [ElementType.HEADING_ONE]: () => ({ type: PARAGRAPH_TYPE }),
            [ElementType.HEADING_TWO]: () => ({ type: PARAGRAPH_TYPE }),
            [ElementType.LINK]: () => ({ type: PARAGRAPH_TYPE }),
            [ElementType.LIST_ITEM]: () => ({ type: PARAGRAPH_TYPE }),
            [ElementType.LIST_ITEM_TEXT]: () => ({ type: PARAGRAPH_TYPE }),
            [ElementType.NUMBERED_LIST]: () => ({ type: PARAGRAPH_TYPE }),
            BLOCKQUOTE: () => ({ type: PARAGRAPH_TYPE }),
            BR: () => ({ type: PARAGRAPH_TYPE }),
            H1: () => ({ type: PARAGRAPH_TYPE }),
            H2: () => ({ type: PARAGRAPH_TYPE }),
            H3: () => ({ type: PARAGRAPH_TYPE }),
            H4: () => ({ type: PARAGRAPH_TYPE }),
            H5: () => ({ type: PARAGRAPH_TYPE }),
            H6: () => ({ type: PARAGRAPH_TYPE }),
            LI: () => ({ type: PARAGRAPH_TYPE }),
            OL: () => ({ type: PARAGRAPH_TYPE }),
            UL: () => ({ type: PARAGRAPH_TYPE }),
        },
        leaf: {
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

    if (parameters.blocks) {
        Object.assign(deserialize.element, {
            [ElementType.BLOCK_QUOTE]: createDeserializeElement(parseSerializedElement),
            [ElementType.BULLETED_LIST]: createDeserializeElement(parseSerializedElement),
            [ElementType.HEADING_ONE]: createDeserializeElement(parseSerializedElement),
            [ElementType.HEADING_TWO]: createDeserializeElement(parseSerializedElement),
            [ElementType.LIST_ITEM]: createDeserializeElement(parseSerializedElement),
            [ElementType.LIST_ITEM_TEXT]: createDeserializeElement(parseSerializedElement),
            [ElementType.NUMBERED_LIST]: createDeserializeElement(parseSerializedElement),
            BLOCKQUOTE: () => ({ type: ElementType.BLOCK_QUOTE }),
            DIV: (element: HTMLDivElement) => {
                if (element.parentNode?.nodeName === 'LI') {
                    return { type: ElementType.LIST_ITEM_TEXT };
                }

                return { type: PARAGRAPH_TYPE };
            },
            H1: () => ({ type: ElementType.HEADING_ONE }),
            H2: () => ({ type: ElementType.HEADING_TWO }),
            H3: () => ({ type: ElementType.HEADING_TWO }),
            H4: () => ({ type: ElementType.HEADING_TWO }),
            H5: () => ({ type: ElementType.HEADING_TWO }),
            H6: () => ({ type: ElementType.HEADING_TWO }),
            LI: () => ({ type: ElementType.LIST_ITEM }),
            OL: () => ({ type: ElementType.NUMBERED_LIST }),
            P: (element: HTMLParagraphElement) => {
                if (element.parentNode?.nodeName === 'LI') {
                    return { type: ElementType.LIST_ITEM_TEXT };
                }

                return { type: PARAGRAPH_TYPE };
            },
            UL: () => ({ type: ElementType.BULLETED_LIST }),
        });
    }

    if (parameters.links) {
        Object.assign(deserialize.element, {
            [ElementType.LINK]: createDeserializeElement(parseSerializedLinkElement),
            A: (element: HTMLAnchorElement) => {
                if (!element.textContent) {
                    return undefined;
                }

                return {
                    href: element.href,
                    type: ElementType.LINK,
                };
            },
        });
    } else {
        Object.assign(deserialize.leaf, {
            A: detectMarks,
        });
    }

    return deserialize;
};

export default createDeserialize;
