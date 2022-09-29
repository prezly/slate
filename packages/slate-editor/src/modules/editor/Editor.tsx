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
import classNames from 'classnames';
import { noop } from 'lodash-es';
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

import { useFunction, useSize } from '#lib';

import { FloatingCoverageMenu, useFloatingCoverageMenu } from '#extensions/coverage';
import { FloatingEmbedInput, useFloatingEmbedInput } from '#extensions/embed';
import { FloatingAddMenu } from '#extensions/floating-add-menu';
import type { Option } from '#extensions/floating-add-menu';
import { LoaderContentType } from '#extensions/loader';
import { insertPlaceholder, PlaceholderNode } from '#extensions/placeholders';
import {
    FloatingPressContactsMenu,
    useFloatingPressContactsMenu,
} from '#extensions/press-contacts';
import { useFloatingSnippetInput } from '#extensions/snippet';
import { useFloatingStoryBookmarkInput } from '#extensions/story-bookmark';
import { useFloatingStoryEmbedInput } from '#extensions/story-embed';
import { UserMentionsDropdown, useUserMentions } from '#extensions/user-mentions';
import { VariablesDropdown, useVariables } from '#extensions/variables';
import { FloatingVideoInput, useFloatingVideoInput } from '#extensions/video';
import { FloatingWebBookmarkInput, useFloatingWebBookmarkInput } from '#extensions/web-bookmark';
import { FloatingStoryEmbedInput, FloatingSnippetInput, Placeholder } from '#modules/components';
import { EditableWithExtensions } from '#modules/editable';
import type { EditorEventMap } from '#modules/events';
import { EventsEditor } from '#modules/events';
import { RichFormattingMenu, toggleBlock } from '#modules/rich-formatting-menu';

