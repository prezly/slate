/* eslint-disable react/display-name */
import { Events } from '@prezly/events';
import { EditorCommands } from '@prezly/slate-commons';
import { TablesEditor } from '@prezly/slate-tables';
import type { HeadingNode, ParagraphNode, QuoteNode } from '@prezly/slate-types';
import {
    Alignment,
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
    PARAGRAPH_NODE_TYPE,
    QUOTE_NODE_TYPE,
} from '@prezly/slate-types';
import { noop } from '@technically/lodash';
import { Plate } from '@udecode/plate-common/react';
import { isEditorFocused } from '@udecode/slate-react';
import classNames from 'classnames';
import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';

import { useFunction, useGetSet, useSize } from '#lib';

import { insertButtonBlock } from '#extensions/button-block';
import { insertCallout } from '#extensions/callout';
import { FloatingAddMenu, type Option } from '#extensions/floating-add-menu';
import {
    insertPlaceholder,
    PlaceholderNode,
    PlaceholdersManager,
    replacePlaceholder,
} from '#extensions/placeholders';
import { useFloatingSnippetInput } from '#extensions/snippet';
import { UserMentionsDropdown, useUserMentions } from '#extensions/user-mentions';
import { useVariables, VariablesDropdown } from '#extensions/variables';
import { FloatingSnippetInput, Placeholder } from '#modules/components';
import { DecorationsProvider } from '#modules/decorations';
import { EditableWithExtensions } from '#modules/editable';
import type { EditorEventMap } from '#modules/events';
import { EventsEditor } from '#modules/events';
import { PopperOptionsContext } from '#modules/popper-options-context';
import { RichFormattingMenu, toggleBlock } from '#modules/rich-formatting-menu';

import styles from './Editor.module.scss';
import { getEnabledExtensions } from './getEnabledExtensions';
import { InitialNormalization } from './InitialNormalization';
import {
    createOnCut,
    insertDivider,
    insertTable,
    isEditorValueEqual,
    useCursorInView,
} from './lib';
import { generateFloatingAddMenuOptions, MenuAction } from './menuOptions';
import type { EditorProps, EditorRef, Value } from './types';
import { useCreateEditor } from './useCreateEditor';
import { useOnChange } from './useOnChange';

