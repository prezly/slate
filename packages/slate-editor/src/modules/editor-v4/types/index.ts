import type { Events } from '@prezly/events';
import type { Alignment } from '@prezly/slate-types';
import type { CSSProperties, KeyboardEvent, ReactNode, RefObject } from 'react';
import type { Editor, Element } from 'slate';

import type { Theme } from '#modules/themes';

import type { AutoformatParameters } from '../../editor-v4-autoformat/types';
import type { CoverageExtensionParameters } from '../../editor-v4-coverage';
import type { EmbedExtensionParameters } from '../../editor-v4-embed/types';
import type { EditorEventMap } from '../../editor-v4-events';
import type { FileAttachmentExtensionParameters } from '../../editor-v4-file-attachment';
import type { Settings as FloatingAddMenuExtensionParameters } from '../../editor-v4-floating-add-menu';
import type { GalleriesExtensionParameters } from '../../editor-v4-galleries';
import type { ImageExtensionParameters } from '../../editor-v4-image';
import type { PlaceholderMentionsExtensionParameters } from '../../editor-v4-placeholder-mentions';
import type { PressContactsExtensionParameters } from '../../editor-v4-press-contacts';
import type { RichFormattingExtensionParameters } from '../../editor-v4-rich-formatting';
import type { UserMentionsExtensionParameters } from '../../editor-v4-user-mentions';
import type { VideoExtensionParameters } from '../../editor-v4-video/types';
import type { WebBookmarkExtensionParameters } from '../../editor-v4-web-bookmark/types';

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
    withEmbeds?: EmbedExtensionParameters;
    withGalleries?: GalleriesExtensionParameters;
    withImages?: ImageExtensionParameters;
    withPlaceholders?: PlaceholderMentionsExtensionParameters;
    withPressContacts?: PressContactsExtensionParameters;
    withRichFormatting?: RichFormattingExtensionParameters;
    withUserMentions?: UserMentionsExtensionParameters;
    withVideos?: VideoExtensionParameters;
    withWebBookmarks?: WebBookmarkExtensionParameters;
    withAutoformat?: boolean | AutoformatParameters;
}

export type Value = Element[];

export interface EditorV4Props extends EditorV4ExtensionsProps {
    align?: Alignment;
    autoFocus?: boolean;
    className?: string;
    contentStyle?: CSSProperties;
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
    toolbarsTheme?: Theme;
    value: Value;
    withAlignmentControls: boolean;
    withCursorInView?: {
        minBottom: number;
        minTop: number;
    };
    withEmbeds?: EditorV4ExtensionsProps['withEmbeds'] & EmbedParameters;
    withFloatingAddMenu?: FloatingAddMenuExtensionParameters;
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
