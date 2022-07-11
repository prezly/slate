/* eslint-disable @typescript-eslint/no-namespace */

import type {
    AttachmentNode,
    BookmarkNode,
    ContactNode,
    CoverageNode,
    DividerNode,
    ElementNode,
    EmbedNode,
    GalleryNode,
    HeadingNode,
    HtmlNode,
    ImageNode,
    ListItemNode,
    ListItemTextNode,
    ListNode,
    ParagraphNode,
    QuoteNode,
    StoryBookmarkNode,
    StoryEmbedNode,
    TableCellNode,
    TableNode,
    TableRowNode,
    TextNode,
    VideoNode,
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
import type { PropsWithChildren } from 'react';
import { createEditor as createSlateEditor } from 'slate';
import type { HyperscriptCreators } from 'slate-hyperscript';
import {
    createEditor as createEditorFactory,
    createHyperscript,
    createText,
} from 'slate-hyperscript';
import { withReact } from 'slate-react';

import { BlockquoteExtension, createBlockquote } from '#extensions/blockquote';
import { createCoverage } from '#extensions/coverage';
import { createDivider } from '#extensions/divider';
import { createEmbed } from '#extensions/embed';
import { createFileAttachment } from '#extensions/file-attachment';
import { createGallery } from '#extensions/galleries';
import { HeadingExtension } from '#extensions/heading';
import { createHeading } from '#extensions/heading';
import { createHtmlBlock } from '#extensions/html';
import { createImage, createImageCandidate } from '#extensions/image';
import type { ImageCandidateNode } from '#extensions/image';
import { InlineLinksExtension } from '#extensions/inline-links';
import { createList, createListItem, createListItemText } from '#extensions/list';
import { ListExtension } from '#extensions/list';
import type { LoaderNode } from '#extensions/loader';
import { createLoader } from '#extensions/loader';
import { createParagraph } from '#extensions/paragraphs';
import { createPressContact } from '#extensions/press-contacts';
import { createStoryBookmark } from '#extensions/story-bookmark';
import { createStoryEmbed } from '#extensions/story-embed';
import {
    createTableNode,
    createTableRowNode,
    createTableCellNode,
    TablesExtension,
} from '#extensions/tables';
import { createVideoBookmark } from '#extensions/video';
import { createWebBookmark } from '#extensions/web-bookmark';
import { createEditor } from '#modules/editor';

type HElement<T extends ElementNode> = Omit<T, 'type' | 'children'>;

interface HElements {
    editor: PropsWithChildren<Record<string, unknown>>;
    'editor-pure': PropsWithChildren<Record<string, unknown>>;
    'h:text': PropsWithChildren<Omit<TextNode, 'text'>>;
    // TODO: Remove usage of h-text in all tests
    'h-text': PropsWithChildren<Omit<TextNode, 'text'>>;
    'h:attachment': HElement<AttachmentNode>;
    'h:bookmark': HElement<BookmarkNode>;
    'h:contact': HElement<ContactNode>;
    'h:coverage': HElement<CoverageNode>;
    'h:divider': HElement<DividerNode>;
    'h:embed': HElement<EmbedNode>;
    'h:gallery': HElement<GalleryNode>;
    'h:h1': PropsWithChildren<HElement<HeadingNode>>;
    'h:h2': PropsWithChildren<HElement<HeadingNode>>;
    'h:html': HElement<HtmlNode>;
    'h:image-candidate': HElement<ImageCandidateNode>;
    'h:image': PropsWithChildren<HElement<ImageNode>>;
    'h:loader': HElement<LoaderNode>;
    'h:ol': PropsWithChildren<HElement<ListNode>>;
    'h:ul': PropsWithChildren<HElement<ListNode>>;
    'h:li': PropsWithChildren<HElement<ListItemNode>>;
    'h:li-text': PropsWithChildren<HElement<ListItemTextNode>>;
    'h:paragraph': PropsWithChildren<HElement<ParagraphNode>>;
    'h:quote': PropsWithChildren<HElement<QuoteNode>>;
    'h:story-bookmark': HElement<StoryBookmarkNode>;
    'h:story-embed': HElement<StoryEmbedNode>;
    'h:video': HElement<VideoNode>;
    'h:table': PropsWithChildren<HElement<TableNode>>;
    'h:tr': PropsWithChildren<HElement<TableRowNode>>;
    'h:td': PropsWithChildren<HElement<TableCellNode>>;
}

declare global {
    namespace JSX {
        interface IntrinsicElements extends HElements {}
    }
}

const extensions = [
    BlockquoteExtension(),
    HeadingExtension(),
    InlineLinksExtension(),
    ListExtension(),
    TablesExtension(),
];

const creators: Record<keyof HElements, HyperscriptCreators[string]> = {
    editor: createEditorFactory(() => createEditor(createSlateEditor(), () => extensions)),
    'editor-pure': createEditorFactory(() => withReact(createSlateEditor())),
    'h:text': createText,
    'h-text': createText,
    'h:attachment': initCreator((props: AttachmentNode) =>
        createFileAttachment(props.file, props.description),
    ),
    'h:bookmark': initCreator((props: BookmarkNode) => createWebBookmark(props)),
    'h:contact': initCreator((props: ContactNode) => createPressContact(props.contact)),
    'h:coverage': initCreator((props: CoverageNode) => createCoverage(props.coverage.id, props)),
    'h:divider': initCreator(() => createDivider()),
    'h:embed': initCreator((props: EmbedNode) => createEmbed(props.oembed, props.url)),
    'h:gallery': initCreator((props: GalleryNode) => createGallery(props)),
    'h:h1': initCreator((props: HeadingNode) => createHeading({ ...props, type: 'heading-one' })),
    'h:h2': initCreator((props: HeadingNode) => createHeading({ ...props, type: 'heading-two' })),
    'h:html': initCreator((props: HtmlNode) => createHtmlBlock(props)),
    'h:image-candidate': initCreator((props: ImageCandidateNode) =>
        createImageCandidate(props.src, props.href),
    ),
    'h:image': initCreator((props: ImageNode) => createImage(props)),
    'h:loader': initCreator((props: LoaderNode) => createLoader(props)),
    'h:ol': initCreator((props: ListNode) => createList({ ...props, type: 'numbered-list' })),
    'h:ul': initCreator((props: ListNode) => createList({ ...props, type: 'bulleted-list' })),
    'h:li': initCreator((props: ListItemNode) => createListItem(props)),
    'h:li-text': initCreator((props: ListItemTextNode) => createListItemText(props)),
    'h:paragraph': initCreator((props: ParagraphNode) => createParagraph(props)),
    'h:quote': initCreator((props: QuoteNode) => createBlockquote(props)),
    'h:story-bookmark': initCreator((props: StoryBookmarkNode) => createStoryBookmark(props)),
    'h:story-embed': initCreator((props: StoryEmbedNode) => createStoryEmbed(props)),
    'h:video': initCreator((props: VideoNode) => createVideoBookmark(props)),
    'h:table': initCreator((props: TableNode) => createTableNode(props)),
    'h:tr': initCreator((props: TableRowNode) => createTableRowNode(props)),
    'h:td': initCreator((props: TableCellNode) => createTableCellNode(props)),
};

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
    creators,
});

function initCreator<T>(creator: (props: T) => T): HyperscriptCreators[string] {
    return (_, props, children) => {
        const propsWithChildren = children.length > 0 ? { ...props, children } : props;
        const node = creator(propsWithChildren as any);

        // In some creators uuid is not overridable and can be different from time to time
        if ('uuid' in node && 'uuid' in props) {
            (node as any).uuid = (props as any).uuid;
        }

        return node;
    };
}
