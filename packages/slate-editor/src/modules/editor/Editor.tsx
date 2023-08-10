/* eslint-disable react/display-name */
import { Events } from '@prezly/events';
import { EditorCommands } from '@prezly/slate-commons';
import { TablesEditor } from '@prezly/slate-tables';
import {
    type HeadingNode,
    type ParagraphNode,
    type QuoteNode,
    Alignment,
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
    PARAGRAPH_NODE_TYPE,
    QUOTE_NODE_TYPE,
} from '@prezly/slate-types';
import { noop } from '@technically/lodash';
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
import type { Element } from 'slate';
import { Transforms } from 'slate';
import { ReactEditor, Slate } from 'slate-react';

import { useFunction, useGetSet, useSize } from '#lib';

import { insertButtonBlock } from '#extensions/button-block';
import { FlashNodes } from '#extensions/flash-nodes';
import { FloatingAddMenu } from '#extensions/floating-add-menu';
import type { Option } from '#extensions/floating-add-menu';
import { insertPlaceholder, PlaceholderNode } from '#extensions/placeholders';
import { useFloatingSnippetInput } from '#extensions/snippet';
import { UserMentionsDropdown, useUserMentions } from '#extensions/user-mentions';
import { VariablesDropdown, useVariables } from '#extensions/variables';
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
import { usePendingOperation } from './usePendingOperation';

import { replacePlaceholder } from '#extensions/placeholders/lib';
import { PlaceholdersManager } from '#extensions/placeholders/PlaceholdersManager';

export const Editor = forwardRef<EditorRef, EditorProps>((props, forwardedRef) => {
    const {
        align,
        availableWidth: declaredAvailableWidth,
        autoFocus,
        className,
        contentStyle,
        decorate,
        id,
        initialValue: externalInitialValue,
        blurOnOutsideClick = false,
        onIsOperationPendingChange,
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
        withCoverage = false,
        withCursorInView = false,
        withCustomNormalization = false,
        withDivider = false,
        withEmbeds = false,
        withEntryPointsAroundBlocks = false,
        withFloatingAddMenu = false,
        withGalleries = false,
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
    const { onOperationEnd, onOperationStart } = usePendingOperation(onIsOperationPendingChange);
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

    const extensions = Array.from(
        getEnabledExtensions({
            availableWidth,
            onOperationEnd,
            onOperationStart,
            onFloatingAddMenuToggle,
            withAllowedBlocks,
            withAttachments,
            withAutoformat,
            withBlockquotes,
            withButtonBlocks,
            withCoverage,
            withCustomNormalization,
            withDivider,
            withEmbeds,
            withFloatingAddMenu,
            withGalleries,
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
    );

    const { editor, onKeyDownList } = useCreateEditor({
        events,
        extensions,
        onKeyDown,
        plugins,
    });

    const [getInitialValue, setInitialValue] = useGetSet(() =>
        EditorCommands.roughlyNormalizeValue(editor, externalInitialValue),
    );

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
                Transforms.setNodes(
                    editor,
                    props,
                    options.match ? { at: [], ...options } : options,
                );
            },
            insertPlaceholder(props, ensureEmptyParagraphAfter) {
                return insertPlaceholder(editor, props, ensureEmptyParagraphAfter);
            },
            replacePlaceholder(placeholder, element) {
                replacePlaceholder(editor, placeholder, element);
            },
            isEmpty: () => EditorCommands.isEmpty(editor),
            isFocused: () => ReactEditor.isFocused(editor),
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

    const menuOptions = generateFloatingAddMenuOptions(editor, {
        withAttachments,
        withBlockquotes,
        withButtonBlocks: Boolean(withButtonBlocks),
        withCoverage: Boolean(withCoverage),
        withDivider,
        withTables: Boolean(withTables),
        withEmbedSocial: Boolean(withEmbeds),
        withEmbeds: Boolean(withEmbeds),
        withGalleries: Boolean(withGalleries),
        withHeadings,
        withImages: Boolean(withImages),
        withParagraphs: true,
        withPressContacts: Boolean(withPressContacts),
        withStoryBookmarks: Boolean(withStoryBookmarks),
        withStoryEmbeds: Boolean(withStoryEmbeds),
        withSnippets: Boolean(withSnippets),
        withVideos: Boolean(withVideos),
        withWebBookmarks: Boolean(withWebBookmarks),
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
            const button = insertButtonBlock(editor);
            EditorCommands.selectNode(editor, button);
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
        withFloatingAddMenu && (ReactEditor.isFocused(editor) || isFloatingAddMenuOpen);

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
                <Slate
                    editor={editor}
                    onChange={(newValue) => {
                        /**
                         * @see https://docs.slatejs.org/concepts/11-normalizing#built-in-constraints
                         *
                         * The top-level editor node can only contain block nodes. If any of the top-level
                         * children are inline or text nodes they will be removed. This ensures that there
                         * are always block nodes in the editor so that behaviors like "splitting a block
                         * in two" work as expected.
                         */
                        onChange(newValue as Element[]);
                        variables.onChange(editor);
                        userMentions.onChange(editor);
                    }}
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

                                <FlashNodes containerRef={containerRef} />

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
                                        defaultAlignment={align ?? Alignment.LEFT}
                                        withAlignment={withAlignmentControls}
                                        withBlockquotes={withBlockquotes}
                                        withHeadings={withHeadings}
                                        withInlineLinks={withInlineLinks}
                                        withLists={withLists}
                                        withNewTabOption={Boolean(
                                            typeof withRichFormattingMenu === 'object'
                                                ? withRichFormattingMenu.withNewTabOption
                                                : false,
                                        )}
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
                </Slate>
            </div>
        </PopperOptionsContext.Provider>
    );
});

Editor.displayName = 'Editor';
