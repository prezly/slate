import classNames from 'classnames';
import React from 'react';
import type { Editor } from 'slate';

import { Coverage, DotsThreeHorizontal, FilesEmpty2, Link, User } from '#icons';

import type { Option } from '#modules/editor-v4-floating-add-menu';
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
    ADD_IMAGE = 'add_image',
    ADD_VIDEO = 'add_video',
    ADD_WEB_BOOKMARK = 'add_web_bookmark',
}

type Params = Pick<
    EditorV4Props,
    | 'withAttachments'
    | 'withCoverage'
    | 'withEmbeds'
    | 'withGalleries'
    | 'withImages'
    | 'withPressContacts'
    | 'withVideos'
    | 'withWebBookmarks'
>;

export function* generateFloatingAddMenuOptions(editor: Editor, {
    withAttachments,
    withCoverage,
    withEmbeds,
    withGalleries,
    withImages,
    withPressContacts,
    withVideos,
    withWebBookmarks,
}: Params): Generator<Option<MenuAction>> {
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
            beta: true,
            icon: <i className={classNames('icon', 'icon-news')} />,
            text: 'Add web bookmark (new)',
        };
    }

    if (withVideos) {
        yield {
            action: MenuAction.ADD_VIDEO,
            beta: true,
            icon: <i className={classNames('icon', 'icon-play2')} />,
            text: 'Add video (new)',
        };
    }

    if (withEmbeds?.menuOptions.video) {
        yield {
            action: MenuAction.ADD_EMBED_VIDEO,
            icon: <i className={classNames('icon', 'icon-play2')} />,
            text: 'Add video',
        };
    }

    if (withEmbeds?.menuOptions.socialPost) {
        yield {
            action: MenuAction.ADD_EMBED_SOCIAL,
            beta: true,
            icon: <i className={classNames('icon', 'icon-chat')} />,
            text: 'Add social post',
        };
    }

    if (withEmbeds?.menuOptions.link) {
        yield {
            action: MenuAction.ADD_EMBED_LINK,
            beta: true,
            icon: <Link className="editor-v4__floating-add-menu-icon" />,
            text: 'Add link',
        };
    }

    if (withEmbeds?.menuOptions.embed) {
        yield {
            action: MenuAction.ADD_EMBED,
            beta: true,
            icon: <i className={classNames('icon', 'icon-news')} />,
            text: 'Add embed',
        };
    }

    if (withAttachments && UploadcareEditor.isUploadcareEditor(editor)) {
        yield {
            action: MenuAction.ADD_ATTACHMENT,
            icon: <FilesEmpty2 className="editor-v4__floating-add-menu-icon" />,
            text: 'Add attachment',
        };
    }

    yield {
        action: MenuAction.ADD_DIVIDER,
        icon: <DotsThreeHorizontal className="editor-v4__floating-add-menu-icon" />,
        text: 'Add divider',
    };

    if (withPressContacts) {
        yield {
            action: MenuAction.ADD_CONTACT,
            icon: <User className="editor-v4__floating-add-menu-icon" />,
            text: 'Add contact',
        };
    }

    if (withCoverage) {
        yield {
            action: MenuAction.ADD_COVERAGE,
            icon: <Coverage className="editor-v4__floating-add-menu-icon" />,
            text: 'Add coverage',
        };
    }
}
