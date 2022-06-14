import { Events } from '@prezly/events';
import { EditorCommands } from '@prezly/slate-commons';
import type { HeadingNode, ParagraphNode, QuoteNode } from '@prezly/slate-types';
import {
    Alignment,
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
    PARAGRAPH_NODE_TYPE,
    QUOTE_NODE_TYPE,
} from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React, {
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import type { Element } from 'slate';
import { ReactEditor, Slate } from 'slate-react';

import { useSize } from '#lib';
import { noop } from '#lodash';

import { FloatingCoverageMenu, useFloatingCoverageMenu } from '#extensions/coverage';
import { FloatingEmbedInput, useFloatingEmbedInput } from '#extensions/embed';
import { FloatingAddMenu } from '#extensions/floating-add-menu';
import { LoaderContentType } from '#extensions/loader';
import {
    PlaceholderMentionsDropdown,
    usePlaceholderMentions,
} from '#extensions/placeholder-mentions';
import {
    FloatingPressContactsMenu,
    useFloatingPressContactsMenu,
} from '#extensions/press-contacts';
import { useFloatingStoryBookmarkInput } from '#extensions/story-bookmark';
import { useFloatingStoryEmbedInput } from '#extensions/story-embed';
import { UserMentionsDropdown, useUserMentions } from '#extensions/user-mentions';
import { FloatingVideoInput, useFloatingVideoInput } from '#extensions/video';
import { FloatingWebBookmarkInput, useFloatingWebBookmarkInput } from '#extensions/web-bookmark';
import { FloatingStoryEmbedInput, Placeholder } from '#modules/components';
import { EditableWithExtensions } from '#modules/editable';
import type { EditorEventMap } from '#modules/events';
import { RichFormattingMenu, toggleBlock } from '#modules/rich-formatting-menu';

import styles from './Editor.module.scss';
import { getEnabledExtensions } from './getEnabledExtensions';
import {
    createHandleAddGallery,
    createImageAddHandler,
    createOnCut,
    handleAddAttachment,
    insertDivider,
    isEditorValueEquivalent,
    useCursorInView,
} from './lib';
import { generateFloatingAddMenuOptions, MenuAction } from './menuOptions';
import type { EditorProps, EditorRef } from './types';
import { useCreateEditor } from './useCreateEditor';
import { useOnChange } from './useOnChange';
import { usePendingOperation } from './usePendingOperation';

const Editor: FunctionComponent<EditorProps> = (props) => {
    const {
        align,
        availableWidth: declaredAvailableWidth,
        autoFocus,
        className,
        contentStyle,
        decorate,
        editorRef,
        id,
        onIsOperationPendingChange,
        onKeyDown = noop,
        placeholder,
        plugins,
        readOnly,
        style,
        value,
        withAlignmentControls,
        withAttachments = false,
        withAutoformat = false,
        withBlockquotes = false,
        withCoverage = false,
        withCursorInView = false,
        withDivider = false,
        withEmbeds = false,
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
        withTextStyling = false,
        withUserMentions = false,
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
        (shouldOpen?: boolean) => setFloatingAddMenuOpen((isOpen) => shouldOpen ?? !isOpen),
        [setFloatingAddMenuOpen],
    );

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
            withUserMentions,
            withVideos,
            withWebBookmarks,
            withStoryEmbeds,
            withStoryBookmarks,
        }),
    );

    const { editor, onKeyDownList } = useCreateEditor({
        events,
        extensions,
        onKeyDown,
        plugins,
    });

    useEffect(() => {
        editor.children = value;
    }, [value]);

    useEffect(() => {
        if (autoFocus) {
            EditorCommands.focus(editor);
        }
    }, [autoFocus, editor]);

    useCursorInView(editor, withCursorInView || false);

    useImperativeHandle(
        editorRef,
        (): EditorRef => ({
            events,
            focus: () => EditorCommands.focus(editor),
            isEmpty: () => EditorCommands.isEmpty(editor),
            isFocused: () => ReactEditor.isFocused(editor),
            /**
             * @deprecated Please use isEditorValueEquivalent directly instead
             */
            isValueEquivalentTo: (otherValue: string): boolean =>
                isEditorValueEquivalent(value, otherValue),
        }),
    );

    const placeholders = usePlaceholderMentions(withPlaceholders || undefined);
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
        { isOpen: isFloatingPressContactsMenuOpen },
        {
            close: closeFloatingPressContactsMenu,
            open: openFloatingPressContactsMenu,
            rootClose: rootCloseFloatingPressContactsMenu,
            submit: submitFloatingPressContactsMenu,
        },
    ] = useFloatingPressContactsMenu(editor);

    if (withPlaceholders) {
        onKeyDownList.push(placeholders.onKeyDown);
    }

    if (withUserMentions) {
        onKeyDownList.push(userMentions.onKeyDown);
    }

    const menuOptions = Array.from(
        generateFloatingAddMenuOptions(editor, {
            withAttachments,
            withBlockquotes,
            withCoverage: Boolean(withCoverage),
            withDivider,
            withEmbedSocial: Boolean(withEmbeds),
            withEmbeds: Boolean(withEmbeds),
            withGalleries: Boolean(withGalleries),
            withHeadings,
            withImages: Boolean(withImages),
            withParagraphs: true,
            withPressContacts: Boolean(withPressContacts),
            withStoryBookmarks: Boolean(withStoryBookmarks),
            withStoryEmbeds: Boolean(withStoryEmbeds),
            withVideos: Boolean(withVideos),
            withWebBookmarks: Boolean(withWebBookmarks),
        }),
    );
    const handleMenuAction = (action: MenuAction) => {
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
            return handleAddAttachment(editor);
        }
        if (action === MenuAction.ADD_CONTACT) {
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
        if (action === MenuAction.ADD_EMBED) {
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
        if (action === MenuAction.ADD_GALLERY && withGalleries) {
            return createHandleAddGallery(withGalleries)(editor);
        }
        if (action === MenuAction.ADD_IMAGE && withImages) {
            return createImageAddHandler(withImages)(editor);
        }
        if (action === MenuAction.ADD_VIDEO) {
            return openFloatingVideoInput('Add video', {
                contentType: LoaderContentType.VIDEO,
                message: 'Adding video',
            });
        }
        if (action === MenuAction.ADD_WEB_BOOKMARK) {
            return openFloatingWebBookmarkInput('Add web bookmark', {
                contentType: LoaderContentType.BOOKMARK,
                message: 'Adding web bookmark',
            });
        }
        return;
    };

    const hasCustomPlaceholder =
        withFloatingAddMenu && (ReactEditor.isFocused(editor) || isFloatingAddMenuOpen);

    const onChange = useOnChange(props.onChange);

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
                    placeholders.onChange(editor);
                    userMentions.onChange(editor);
                }}
                value={value}
            >
                <EditableWithExtensions
                    className={styles.Editable}
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
                        placeholders.index,
                        placeholders.query,
                        placeholders.target,
                        withPlaceholders,
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
                        onToggle={onFloatingAddMenuToggle}
                        options={menuOptions}
                        showTooltipByDefault={EditorCommands.isEmpty(editor)}
                    />
                )}

                {withPlaceholders && (
                    <PlaceholderMentionsDropdown
                        index={placeholders.index}
                        onOptionClick={(option) => placeholders.onAdd(editor, option)}
                        options={placeholders.options}
                        target={placeholders.target}
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

                {withPressContacts && isFloatingPressContactsMenuOpen && (
                    <FloatingPressContactsMenu
                        availableWidth={availableWidth}
                        containerRef={containerRef}
                        events={events}
                        newsroomSettingsUrl={withPressContacts.newsroomSettingsUrl}
                        onClose={closeFloatingPressContactsMenu}
                        onRootClose={rootCloseFloatingPressContactsMenu}
                        onSubmit={submitFloatingPressContactsMenu}
                        renderSearch={withPressContacts.renderSearch}
                    />
                )}
            </Slate>
        </div>
    );
};

// eslint-disable-next-line import/no-default-export
export default Editor;
