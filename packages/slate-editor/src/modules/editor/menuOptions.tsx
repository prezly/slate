import type { Editor } from 'slate';

import * as Icons from '#icons';

import type { Option } from '#extensions/floating-add-menu';
import { UploadcareEditor } from '#modules/uploadcare';

import type { EditorProps } from '#modules/editor/types';

export enum MenuAction {
    ADD_ATTACHMENT = 'add_attachment',
    ADD_CONTACT = 'add_contact',
    ADD_COVERAGE = 'add_coverage',
    ADD_DIVIDER = 'add_divider',
    ADD_TABLE = 'add_table',
    ADD_EMBED = 'add_embed',
    /**
     * @deprecated Will be replaced with `add_web_bookmark`
     */
    ADD_EMBED_LINK = 'add_embed_link',
    /**
     * @deprecated Will be replaced with `add_video`
     */
    ADD_EMBED_VIDEO = 'add_embed_video',
    ADD_EMBED_SOCIAL = 'add_embed_social',
    ADD_GALLERY = 'add_gallery',
    ADD_HEADING_1 = 'add_heading_1',
    ADD_HEADING_2 = 'add_heading_2',
    ADD_IMAGE = 'add_image',
    ADD_PARAGRAPH = 'add_paragraph',
    ADD_QUOTE = 'add_quote',
    ADD_VIDEO = 'add_video',
    ADD_WEB_BOOKMARK = 'add_web_bookmark',
    ADD_STORY_EMBED = 'add_story_embed',
    ADD_STORY_BOOKMARK = 'add_story_bookmark',
}

enum Group {
    BASICS = 'Basics',
    MEDIA_CONTENT = 'Media content',
    PREZLY_CONTENT = 'Prezly content',
}

type Params = Pick<
    EditorProps,
    | 'withAttachments'
    | 'withCoverage'
    | 'withEmbeds'
    | 'withGalleries'
    | 'withImages'
    | 'withPressContacts'
    | 'withRichFormatting'
    | 'withStoryEmbeds'
    | 'withStoryBookmarks'
    | 'withVideos'
    | 'withWebBookmarks'
>;

export function* generateFloatingAddMenuOptions(
    editor: Editor,
    {
        withAttachments,
        withCoverage,
        withEmbeds,
        withGalleries,
        withImages,
        withPressContacts,
        withRichFormatting,
        withStoryEmbeds,
        withStoryBookmarks,
        withVideos,
        withWebBookmarks,
    }: Params,
): Generator<Option<MenuAction>> {
    if (withRichFormatting && withRichFormatting.blocks) {
        yield {
            icon: Icons.ComponentH1,
            action: MenuAction.ADD_HEADING_1,
            group: Group.BASICS,
            text: 'Heading 1',
            description: 'Big section heading',
        };
        yield {
            icon: Icons.ComponentH2,
            action: MenuAction.ADD_HEADING_2,
            group: Group.BASICS,
            text: 'Heading 2',
            description: 'Medium section heading',
        };
    }

    yield {
        icon: Icons.ComponentText,
        action: MenuAction.ADD_PARAGRAPH,
        group: Group.BASICS,
        text: 'Text',
        description: 'Start writing plain text',
    };

    if (withRichFormatting?.blocks) {
        yield {
            icon: Icons.ComponentQuote,
            action: MenuAction.ADD_QUOTE,
            group: Group.BASICS,
            text: 'Quote',
            description: 'Highlighted text section',
        };
    }

    yield {
        icon: Icons.ComponentDivider,
        action: MenuAction.ADD_DIVIDER,
        group: Group.BASICS,
        text: 'Divider',
        description: 'Divide blocks with a line',
    };

    yield {
        action: MenuAction.ADD_TABLE,
        icon: Icons.ComponentStoryBookmark,
        group: Group.BASICS,
        text: 'Table',
        description: 'Add table',
        isBeta: true,
    };

    if (withImages && UploadcareEditor.isUploadcareEditor(editor)) {
        yield {
            action: MenuAction.ADD_IMAGE,
            icon: Icons.ComponentImage,
            group: Group.MEDIA_CONTENT,
            text: 'Image',
            description: 'Place an image',
        };
    }

    if (withGalleries && UploadcareEditor.isUploadcareEditor(editor)) {
        yield {
            action: MenuAction.ADD_GALLERY,
            icon: Icons.ComponentGallery,
            group: Group.MEDIA_CONTENT,
            text: 'Gallery',
            description: 'Create an image composition',
        };
    }

    if (withVideos) {
        yield {
            action: MenuAction.ADD_VIDEO,
            icon: Icons.ComponentVideo,
            group: Group.MEDIA_CONTENT,
            text: 'Video',
            description: 'Place a video from a URL',
        };
    }

    if (withEmbeds?.menuOptions?.socialPost) {
        yield {
            action: MenuAction.ADD_EMBED_SOCIAL,
            icon: Icons.ComponentSocialPost,
            group: Group.MEDIA_CONTENT,
            text: 'Social post',
            description: 'Insert a social media URL',
            isBeta: true,
        };
    }

    if (withAttachments && UploadcareEditor.isUploadcareEditor(editor)) {
        yield {
            action: MenuAction.ADD_ATTACHMENT,
            icon: Icons.ComponentAttachment,
            group: Group.MEDIA_CONTENT,
            text: 'File Attachment',
            description: 'Insert an attachment',
        };
    }

    if (withWebBookmarks) {
        yield {
            action: MenuAction.ADD_WEB_BOOKMARK,
            icon: Icons.ComponentWebBookmark,
            group: Group.MEDIA_CONTENT,
            text: 'Website bookmark',
            description: 'Insert a website bookmark',
            isNew: true,
        };
    }

    if (withEmbeds?.menuOptions?.embed) {
        yield {
            action: MenuAction.ADD_EMBED,
            icon: Icons.ComponentEmbed,
            group: Group.MEDIA_CONTENT,
            text: 'Embed',
            description: 'Insert embedded content',
            isBeta: true,
        };
    }

    if (withCoverage) {
        yield {
            action: MenuAction.ADD_COVERAGE,
            icon: Icons.ComponentCoverage,
            group: Group.PREZLY_CONTENT,
            text: 'Coverage',
            description: 'Add a link to a Prezly Coverage',
        };
    }

    if (withPressContacts) {
        yield {
            action: MenuAction.ADD_CONTACT,
            icon: Icons.ComponentContact,
            group: Group.PREZLY_CONTENT,
            text: 'Contact',
            description: 'Add your newsroom contacts',
        };
    }

    if (withStoryEmbeds) {
        yield {
            action: MenuAction.ADD_STORY_EMBED,
            icon: Icons.ComponentWebBookmark,
            group: Group.PREZLY_CONTENT,
            text: 'Story Embed',
            description: 'Insert Prezly story content',
            isBeta: true,
        };
    }

    if (withStoryBookmarks) {
        yield {
            action: MenuAction.ADD_STORY_BOOKMARK,
            icon: Icons.ComponentStoryBookmark,
            group: Group.PREZLY_CONTENT,
            text: 'Story bookmark',
            description: 'Embed your Prezly content',
            isBeta: true,
        };
    }

    /*
     * Intentionally not included:
     * - MenuAction.ADD_EMBED_VIDEO
     * - MenuAction.ADD_EMBED_LINK
     */
}
