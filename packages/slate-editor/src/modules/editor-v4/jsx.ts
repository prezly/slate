/* eslint-disable @typescript-eslint/no-namespace */

import { PARAGRAPH_TYPE } from '@prezly/slate-commons';
import { createHyperscript } from '@prezly/slate-hyperscript';
import { ReactNode } from 'react';

import { DIVIDER_TYPE } from '../../modules/editor-v4-divider';
import { ElementType } from '../../modules/editor-v4-rich-formatting';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'h-divider': {
                children?: ReactNode;
            };
            'h-li': {
                children?: ReactNode;
            };
            'h-li-text': {
                children?: ReactNode;
            };
            'h-ol': {
                children?: ReactNode;
            };
            'h-p': {
                children?: ReactNode;
            };
            'h-ul': {
                children?: ReactNode;
            };
        }
    }
}

const jsx = createHyperscript({
    elements: {
        'h-divider': { type: DIVIDER_TYPE },
        'h-li': { type: ElementType.LIST_ITEM },
        'h-li-text': { type: ElementType.LIST_ITEM_TEXT },
        'h-ol': { type: ElementType.NUMBERED_LIST },
        'h-p': { type: PARAGRAPH_TYPE },
        'h-ul': { type: ElementType.BULLETED_LIST },
    },
});

export default jsx;