export const Editor = forwardRef<EditorRef, EditorProps>((props, forwardedRef) => {
    const {
        align = Alignment.LEFT,
        availableWidth: declaredAvailableWidth,
        autoFocus,
        className,
        contentStyle,
        decorate,
        id,
        initialValue: externalInitialValue,
        blurOnOutsideClick = false,
        onKeyDown = noop,
        placeholder,
        plugins,
        popperMenuOptions = {},
        readOnly,
        style,
        withAlignmentControls,
        withAllowedBlocks = false,
        withAttachments = false,
        withAutoformat = false,
        withBlockquotes = false,
        withButtonBlocks = false,
        withCallouts = false,
        withCoverage = false,
        withCursorInView = false,
        withCustomNormalization = false,
        withDivider = false,
        withEmbeds = false,
        withEntryPointsAroundBlocks = false,
        withFloatingAddMenu = false,
        withGalleries = false,
        withGalleryBookmarks = false,
        withHeadings = false,
        withImages = false,
        withInlineContacts = false,
        withInlineLinks = false,
        withLists = false,
        withPlaceholders = {},
        withPressContacts = false,
        withRichFormattingMenu = false,
        withStoryBookmarks = false,
        withStoryEmbeds = false,
        withSnippets = false,
        withTextHighlight = false,
        withTextStyling = false,
        withTables = false,
        withUserMentions = false,
        withVariables = false,
        withVideos = false,
        withWebBookmarks = false,
    } = props;

    const [sizer, { width: availableWidth }] = useSize(
        () => <div className="editor-sizer" contentEditable={false} />,
        { width: declaredAvailableWidth },
    );

    const events = useMemo(() => new Events<EditorEventMap>(), []);
    const containerRef = useRef<HTMLDivElement>(null);

    // TODO: Wire `onOperationStart` and `onOperationEnd` to the Placeholder extension
    // const { onOperationEnd, onOperationStart } = usePendingOperation(onIsOperationPendingChange);

    // [+] menu
    const [isFloatingAddMenuOpen, setFloatingAddMenuOpen] = useState(false);
    const onFloatingAddMenuToggle = useCallback(
        function (shouldOpen: boolean, trigger: 'click' | 'hotkey' | 'input') {
            setFloatingAddMenuOpen(shouldOpen);
            if (shouldOpen) {
                EventsEditor.dispatchEvent(editor, 'add-button-menu-opened', { trigger });
            } else {
                EventsEditor.dispatchEvent(editor, 'add-button-menu-closed');
            }
        },
        [setFloatingAddMenuOpen],
    );

    const extensions = useMemo(
        () =>
            Array.from(
                getEnabledExtensions({
                    align,
                    availableWidth,
                    onFloatingAddMenuToggle,
                    withAllowedBlocks,
                    withAttachments,
                    withAutoformat,
                    withBlockquotes,
                    withButtonBlocks,
                    withCallouts,
                    withCoverage,
                    withCustomNormalization,
                    withDivider,
                    withEmbeds,
                    withFloatingAddMenu,
                    withGalleries,
                    withGalleryBookmarks,
                    withHeadings,
                    withImages,
                    withInlineContacts,
                    withInlineLinks,
                    withLists,
                    withPlaceholders,
                    withPressContacts,
                    withTextStyling,
                    withTables,
                    withUserMentions,
                    withVariables,
                    withVideos,
                    withWebBookmarks,
                    withStoryEmbeds,
                    withStoryBookmarks,
                    withSnippets,
                }),
            ),
        [
            align,
            availableWidth,
            onFloatingAddMenuToggle,
            withAllowedBlocks,
            withAttachments,
            withAutoformat,
            withBlockquotes,
            withButtonBlocks,
            withCallouts,
            withCoverage,
            withCustomNormalization,
            withDivider,
            withEmbeds,
            withFloatingAddMenu,
            withGalleries,
            withGalleryBookmarks,
            withHeadings,
            withImages,
            withInlineContacts,
            withInlineLinks,
            withLists,
            withPlaceholders,
            withPressContacts,
            withTextStyling,
            withTables,
            withUserMentions,
            withVariables,
            withVideos,
            withWebBookmarks,
            withStoryEmbeds,
            withStoryBookmarks,
            withSnippets,
        ],
    );

    const [getInitialValue, setInitialValue] = useGetSet(() =>
        EditorCommands.roughlyNormalizeValue(externalInitialValue),
    );

    const { editor, onKeyDownList } = useCreateEditor({
        events,
        extensions,
        initialValue: getInitialValue(),
        onKeyDown,
        plugins,
    });

    useEffect(() => {
        if (autoFocus) {
            EditorCommands.focus(editor);
        }
    }, [autoFocus, editor]);

    useEffect(() => {
        if (!blurOnOutsideClick) {
            return noop;
        }

        let isMousePressedOutside = false;

        function handleOutsideClick(event: MouseEvent) {
            isMousePressedOutside = false;

            const clickTarget = event.target as HTMLElement | null;

            if (!clickTarget) {
                return;
            }

            function isTargetWithin(container: HTMLElement | null | undefined) {
                return container && (container === clickTarget || container.contains(clickTarget));
            }

            const isWithinMenuPortal = isTargetWithin(popperMenuOptions.portalNode?.current);
            const isWithinEditor = isTargetWithin(containerRef.current);

            // Due to how blur logic works in slate, click events happening on textbox elements (textarea, input) are ignored to prevent issues with their own focus.
            const isTextboxElement =
                clickTarget.tagName.toLowerCase() === 'textarea' ||
                clickTarget.tagName.toLowerCase() === 'input';

            // Placeholder and some other elements (like link button in the text toolbar) get re-rendered on click, removing the original clicked element out of the DOM.
            // In this case, we don't want to blur the editor.
            const isRemovedFromDom = !document.contains(clickTarget);

            const isMouseOutside =
                !isWithinEditor && !isWithinMenuPortal && !isTextboxElement && !isRemovedFromDom;

            if (event.type === 'mousedown') {
                isMousePressedOutside = isMouseOutside;
            }

            if (
                event.type === 'click' &&
                isMouseOutside &&
                isMousePressedOutside &&
                !EditorCommands.isCursorInEmptyParagraph(editor)
            ) {
                EditorCommands.blur(editor);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [blurOnOutsideClick, editor, popperMenuOptions]);

    useCursorInView(editor, withCursorInView || false);

    useImperativeHandle(
        forwardedRef,
        (): EditorRef => ({
            events,
            blur: () => EditorCommands.blur(editor),
            focus: () => EditorCommands.focus(editor),
            clearSelection: () => EditorCommands.resetSelection(editor),
            insertNodes: (nodes, options) => EditorCommands.insertNodes(editor, nodes, options),
            updateNodes: (props, options = {}) => {
                editor.setNodes(props, options.match ? { at: [], ...options } : options);
            },
            insertPlaceholder(props, ensureEmptyParagraphAfter) {
                return insertPlaceholder(editor, props, ensureEmptyParagraphAfter);
            },
            replacePlaceholder(placeholder, element, options = {}) {
                replacePlaceholder(editor, placeholder, element, options);
            },
            isEmpty: () => EditorCommands.isEmpty(editor),
            isFocused: () => isEditorFocused(editor),
            isModified: () =>
                !isEditorValueEqual(editor, getInitialValue(), editor.children as Value),
            isValueEqual: (value: Value, another: Value) =>
                isEditorValueEqual(editor, value, another),
            resetValue: (value) => {
                EditorCommands.resetNodes(editor, value, editor.selection);
                setInitialValue(value);
            },
        }),
    );

    const variables = useVariables(editor, withVariables || undefined);
    const userMentions = useUserMentions(withUserMentions || undefined);

    const [
        { isOpen: isFloatingSnippetInputOpen },
        {
            close: closeFloatingSnippetInput,
            open: openFloatingSnippetInput,
            rootClose: rootCloseFloatingSnippetInput,
            submit: submitFloatingSnippetInput,
        },
    ] = useFloatingSnippetInput(editor);

    if (withVariables) {
        onKeyDownList.push(variables.onKeyDown);
    }

    if (withUserMentions) {
        onKeyDownList.push(userMentions.onKeyDown);
    }

    const withSpecificProviderOptions =
        typeof withFloatingAddMenu === 'object'
            ? withFloatingAddMenu.withSpecificProviderOptions
            : false;

    const menuOptions = generateFloatingAddMenuOptions(editor, {
        withAttachments,
        withBlockquotes,
        withButtonBlocks: Boolean(withButtonBlocks),
        withCallouts: withCallouts,
        withCoverage: Boolean(withCoverage),
        withDivider,
        withTables: Boolean(withTables),
        withEmbedSocial: Boolean(withEmbeds),
        withEmbeds: Boolean(withEmbeds),
        withGalleries: Boolean(withGalleries),
        withGalleryBookmarks: Boolean(withGalleryBookmarks),
        withHeadings,
        withImages: Boolean(withImages),
        withParagraphs: true,
        withPressContacts: Boolean(withPressContacts),
        withStoryBookmarks: Boolean(withStoryBookmarks),
        withStoryEmbeds: Boolean(withStoryEmbeds),
        withSnippets: Boolean(withSnippets),
        withVideos: Boolean(withVideos),
        withWebBookmarks: Boolean(withWebBookmarks),
        withSpecificProviderOptions,
    });

    const handleMenuAction = useFunction((option: Option<MenuAction>, query: string) => {
        const { action, text, suggested } = option;

        EventsEditor.dispatchEvent(editor, 'add-button-menu-option-click', {
            action,
            title: text,
            suggested: typeof suggested === 'number',
            query,
        });

        if (action === MenuAction.ADD_PARAGRAPH) {
            return toggleBlock<ParagraphNode>(editor, PARAGRAPH_NODE_TYPE);
        }
        if (action === MenuAction.ADD_HEADING_1) {
            return toggleBlock<HeadingNode>(editor, HEADING_1_NODE_TYPE);
        }
        if (action === MenuAction.ADD_HEADING_2) {
            return toggleBlock<HeadingNode>(editor, HEADING_2_NODE_TYPE);
        }
        if (action === MenuAction.ADD_ATTACHMENT) {
            const placeholder = insertPlaceholder(
                editor,
                { type: PlaceholderNode.Type.ATTACHMENT },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_BUTTON_BLOCK) {
            const button = insertButtonBlock(editor, {}, align);
            EditorCommands.selectNode(editor, button);
            return;
        }
        if (action === MenuAction.ADD_CALLOUT) {
            const callout = insertCallout(editor, { align });
            EditorCommands.selectNode(editor, callout);
            return;
        }
        if (action === MenuAction.ADD_CONTACT) {
            const placeholder = insertPlaceholder(
                editor,
                { type: PlaceholderNode.Type.CONTACT },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_COVERAGE) {
            const placeholder = insertPlaceholder(
                editor,
                { type: PlaceholderNode.Type.COVERAGE },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_QUOTE) {
            return toggleBlock<QuoteNode>(editor, QUOTE_NODE_TYPE);
        }
        if (action === MenuAction.ADD_DIVIDER) {
            return insertDivider(editor);
        }
        if (action === MenuAction.ADD_TABLE) {
            return TablesEditor.isTablesEditor(editor) && insertTable(editor);
        }
        if (action === MenuAction.ADD_EMBED) {
            const placeholder = insertPlaceholder(
                editor,
                { type: PlaceholderNode.Type.EMBED },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_PODCAST) {
            const placeholder = insertPlaceholder(
                editor,
                {
                    type: PlaceholderNode.Type.EMBED,
                    provider: PlaceholderNode.Provider.PODCAST,
                },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_AUDIO) {
            const placeholder = insertPlaceholder(
                editor,
                {
                    type: PlaceholderNode.Type.EMBED,
                    provider: PlaceholderNode.Provider.AUDIO,
                },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_DROPBOX) {
            const placeholder = insertPlaceholder(
                editor,
                {
                    type: PlaceholderNode.Type.EMBED,
                    provider: PlaceholderNode.Provider.DROPBOX,
                },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_SOUNDCLOUD) {
            const placeholder = insertPlaceholder(
                editor,
                {
                    type: PlaceholderNode.Type.EMBED,
                    provider: PlaceholderNode.Provider.SOUNDCLOUD,
                },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_GIPHY) {
            const placeholder = insertPlaceholder(
                editor,
                {
                    type: PlaceholderNode.Type.EMBED,
                    provider: PlaceholderNode.Provider.GIPHY,
                },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_SPOTIFY) {
            const placeholder = insertPlaceholder(
                editor,
                {
                    type: PlaceholderNode.Type.EMBED,
                    provider: PlaceholderNode.Provider.SPOTIFY,
                },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_GOOGLE_MAPS) {
            const placeholder = insertPlaceholder(
                editor,
                {
                    type: PlaceholderNode.Type.EMBED,
                    provider: PlaceholderNode.Provider.GOOGLE_MAPS,
                },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_GOOGLE_SHEETS) {
            const placeholder = insertPlaceholder(
                editor,
                {
                    type: PlaceholderNode.Type.EMBED,
                    provider: PlaceholderNode.Provider.GOOGLE_SHEETS,
                },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_GOOGLE_DOCS) {
            const placeholder = insertPlaceholder(
                editor,
                {
                    type: PlaceholderNode.Type.EMBED,
                    provider: PlaceholderNode.Provider.GOOGLE_DOCS,
                },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_CALENDLY) {
            const placeholder = insertPlaceholder(
                editor,
                {
                    type: PlaceholderNode.Type.EMBED,
                    provider: PlaceholderNode.Provider.CALENDLY,
                },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_EVENTBRITE) {
            const placeholder = insertPlaceholder(
                editor,
                {
                    type: PlaceholderNode.Type.EMBED,
                    provider: PlaceholderNode.Provider.EVENTBRITE,
                },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_TYPEFORM) {
            const placeholder = insertPlaceholder(
                editor,
                {
                    type: PlaceholderNode.Type.EMBED,
                    provider: PlaceholderNode.Provider.TYPEFORM,
                },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_TALLY) {
            const placeholder = insertPlaceholder(
                editor,
                {
                    type: PlaceholderNode.Type.EMBED,
                    provider: PlaceholderNode.Provider.TALLY,
                },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_MICROSOFT_TEAMS) {
            const placeholder = insertPlaceholder(
                editor,
                {
                    type: PlaceholderNode.Type.EMBED,
                    provider: PlaceholderNode.Provider.MICROSOFT_TEAMS,
                },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_EMBED_SOCIAL) {
            const placeholder = insertPlaceholder(
                editor,
                { type: PlaceholderNode.Type.SOCIAL_POST },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_INSTAGRAM) {
            const placeholder = insertPlaceholder(
                editor,
                {
                    type: PlaceholderNode.Type.SOCIAL_POST,
                    provider: PlaceholderNode.Provider.INSTAGRAM,
                },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_X) {
            const placeholder = insertPlaceholder(
                editor,
                {
                    type: PlaceholderNode.Type.SOCIAL_POST,
                    provider: PlaceholderNode.Provider.X,
                },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_FACEBOOK) {
            const placeholder = insertPlaceholder(
                editor,
                {
                    type: PlaceholderNode.Type.SOCIAL_POST,
                    provider: PlaceholderNode.Provider.FACEBOOK,
                },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_PINTEREST) {
            const placeholder = insertPlaceholder(
                editor,
                {
                    type: PlaceholderNode.Type.SOCIAL_POST,
                    provider: PlaceholderNode.Provider.PINTEREST,
                },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_STORY_BOOKMARK) {
            const placeholder = insertPlaceholder(
                editor,
                { type: PlaceholderNode.Type.STORY_BOOKMARK },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_STORY_EMBED) {
            const placeholder = insertPlaceholder(
                editor,
                { type: PlaceholderNode.Type.STORY_EMBED },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_SNIPPET) {
            return openFloatingSnippetInput();
        }
        if (action === MenuAction.ADD_GALLERY && withGalleries) {
            const placeholder = insertPlaceholder(
                editor,
                { type: PlaceholderNode.Type.GALLERY },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_GALLERY_BOOKMARK && withGalleryBookmarks) {
            const placeholder = insertPlaceholder(
                editor,
                { type: PlaceholderNode.Type.GALLERY_BOOKMARK },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_IMAGE && withImages) {
            const placeholder = insertPlaceholder(
                editor,
                { type: PlaceholderNode.Type.IMAGE },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
        }
        if (action === MenuAction.ADD_VIDEO) {
            const placeholder = insertPlaceholder(
                editor,
                { type: PlaceholderNode.Type.VIDEO },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_YOUTUBE) {
            const placeholder = insertPlaceholder(
                editor,
                {
                    type: PlaceholderNode.Type.VIDEO,
                    provider: PlaceholderNode.Provider.YOUTUBE,
                },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_VIMEO) {
            const placeholder = insertPlaceholder(
                editor,
                {
                    type: PlaceholderNode.Type.VIDEO,
                    provider: PlaceholderNode.Provider.VIMEO,
                },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_TIKTOK) {
            const placeholder = insertPlaceholder(
                editor,
                {
                    type: PlaceholderNode.Type.VIDEO,
                    provider: PlaceholderNode.Provider.TIKTOK,
                },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        if (action === MenuAction.ADD_WEB_BOOKMARK) {
            const placeholder = insertPlaceholder(
                editor,
                { type: PlaceholderNode.Type.WEB_BOOKMARK },
                true,
            );
            PlaceholdersManager.trigger(placeholder);
            EditorCommands.selectNode(editor, placeholder);
            return;
        }
        return;
    });
    const handleMenuFilter = useFunction((query: string, resultsCount: number) => {
        EventsEditor.dispatchEvent(editor, 'add-button-menu-filtered', { query, resultsCount });
    });

    const hasCustomPlaceholder =
        withFloatingAddMenu && (isEditorFocused(editor) || isFloatingAddMenuOpen);

    const onChange = useOnChange((value) => {
        props.onChange(editor.serialize(value) as Value);
    });

    return (
        <PopperOptionsContext.Provider value={popperMenuOptions}>
            <div
                id={id}
                className={classNames(styles.Editor, className)}
                ref={containerRef}
                style={style}
            >
                {sizer}
                <Plate
                    editor={editor}
                    onChange={({ value }) => {
                        /**
                         * @see https://docs.slatejs.org/concepts/11-normalizing#built-in-constraints
                         *
                         * The top-level editor node can only contain block nodes. If any of the top-level
                         * children are inline or text nodes they will be removed. This ensures that there
                         * are always block nodes in the editor so that behaviors like "splitting a block
                         * in two" work as expected.
                         */
                        onChange(value);
                        // variables.onChange(editor);
                        // userMentions.onChange(editor);
                    }}
                    // @ts-expect-error TODO: Fix this
                    initialValue={getInitialValue()}
                >
                    <DecorationsProvider decorate={decorate}>
                        {(combinedDecorate) => (
                            <>
                                <InitialNormalization />
                                <EditableWithExtensions
                                    className={classNames(styles.Editable, {
                                        [styles.withEntryPoints]: withEntryPointsAroundBlocks,
                                    })}
                                    decorate={combinedDecorate}
                                    editor={editor}
                                    extensions={extensions}
                                    onCut={createOnCut(editor)}
                                    onKeyDown={onKeyDownList}
                                    onKeyDownDeps={[
                                        userMentions.index,
                                        userMentions.query,
                                        userMentions.target,
                                        withUserMentions,
                                        variables.index,
                                        variables.query,
                                        variables.target,
                                        withVariables,
                                    ]}
                                    readOnly={readOnly}
                                    renderElementDeps={[availableWidth]}
                                    style={contentStyle}
                                />

                                {/* <FlashNodes containerRef={containerRef} /> */}

                                {!hasCustomPlaceholder && (
                                    <Placeholder className="editor-placeholder">
                                        {placeholder}
                                    </Placeholder>
                                )}

                                {withFloatingAddMenu && (
                                    <FloatingAddMenu
                                        tooltip={
                                            typeof withFloatingAddMenu === 'object'
                                                ? withFloatingAddMenu.tooltip
                                                : undefined
                                        }
                                        open={isFloatingAddMenuOpen}
                                        availableWidth={availableWidth}
                                        containerRef={containerRef}
                                        onActivate={handleMenuAction}
                                        onFilter={handleMenuFilter}
                                        onToggle={(toggle) =>
                                            onFloatingAddMenuToggle(toggle, 'click')
                                        }
                                        options={menuOptions}
                                        showTooltipByDefault={EditorCommands.isEmpty(editor)}
                                    />
                                )}

                                {withVariables && (
                                    <VariablesDropdown
                                        index={variables.index}
                                        onOptionClick={(option) => variables.onAdd(editor, option)}
                                        options={variables.options}
                                        target={variables.target}
                                    />
                                )}

                                {withUserMentions && (
                                    <UserMentionsDropdown
                                        index={userMentions.index}
                                        onOptionClick={(option) =>
                                            userMentions.onAdd(editor, option)
                                        }
                                        options={userMentions.options}
                                        target={userMentions.target}
                                    />
                                )}

                                {withRichFormattingMenu && (
                                    <RichFormattingMenu
                                        availableWidth={availableWidth}
                                        containerElement={containerRef.current}
                                        defaultAlignment={align}
                                        withAlignment={withAlignmentControls}
                                        withBlockquotes={withBlockquotes}
                                        withCallouts={withCallouts}
                                        withConversionOptions={
                                            typeof withRichFormattingMenu === 'object'
                                                ? withRichFormattingMenu.withConversionOptions
                                                : false
                                        }
                                        withHeadings={withHeadings}
                                        withInlineLinks={withInlineLinks}
                                        withLists={withLists}
                                        withNewTabOption={Boolean(
                                            typeof withRichFormattingMenu === 'object'
                                                ? withRichFormattingMenu.withNewTabOption
                                                : false,
                                        )}
                                        withTextHighlight={withTextHighlight}
                                        withParagraphs
                                    />
                                )}

                                {withSnippets && isFloatingSnippetInputOpen && (
                                    <FloatingSnippetInput
                                        availableWidth={availableWidth}
                                        containerRef={containerRef}
                                        onClose={closeFloatingSnippetInput}
                                        onRootClose={rootCloseFloatingSnippetInput}
                                        renderInput={() =>
                                            withSnippets.renderInput({
                                                onCreate: submitFloatingSnippetInput,
                                            })
                                        }
                                    />
                                )}
                            </>
                        )}
                    </DecorationsProvider>
                </Plate>
            </div>
        </PopperOptionsContext.Provider>
    );
});

Editor.displayName = 'Editor';