import styles from './Editor.module.scss';
import { getEnabledExtensions } from './getEnabledExtensions';
import {
    createHandleAddGallery,
    createImageAddHandler,
    createOnCut,
    handleAddAttachment,
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
        initialValue,
        onIsOperationPendingChange,
        onKeyDown = noop,
        placeholder,
        plugins,
        readOnly,
        style,
        withAlignmentControls,
        withAttachments = false,
        withAutoformat = false,
        withBlockquotes = false,
        withCoverage = false,
        withCursorInView = false,
        withDivider = false,
        withEmbeds = false,
        withEntryPointsAroundBlocks = false,
        withFloatingAddMenu = false,
        withGalleries = false,
        withHeadings = false,
        withImages = false,
        withInlineLinks = false,
        withLists = false,
        withPlaceholders = false,
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
    const getInitialValue = useFunction(() => initialValue);

    const extensions = Array.from(
        getEnabledExtensions({
            availableWidth,
            onOperationEnd,
            onOperationStart,
            onFloatingAddMenuToggle,
            withAttachments,
            withAutoformat,
            withBlockquotes,
            withCoverage,
            withDivider,
            withEmbeds,
            withFloatingAddMenu,
            withGalleries,
            withHeadings,
            withImages,
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

    useEffect(() => {
        if (autoFocus) {
            EditorCommands.focus(editor);
        }
    }, [autoFocus, editor]);

    useCursorInView(editor, withCursorInView || false);

    useImperativeHandle(
        forwardedRef,
        (): EditorRef => ({
            events,
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
            isEqualTo: (value) => isEditorValueEqual(editor, value, editor.children as Value),
            isFocused: () => ReactEditor.isFocused(editor),
            isModified: () =>
                !isEditorValueEqual(editor, getInitialValue(), editor.children as Value),
            resetValue: (value) => {
                EditorCommands.resetNodes(editor, value, editor.selection);
            },
        }),
    );

    const variables = useVariables(withVariables || undefined);
    const userMentions = useUserMentions(withUserMentions || undefined);
    const [
        { isOpen: isFloatingWebBookmarkInputOpen, submitButtonLabel: webBookmarkSubmitButtonLabel },
        {
            close: closeFloatingWebBookmarkInput,
            open: openFloatingWebBookmarkInput,
            rootClose: rootCloseFloatingWebBookmarkInput,
            submit: submitFloatingWebBookmarkInput,
        },
    ] = useFloatingWebBookmarkInput(editor, (withWebBookmarks || undefined)?.fetchOembed);
    const [
        { isOpen: isFloatingVideoInputOpen, submitButtonLabel: videoSubmitButtonLabel },
        {
            close: closeFloatingVideoInput,
            open: openFloatingVideoInput,
            rootClose: rootCloseFloatingVideoInput,
            submit: submitFloatingVideoInput,
        },
    ] = useFloatingVideoInput(editor, (withVideos || undefined)?.fetchOembed);
    const [
        { isOpen: isFloatingCoverageMenuOpen },
        {
            close: closeFloatingCoverageMenu,
            open: openFloatingCoverageMenu,
            rootClose: rootCloseFloatingCoverageMenu,
            submit: submitFloatingCoverageMenu,
        },
    ] = useFloatingCoverageMenu(editor);
    const [
        { isOpen: isFloatingEmbedInputOpen, submitButtonLabel: embedSubmitButtonLabel },
        {
            close: closeFloatingEmbedInput,
            open: openFloatingEmbedInput,
            rootClose: rootCloseFloatingEmbedInput,
            submit: submitFloatingEmbedInput,
        },
    ] = useFloatingEmbedInput(editor, (withEmbeds || undefined)?.fetchOembed);

    const [
        { isOpen: isFloatingStoryEmbedInputOpen },
        {
            close: closeFloatingStoryEmbedInput,
            open: openFloatingStoryEmbedInput,
            rootClose: rootCloseFloatingStoryEmbedInput,
            submit: submitFloatingStoryEmbedInput,
        },
    ] = useFloatingStoryEmbedInput(editor);

    const [
        { isOpen: isFloatingStoryBookmarkInputOpen },
        {
            close: closeFloatingStoryBookmarkInput,
            open: openFloatingStoryBookmarkInput,
            rootClose: rootCloseFloatingStoryBookmarkInput,
            submit: submitFloatingStoryBookmarkInput,
        },
    ] = useFloatingStoryBookmarkInput(editor);

    const [
        { isOpen: isFloatingSnippetInputOpen },
        {
            close: closeFloatingSnippetInput,
            open: openFloatingSnippetInput,
            rootClose: rootCloseFloatingSnippetInput,
            submit: submitFloatingSnippetInput,
        },
    ] = useFloatingSnippetInput(editor);

    const [
        { isOpen: isFloatingPressContactsMenuOpen },
        {
            close: closeFloatingPressContactsMenu,
            open: openFloatingPressContactsMenu,
            rootClose: rootCloseFloatingPressContactsMenu,
            submit: submitFloatingPressContactsMenu,
        },
    ] = useFloatingPressContactsMenu(editor);

    if (withVariables) {
        onKeyDownList.push(variables.onKeyDown);
    }

    if (withUserMentions) {
        onKeyDownList.push(userMentions.onKeyDown);
    }

    const menuOptions = generateFloatingAddMenuOptions(editor, {
        withAttachments,
        withBlockquotes,
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
            EventsEditor.dispatchEvent(editor, 'attachment-add-clicked');
            if (withPlaceholders) {
                const placeholder = insertPlaceholder(
                    editor,
                    { type: PlaceholderNode.Type.ATTACHMENT },
                    true,
                );
                PlaceholdersManager.trigger(placeholder);
                EditorCommands.selectNode(editor, placeholder);
                return;
            }
            return handleAddAttachment(editor);
        }
        if (action === MenuAction.ADD_CONTACT) {
            if (withPlaceholders && withPlaceholders.withContactPlaceholders) {
                const placeholder = insertPlaceholder(
                    editor,
                    { type: PlaceholderNode.Type.CONTACT },
                    true,
                );
                PlaceholdersManager.trigger(placeholder);
                EditorCommands.selectNode(editor, placeholder);
                return;
            }
            return openFloatingPressContactsMenu();
        }
        if (action === MenuAction.ADD_COVERAGE) {
            return openFloatingCoverageMenu();
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
            if (withPlaceholders) {
                const placeholder = insertPlaceholder(
                    editor,
                    { type: PlaceholderNode.Type.EMBED },
                    true,
                );
                PlaceholdersManager.trigger(placeholder);
                EditorCommands.selectNode(editor, placeholder);
                return;
            }
            return openFloatingEmbedInput('Add embed', {
                contentType: LoaderContentType.EMBED,
                message: 'Embedding Content',
            });
        }
        if (action === MenuAction.ADD_EMBED_LINK) {
            return openFloatingEmbedInput('Add link', {
                contentType: LoaderContentType.EMBED,
                message: 'Embedding Link',
            });
        }
        if (action === MenuAction.ADD_EMBED_VIDEO) {
            return openFloatingEmbedInput('Add video', {
                contentType: LoaderContentType.VIDEO,
                message: 'Embedding Video',
            });
        }
        if (action === MenuAction.ADD_EMBED_SOCIAL) {
            if (withPlaceholders) {
                const placeholder = insertPlaceholder(
                    editor,
                    { type: PlaceholderNode.Type.SOCIAL_POST },
                    true,
                );
                PlaceholdersManager.trigger(placeholder);
                EditorCommands.selectNode(editor, placeholder);
                return;
            }
            return openFloatingEmbedInput('Add social post', {
                contentType: LoaderContentType.EMBED,
                message: 'Embedding Social Post',
            });
        }
        if (action === MenuAction.ADD_STORY_EMBED) {
            return openFloatingStoryEmbedInput('Embed Prezly story', {
                contentType: LoaderContentType.STORY_EMBED,
                message: 'Embedding Prezly Story',
            });
        }
        if (action === MenuAction.ADD_STORY_BOOKMARK) {
            return openFloatingStoryBookmarkInput('Embed Prezly Story', {
                contentType: LoaderContentType.STORY_BOOKMARK,
                message: 'Embedding Prezly Story',
            });
        }
        if (action === MenuAction.ADD_SNIPPET) {
            return openFloatingSnippetInput();
        }
        if (action === MenuAction.ADD_GALLERY && withGalleries) {
            if (withPlaceholders) {
                const placeholder = insertPlaceholder(
                    editor,
                    { type: PlaceholderNode.Type.GALLERY },
                    true,
                );
                PlaceholdersManager.trigger(placeholder);
                EditorCommands.selectNode(editor, placeholder);
                return;
            }
            return createHandleAddGallery(withGalleries)(editor);
        }
        if (action === MenuAction.ADD_IMAGE && withImages) {
            EventsEditor.dispatchEvent(editor, 'image-add-clicked');
            if (withPlaceholders) {
                const placeholder = insertPlaceholder(
                    editor,
                    { type: PlaceholderNode.Type.IMAGE },
                    true,
                );
                PlaceholdersManager.trigger(placeholder);
                EditorCommands.selectNode(editor, placeholder);
                return;
            }
            return createImageAddHandler(withImages)(editor);
        }
        if (action === MenuAction.ADD_VIDEO) {
            EventsEditor.dispatchEvent(editor, 'video-add-clicked');
            if (withPlaceholders) {
                const placeholder = insertPlaceholder(
                    editor,
                    { type: PlaceholderNode.Type.VIDEO },
                    true,
                );
                PlaceholdersManager.trigger(placeholder);
                EditorCommands.selectNode(editor, placeholder);
                return;
            }
            return openFloatingVideoInput('Add video', {
                contentType: LoaderContentType.VIDEO,
                message: 'Adding video',
            });
        }
        if (action === MenuAction.ADD_WEB_BOOKMARK) {
            if (withPlaceholders) {
                const placeholder = insertPlaceholder(
                    editor,
                    { type: PlaceholderNode.Type.WEB_BOOKMARK },
                    true,
                );
                PlaceholdersManager.trigger(placeholder);
                EditorCommands.selectNode(editor, placeholder);
                return;
            }
            return openFloatingWebBookmarkInput('Add web bookmark', {
                contentType: LoaderContentType.BOOKMARK,
                message: 'Adding web bookmark',
            });
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
                value={initialValue}
            >
                <EditableWithExtensions
                    className={classNames(styles.Editable, {
                        [styles.withEntryPoints]: withEntryPointsAroundBlocks,
                    })}
                    decorate={decorate}
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

                {!hasCustomPlaceholder && (
                    <Placeholder className="editor-placeholder">{placeholder}</Placeholder>
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
                        onToggle={(toggle) => onFloatingAddMenuToggle(toggle, 'click')}
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
                        onOptionClick={(option) => userMentions.onAdd(editor, option)}
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

                {withVideos && isFloatingVideoInputOpen && (
                    <FloatingVideoInput
                        availableWidth={availableWidth}
                        containerRef={containerRef}
                        onClose={closeFloatingVideoInput}
                        onRootClose={rootCloseFloatingVideoInput}
                        onSubmit={submitFloatingVideoInput}
                        submitButtonLabel={videoSubmitButtonLabel}
                    />
                )}

                {withWebBookmarks && isFloatingWebBookmarkInputOpen && (
                    <FloatingWebBookmarkInput
                        availableWidth={availableWidth}
                        containerRef={containerRef}
                        onClose={closeFloatingWebBookmarkInput}
                        onRootClose={rootCloseFloatingWebBookmarkInput}
                        onSubmit={submitFloatingWebBookmarkInput}
                        submitButtonLabel={webBookmarkSubmitButtonLabel}
                    />
                )}

                {withCoverage && isFloatingCoverageMenuOpen && (
                    <FloatingCoverageMenu
                        availableWidth={availableWidth}
                        containerRef={containerRef}
                        onClose={closeFloatingCoverageMenu}
                        onRootClose={rootCloseFloatingCoverageMenu}
                        onSubmit={submitFloatingCoverageMenu}
                        renderSearch={withCoverage.renderSearch}
                    />
                )}

                {withEmbeds && isFloatingEmbedInputOpen && (
                    <FloatingEmbedInput
                        availableWidth={availableWidth}
                        containerRef={containerRef}
                        onClose={closeFloatingEmbedInput}
                        onRootClose={rootCloseFloatingEmbedInput}
                        onSubmit={submitFloatingEmbedInput}
                        submitButtonLabel={embedSubmitButtonLabel}
                    />
                )}

                {withStoryEmbeds && isFloatingStoryEmbedInputOpen && (
                    <FloatingStoryEmbedInput
                        availableWidth={availableWidth}
                        containerRef={containerRef}
                        onClose={closeFloatingStoryEmbedInput}
                        onRootClose={rootCloseFloatingStoryEmbedInput}
                        renderInput={() =>
                            withStoryEmbeds.renderInput({
                                onSubmit: submitFloatingStoryEmbedInput,
                                onClose: closeFloatingStoryEmbedInput,
                            })
                        }
                    />
                )}

                {withStoryBookmarks && isFloatingStoryBookmarkInputOpen && (
                    <FloatingStoryEmbedInput
                        availableWidth={availableWidth}
                        containerRef={containerRef}
                        onClose={closeFloatingStoryBookmarkInput}
                        onRootClose={rootCloseFloatingStoryBookmarkInput}
                        renderInput={() =>
                            withStoryBookmarks.renderInput({
                                onCreate: submitFloatingStoryBookmarkInput,
                                onRemove: closeFloatingStoryBookmarkInput,
                            })
                        }
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

                {withPressContacts && isFloatingPressContactsMenuOpen && (
                    <FloatingPressContactsMenu
                        availableWidth={availableWidth}
                        containerRef={containerRef}
                        events={events}
                        onClose={closeFloatingPressContactsMenu}
                        onRootClose={rootCloseFloatingPressContactsMenu}
                        onSubmit={submitFloatingPressContactsMenu}
                        renderSearch={withPressContacts.renderSearch}
                    />
                )}
            </Slate>
        </div>
    );
});

Editor.displayName = 'Editor';
