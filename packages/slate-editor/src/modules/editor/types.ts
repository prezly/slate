import type { Events } from '@prezly/events';
import type { Decorate, EditorCommands } from '@prezly/slate-commons';
import type { Alignment } from '@prezly/slate-types';
import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';
import type { Editor, Element, Node } from 'slate';
import type { Transforms } from 'slate';

import type { AutoformatParameters } from '#extensions/autoformat';
import type { CoverageExtensionConfiguration } from '#extensions/coverage';
import type { EmbedExtensionConfiguration } from '#extensions/embed';
import type { ExtensionConfiguration as FloatingAddMenuExtensionConfiguration } from '#extensions/floating-add-menu';
import type { GalleriesExtensionConfiguration } from '#extensions/galleries';
import type { ImageExtensionConfiguration } from '#extensions/image';
import type { PressContactsExtensionParameters } from '#extensions/press-contacts';
import type { StoryBookmarkExtensionParameters } from '#extensions/story-bookmark';
import type { StoryEmbedExtensionParameters } from '#extensions/story-embed';
import type { UserMentionsExtensionParameters } from '#extensions/user-mentions';
import type { VariablesExtensionParameters } from '#extensions/variables';
import type { VideoExtensionParameters } from '#extensions/video';
import type { WebBookmarkExtensionParameters } from '#extensions/web-bookmark';
import type { EditorEventMap } from '#modules/events';

import type { useCursorInView } from './lib';
import type { SnippetsExtensionParameters } from '#extensions/snippet';

export interface EditorRef {
    events: Events<EditorEventMap>;
    focus: () => void;
    clearSelection: () => void;
    insertNodes: (
        nodes: Node[],
        options?: Parameters<typeof EditorCommands.insertNodes>[2],
    ) => void;
    updateNodes: <T extends Node>(
        props: Partial<Omit<T, 'children' | 'text'>>,
        options?: Parameters<typeof Transforms.setNodes<T>>[2],
    ) => void;
    isEmpty: () => boolean;
    isEqualTo: (value: Value) => void;
    isFocused: () => boolean;
    /**
     * Check if the editor value is different from the `initialValue` document.
     */
    isModified: () => boolean;
    resetValue: (value: Value) => void;
}

export type Value = Element[];

export interface EditorProps {
    align?: Alignment;
    autoFocus?: boolean;
    availableWidth?: number;
    className?: string;
    contentStyle?: CSSProperties;
    decorate?: Decorate;
    id?: string;
    initialValue: Value;
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
    withAlignmentControls: boolean;
    withAttachments?: boolean;
    withAutoformat?: boolean | AutoformatParameters;
    withBlockquotes?: boolean;
    withCoverage?: false | CoverageExtensionConfiguration;
    withCursorInView?: false | Parameters<typeof useCursorInView>[1];
    withDivider?: boolean;
    withEmbeds?:
        | false
        | (EmbedExtensionConfiguration & {
              menuOptions?: {
                  embed?: boolean;
                  link?: boolean;
                  socialPost?: boolean;
                  video?: boolean;
              };
          });
    withEntryPointsAroundBlocks?: boolean;
    withFloatingAddMenu?: boolean | FloatingAddMenuExtensionConfiguration;
    withGalleries?: false | GalleriesExtensionConfiguration;
    withHeadings?: boolean;
    withImages?: false | ImageExtensionConfiguration;
    withInlineLinks?: boolean;
    withLists?: boolean;
    withPressContacts?: false | PressContactsExtensionParameters;
    withRichFormattingMenu?:
        | boolean
        | {
              withNewTabOption?: boolean;
          };
    withStoryBookmarks?: false | StoryBookmarkExtensionParameters;
    withStoryEmbeds?: false | StoryEmbedExtensionParameters;
    withSnippets?: false | SnippetsExtensionParameters;
    withTables?: boolean;
    withTextStyling?: boolean;
    withUserMentions?: false | UserMentionsExtensionParameters;
    withVariables?: false | VariablesExtensionParameters;
    withVideos?: false | VideoExtensionParameters;
    withWebBookmarks?: false | WebBookmarkExtensionParameters;
}
