import type { Events } from '@prezly/events';
import type { Decorate } from '@prezly/slate-commons';
import type { Alignment } from '@prezly/slate-types';
import type { CSSProperties, KeyboardEvent, ReactNode, RefObject } from 'react';
import type { Editor, Element } from 'slate';

import type { AutoformatParameters } from '#extensions/autoformat';
import type { CoverageExtensionConfiguration } from '#extensions/coverage';
import type { EmbedExtensionConfiguration } from '#extensions/embed';
import type { Settings as FloatingAddMenuExtensionParameters } from '#extensions/floating-add-menu';
import type { GalleriesExtensionConfiguration } from '#extensions/galleries';
import type { ImageExtensionConfiguration } from '#extensions/image';
import type { PlaceholderMentionsExtensionParameters } from '#extensions/placeholder-mentions';
import type { PressContactsExtensionParameters } from '#extensions/press-contacts';
import type { StoryBookmarkExtensionParameters } from '#extensions/story-bookmark';
import type { StoryEmbedExtensionParameters } from '#extensions/story-embed';
import type { UserMentionsExtensionParameters } from '#extensions/user-mentions';
import type { VideoExtensionParameters } from '#extensions/video';
import type { WebBookmarkExtensionParameters } from '#extensions/web-bookmark';
import type { EditorEventMap } from '#modules/events';

import type { useCursorInView } from '../lib';

export interface EditorRef {
    events: Events<EditorEventMap>;
    focus: () => void;
    isEmpty: () => boolean;
    isFocused: () => boolean;
    isValueEquivalentTo: (otherValue: string) => boolean;
}

export type Value = Element[];

export interface EditorProps {
    // Content area properties
    availableWidth: number;
    /**
     * Implied alignment for editor content (default: 'left')
     */
    contentAlignment?: Alignment;
    /**
     * Override content column max width (default: `availableWidth`)
     * @see availableWidth
     */
    contentMaxWidth?: number;
    /**
     * Override default alignment for block elements (default: `contentAlignment`)
     * @see contentAlignment
     */
    blockAlignment?: Alignment;
    /**
     * Override content column max width for block elements (default: `contentMaxWidth`)
     * @see contentMaxWidth
     */
    blockMaxWidth?: number;

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
    withAttachments?: boolean;
    withAutoformat?: boolean | AutoformatParameters;
    withCoverage?: CoverageExtensionConfiguration;
    withCursorInView?: Parameters<typeof useCursorInView>[1];
    withEmbeds?: EmbedExtensionConfiguration & {
        menuOptions?: {
            embed?: boolean;
            link?: boolean;
            socialPost?: boolean;
            video?: boolean;
        };
    };
    withFloatingAddMenu?: FloatingAddMenuExtensionParameters;
    withGalleries?: GalleriesExtensionConfiguration;
    withImages?: ImageExtensionConfiguration;
    withPlaceholders?: PlaceholderMentionsExtensionParameters;
    withPressContacts?: PressContactsExtensionParameters;
    withRichFormatting?: {
        menu?: boolean;
        blocks?: boolean;
        links?: boolean;
        withNewTabOption?: boolean;
    };
    withStoryBookmarks?: StoryBookmarkExtensionParameters;
    withStoryEmbeds?: StoryEmbedExtensionParameters;
    withUserMentions?: UserMentionsExtensionParameters;
    withVideos?: VideoExtensionParameters;
    withWebBookmarks?: WebBookmarkExtensionParameters;
}

export * from './Fragment';
