import { Descendant, Editor } from 'slate';
import Events from '@prezly/events';
import { BlockNode, isBlockNode } from '@prezly/slate-types';
import { CSSProperties, KeyboardEvent, ReactNode, RefObject } from 'react';

import { CoverageExtensionParameters } from '../../../modules/editor-v4-coverage';
import { EmbedExtensionParameters } from '../../../modules/editor-v4-embed/types';
import { EditorEventMap } from '../../../modules/editor-v4-events';
import { FileAttachmentExtensionParameters } from '../../../modules/editor-v4-file-attachment';
import { FloatingAddMenuExtensionParameters } from '../../../modules/editor-v4-floating-add-menu';
import { GalleriesExtensionParameters } from '../../../modules/editor-v4-galleries';
import {
    ImageExtensionParameters,
    isImageCandidateElement,
} from '../../../modules/editor-v4-image';
import { PlaceholderMentionsExtensionParameters } from '../../../modules/editor-v4-placeholder-mentions';
import { PressContactsExtensionParameters } from '../../../modules/editor-v4-press-contacts';
import {
    isLinkCandidateElement,
    RichFormattingExtensionParameters,
} from '../../../modules/editor-v4-rich-formatting';
import { UserMentionsExtensionParameters } from '../../../modules/editor-v4-user-mentions';
import { LinkCandidateElementType } from '../../editor-v4-rich-formatting/types';
import { isLoaderElement, LoaderElementType } from '../../editor-v4-loader';
import { ImageCandidateElementType } from '../../editor-v4-image/types';

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
}

export type Value = (
    | BlockNode
    | LinkCandidateElementType
    | ImageCandidateElementType
    | LoaderElementType
)[];

export function isValue(value: Descendant[]): value is Value {
    return value.every(
        (node) =>
            isBlockNode(node) ||
            isLinkCandidateElement(node) ||
            isImageCandidateElement(node) ||
            isLoaderElement(node),
    );
}

export interface EditorV4Props extends EditorV4ExtensionsProps {
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
    value: Value;
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

export { default as Fragment, isFragment } from './Fragment';
