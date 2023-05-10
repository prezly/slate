/* eslint-disable @typescript-eslint/no-namespace */

import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import type { ReactNode } from 'react';
import { createHyperscript, createText } from 'slate-hyperscript';

import { PlaceholderNode } from './PlaceholderNode';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name: string]: {
                children?: ReactNode;
                [prop: string]: any;
            };
        }
    }
}

export const hyperscript = createHyperscript({
    elements: {
        'h:paragraph': { type: PARAGRAPH_NODE_TYPE },
        'h:attachment-placeholder': { type: PlaceholderNode.Type.ATTACHMENT },
        'h:embed-placeholder': { type: PlaceholderNode.Type.EMBED },
        'h:gallery-placeholder': { type: PlaceholderNode.Type.GALLERY },
        'h:image-placeholder': { type: PlaceholderNode.Type.IMAGE },
        'h:social-post-placeholder': { type: PlaceholderNode.Type.SOCIAL_POST },
        'h:video-placeholder': { type: PlaceholderNode.Type.VIDEO },
        'h:web-bookmark-placeholder': { type: PlaceholderNode.Type.WEB_BOOKMARK },
    },
    creators: {
        'h:text': createText,
    },
});
