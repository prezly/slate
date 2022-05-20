import type { Events } from '@prezly/events';
import type { Decorate } from '@prezly/slate-commons';
import type { Alignment } from '@prezly/slate-types';
import type { CSSProperties, KeyboardEvent, ReactNode, RefObject } from 'react';
import type { Editor, Element } from 'slate';

import type { AutoformatParameters } from '#extensions/editor-v4-autoformat';
import type { CoverageExtensionParameters } from '#extensions/editor-v4-coverage';
import type { EmbedExtensionConfiguration } from '#extensions/editor-v4-embed';
import type { FileAttachmentExtensionParameters } from '#extensions/editor-v4-file-attachment';
import type { Settings as FloatingAddMenuExtensionParameters } from '#extensions/editor-v4-floating-add-menu';
import type { GalleriesExtensionParameters } from '#extensions/editor-v4-galleries';
import type { ImageExtensionParameters } from '#extensions/editor-v4-image';
import type { PlaceholderMentionsExtensionParameters } from '#extensions/editor-v4-placeholder-mentions';
import type { PressContactsExtensionParameters } from '#extensions/editor-v4-press-contacts';
import type { StoryBookmarkExtensionParameters } from '#extensions/editor-v4-story-bookmark';
import type { StoryEmbedExtensionParameters } from '#extensions/editor-v4-story-embed';
import type { UserMentionsExtensionParameters } from '#extensions/editor-v4-user-mentions';
import type { VideoExtensionParameters } from '#extensions/editor-v4-video';
import type { WebBookmarkExtensionParameters } from '#extensions/editor-v4-web-bookmark';
import type { EditorEventMap } from '#modules/editor-v4-events';

export interface EditorRef {
    events: Events<EditorEventMap>;
    focus: () => void;
    isEmpty: () => boolean;
    isFocused: () => boolean;
    isValueEquivalentTo: (otherValue: string) => boolean;
}

export interface EditorV4ExtensionsProps {
    availableWidth: number;
    withAttachments?: FileAttachmentExtensionParameters;
    withCoverage?: CoverageExtensionParameters;
    withEmbeds?: EmbedExtensionConfiguration;
    withFloatingAddMenu?: FloatingAddMenuExtensionParameters;
    withGalleries?: GalleriesExtensionParameters;
    withImages?: ImageExtensionParameters;
    withPlaceholders?: PlaceholderMentionsExtensionParameters;
    withPressContacts?: PressContactsExtensionParameters;
    withRichFormatting?: {
        menu?: boolean;
        blocks?: boolean;
        links?: boolean;
        withNewTabOption?: boolean;
    };
    withUserMentions?: UserMentionsExtensionParameters;
    withVideos?: VideoExtensionParameters;
    withWebBookmarks?: WebBookmarkExtensionParameters;
    withAutoformat?: boolean | AutoformatParameters;
    withStoryEmbeds?: StoryEmbedExtensionParameters;
    withStoryBookmarks?: StoryBookmarkExtensionParameters;
}

export type Value = Element[];

export interface EditorV4Props extends EditorV4ExtensionsProps {
    align?: Alignment;
    autoFocus?: boolean;
    className?: string;
    contentStyle?: CSSProperties;
    decorate?: Decorate;
    editorRef?: RefObject<EditorRef>;
    onChange: (value: Value) => void;
    onIsOperationPendingChange?: (isOperationPending: boolean) => void;
    onKeyDown?: (event: KeyboardEvent) => void;
    placeholder?: ReactNode;
    /**
     * [WARNING] this prop is read by EditorV4 only once, when mounting.
     * Any changes to it will be ignored.
     */
    plugins?: (<T extends Editor>(editor: T) => T)[];
    readOnly?: boolean;
    style?: CSSProperties;
    value: Value;
    withAlignmentControls: boolean;
    withCursorInView?: {
        minBottom: number;
        minTop: number;
    };
    withEmbeds?: EditorV4ExtensionsProps['withEmbeds'] & EmbedParameters;
}

interface EmbedParameters {
    menuOptions: {
        embed?: boolean;
        link?: boolean;
        socialPost?: boolean;
        video?: boolean;
    };
}

export * from './Fragment';
