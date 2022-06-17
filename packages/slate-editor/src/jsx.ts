/* eslint-disable @typescript-eslint/no-namespace */

import type {
    AttachmentNode,
    BookmarkNode,
    ContactNode,
    CoverageNode,
    ElementNode,
} from '@prezly/slate-types';
import {
    BULLETED_LIST_NODE_TYPE,
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
    LINK_NODE_TYPE,
    LIST_ITEM_NODE_TYPE,
    LIST_ITEM_TEXT_NODE_TYPE,
    NUMBERED_LIST_NODE_TYPE,
    PARAGRAPH_NODE_TYPE,
    QUOTE_NODE_TYPE,
} from '@prezly/slate-types';
import type { ReactNode } from 'react';
import { createEditor as createSlateEditor } from 'slate';
import type { HyperscriptCreators } from 'slate-hyperscript';
import {
    createEditor as createEditorFactory,
    createHyperscript,
    createText,
} from 'slate-hyperscript';
import { withReact } from 'slate-react';

import { BlockquoteExtension } from '#extensions/blockquote';
import { createCoverage } from '#extensions/coverage';
import { createFileAttachment } from '#extensions/file-attachment';
import { HeadingExtension } from '#extensions/heading';
import { InlineLinksExtension } from '#extensions/inline-links';
import { ListExtension } from '#extensions/list';
import { createPressContact } from '#extensions/press-contacts';
import { createWebBookmark } from '#extensions/web-bookmark';
import { createEditor } from '#modules/editor';

type JsxElement<T extends ElementNode> = Omit<T, 'type' | 'children'> & { children?: ReactNode };

declare global {
    namespace JSX {
        interface IntrinsicElements {
            editor: {
                children?: ReactNode;
            };
            'editor-pure': {
                children?: ReactNode;
            };
            attachment: JsxElement<AttachmentNode>;
            bookmark: JsxElement<BookmarkNode>;
            contact: JsxElement<ContactNode>;
            coverage: JsxElement<CoverageNode>;
        }
    }
}

const extensions = [
    BlockquoteExtension(),
    HeadingExtension(),
    InlineLinksExtension(),
    ListExtension(),
];

export const jsx = createHyperscript({
    elements: {
        paragraph: { type: PARAGRAPH_NODE_TYPE },
        link: { type: LINK_NODE_TYPE },
        blockquote: { type: QUOTE_NODE_TYPE },
        h1: { type: HEADING_1_NODE_TYPE },
        h2: { type: HEADING_2_NODE_TYPE },
        ol: { type: NUMBERED_LIST_NODE_TYPE },
        ul: { type: BULLETED_LIST_NODE_TYPE },
        li: { type: LIST_ITEM_NODE_TYPE },
        'li-text': { type: LIST_ITEM_TEXT_NODE_TYPE },
    },
    creators: {
        editor: createEditorFactory(() => createEditor(createSlateEditor(), () => extensions)),
        'editor-pure': createEditorFactory(() => withReact(createSlateEditor())),
        attachment: initCreator((props: AttachmentNode) =>
            createFileAttachment(props.file, props.description),
        ),
        bookmark: initCreator((props: BookmarkNode) => createWebBookmark(props)),
        contact: initCreator((props: ContactNode) => createPressContact(props.contact)),
        coverage: initCreator((props: CoverageNode) => createCoverage(props.coverage.id, props)),
        'h-text': createText,
    },
});

function initCreator<T>(creator: (props: T) => T): HyperscriptCreators[string] {
    return (_, props) => {
        return creator(props as any);
    };
}
