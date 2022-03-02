import classNames from 'classnames';
import React from 'react';
import type { Editor } from 'slate';

import * as Icons from '#icons';

import type { Option } from '#modules/editor-v4-floating-add-menu';
import { Variant } from '#modules/editor-v4-floating-add-menu';
import { UploadcareEditor } from '#modules/editor-v4-uploadcare';

import type { EditorV4Props } from '#modules/editor-v4/types';

export enum MenuAction {
    ADD_ATTACHMENT = 'add_attachment',
    ADD_CONTACT = 'add_contact',
    ADD_COVERAGE = 'add_coverage',
    ADD_DIVIDER = 'add_divider',
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
}

enum Group {
    BASICS = 'Basics',
    MEDIA_CONTENT = 'Media content',
    PREZLY_CONTENT = 'Prezly content',
}

type Params = Pick<
    EditorV4Props,
    | 'withAttachments'
    | 'withCoverage'
    | 'withEmbeds'
    | 'withGalleries'
    | 'withImages'
    | 'withPressContacts'
    | 'withRichFormatting'
    | 'withStoryEmbeds'
    | 'withVideos'
    | 'withWebBookmarks'
>;

export function generateFloatingAddMenuOptions(
    editor: Editor,
    params: Params,
    variant: Variant,
): Generator<Option<MenuAction>> {
    if (variant === Variant.CLASSIC) {
        return generateClassicMenuOptions(editor, params);
    }
    return generateModernMenuOptions(editor, params);
}

function* generateModernMenuOptions(
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

    if (withEmbeds?.menuOptions.socialPost) {
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
            text: 'Attachment',
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

    if (withEmbeds?.menuOptions.embed) {
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

    /*
     * Intentionally not included:
     * - MenuAction.ADD_EMBED_VIDEO
     * - MenuAction.ADD_EMBED_LINK
     */
}

function* generateClassicMenuOptions(
    editor: Editor,
    {
        withAttachments,
        withCoverage,
        withEmbeds,
        withGalleries,
        withImages,
        withPressContacts,
        withVideos,
        withWebBookmarks,
    }: Params,
): Generator<Option<MenuAction>> {
    if (withImages && UploadcareEditor.isUploadcareEditor(editor)) {
        yield {
            icon: <i className="icon icon-camera2" />,
            action: MenuAction.ADD_IMAGE,
            text: 'Add image',
        };
    }

    if (withGalleries && UploadcareEditor.isUploadcareEditor(editor)) {
        yield {
            action: MenuAction.ADD_GALLERY,
            icon: <i className="icon icon-images2" />,
            text: 'Add gallery',
        };
    }

    if (withWebBookmarks) {
        yield {
            action: MenuAction.ADD_WEB_BOOKMARK,
            icon: <i className={classNames('icon', 'icon-news')} />,
            text: 'Add web bookmark',
            isNew: true,
        };
    }

    if (withVideos) {
        yield {
            action: MenuAction.ADD_VIDEO,
            icon: <i className={classNames('icon', 'icon-play2')} />,
            text: 'Add video',
            isNew: true,
        };
    }

    if (!withVideos && withEmbeds?.menuOptions.video) {
        yield {
            action: MenuAction.ADD_EMBED_VIDEO,
            icon: <i className={classNames('icon', 'icon-play2')} />,
            text: 'Add video',
        };
    }

    if (withEmbeds?.menuOptions.socialPost) {
        yield {
            action: MenuAction.ADD_EMBED_SOCIAL,
            icon: <i className={classNames('icon', 'icon-chat')} />,
            text: 'Add social post',
            isBeta: true,
        };
    }

    if (!withWebBookmarks && withEmbeds?.menuOptions.link) {
        yield {
            action: MenuAction.ADD_EMBED_LINK,
            icon: <Icons.Link className="editor-v4__floating-add-menu-icon" />,
            text: 'Add link',
            isBeta: true,
        };
    }

    if (withEmbeds?.menuOptions.embed) {
        yield {
            action: MenuAction.ADD_EMBED,
            isBeta: true,
            icon: <i className={classNames('icon', 'icon-news')} />,
            text: 'Add embed',
        };
    }

    if (withAttachments && UploadcareEditor.isUploadcareEditor(editor)) {
        yield {
            action: MenuAction.ADD_ATTACHMENT,
            icon: Icons.FilesEmpty2,
            text: 'Add attachment',
        };
    }

    yield {
        action: MenuAction.ADD_DIVIDER,
        icon: Icons.DotsThreeHorizontal,
        text: 'Add divider',
    };

    if (withPressContacts) {
        yield {
            action: MenuAction.ADD_CONTACT,
            icon: Icons.User,
            text: 'Add contact',
        };
    }

    if (withCoverage) {
        yield {
            action: MenuAction.ADD_COVERAGE,
            icon: Icons.Coverage,
            text: 'Add coverage',
        };
    }
}
