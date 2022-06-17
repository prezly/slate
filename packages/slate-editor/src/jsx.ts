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
    ParagraphNode,
    QuoteNode,
    StoryBookmarkNode,
    StoryEmbedNode,
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
import type { ReactNode } from 'react';
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
import { ListExtension } from '#extensions/list';
import type { LoaderNode } from '#extensions/loader';
import { createLoader } from '#extensions/loader';
import { createParagraph } from '#extensions/paragraphs';
import { createPressContact } from '#extensions/press-contacts';
import { createStoryBookmark } from '#extensions/story-bookmark';
import { createStoryEmbed } from '#extensions/story-embed';
import { createVideoBookmark } from '#extensions/video';
import { createWebBookmark } from '#extensions/web-bookmark';
import { createEditor } from '#modules/editor';

type JsxElement<T extends ElementNode> = Omit<T, 'type' | 'children'> & { children?: ReactNode };

declare global {
    namespace JSX {
        interface IntrinsicElements {
            editor: { children?: ReactNode };
            'editor-pure': { children?: ReactNode };
            attachment: JsxElement<AttachmentNode>;
            bookmark: JsxElement<BookmarkNode>;
            contact: JsxElement<ContactNode>;
            coverage: JsxElement<CoverageNode>;
            divider: JsxElement<DividerNode>;
            'embed-node': JsxElement<EmbedNode>;
            gallery: JsxElement<GalleryNode>;
            'h:h1': JsxElement<HeadingNode>;
            'h:h2': JsxElement<HeadingNode>;
            'h:html': JsxElement<HtmlNode>;
            'h:image-candidate': JsxElement<ImageCandidateNode>;
            'h:image': JsxElement<ImageNode>;
            'h:loader': JsxElement<LoaderNode>;
            'h:paragraph': JsxElement<ParagraphNode>;
            'h:quote': JsxElement<QuoteNode>;
            'h:story-bookmark': JsxElement<StoryBookmarkNode>;
            'h:story-embed': JsxElement<StoryEmbedNode>;
            'h:video': JsxElement<VideoNode>;
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
        divider: initCreator(() => createDivider()),
        'embed-node': initCreator((props: EmbedNode) => createEmbed(props.oembed, props.url)),
        gallery: initCreator((props: GalleryNode) => createGallery(props)),
        'h:h1': initCreator((props: HeadingNode) =>
            createHeading({ ...props, type: 'heading-one' }),
        ),
        'h:h2': initCreator((props: HeadingNode) =>
            createHeading({ ...props, type: 'heading-two' }),
        ),
        'h:html': initCreator((props: HtmlNode) => createHtmlBlock(props)),
        'h:image-candidate': initCreator((props: ImageCandidateNode) =>
            createImageCandidate(props.src, props.href),
        ),
        'h:image': initCreator((props: ImageNode) => createImage(props)),
        'h:loader': initCreator((props: LoaderNode) => createLoader(props)),
        'h:paragraph': initCreator((props: ParagraphNode) => createParagraph(props)),
        'h:quote': initCreator((props: QuoteNode) => createBlockquote(props)),
        'h:story-bookmark': initCreator((props: StoryBookmarkNode) => createStoryBookmark(props)),
        'h:story-embed': initCreator((props: StoryEmbedNode) => createStoryEmbed(props)),
        'h:video': initCreator((props: VideoNode) => createVideoBookmark(props)),
        'h-text': createText,
    },
});

function initCreator<T>(creator: (props: T) => T): HyperscriptCreators[string] {
    return (_, props, children) => {
        const node = creator({ ...props, children } as any);

        // In some creators uuid is not overridable and can different from time to time
        if ('uuid' in node && 'uuid' in props) {
            (node as any).uuid = (props as any).uuid;
        }

        return node;
    };
}
