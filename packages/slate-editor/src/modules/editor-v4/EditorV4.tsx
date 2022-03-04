import { Events } from '@prezly/events';
import { EditableWithExtensions, EditorCommands } from '@prezly/slate-commons';
import type { HeadingNode, QuoteNode } from '@prezly/slate-types';
import {
    Alignment,
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
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

import { noop } from '#lodash';

import { LoaderContentType } from '#modules/editor-v4-loader';
import {
    FloatingStoryEmbedInput,
    useFloatingStoryEmbedInput,
} from '#modules/editor-v4-story-embed';

import { Placeholder } from '../editor-v4-components';
import { FloatingCoverageMenu, useFloatingCoverageMenu } from '../editor-v4-coverage';
import { FloatingEmbedInput, useFloatingEmbedInput } from '../editor-v4-embed';
import type { EditorEventMap } from '../editor-v4-events';
import { FloatingAddMenu } from '../editor-v4-floating-add-menu';
import {
    PlaceholderMentionsDropdown,
    usePlaceholderMentions,
} from '../editor-v4-placeholder-mentions';
import {
    FloatingPressContactsMenu,
    useFloatingPressContactsMenu,
} from '../editor-v4-press-contacts';
import { toggleBlock } from '../editor-v4-rich-formatting';
import { RichFormattingMenu } from '../editor-v4-rich-formatting-menu';
import { UserMentionsDropdown, useUserMentions } from '../editor-v4-user-mentions';
import './EditorV4.scss';
import { FloatingVideoInput, useFloatingVideoInput } from '../editor-v4-video';
import { FloatingWebBookmarkInput, useFloatingWebBookmarkInput } from '../editor-v4-web-bookmark';

import { getEnabledExtensions } from './getEnabledExtensions';
import {
    createHandleAddGallery,
    createHandleAddImage,
    createOnCut,
    handleAddAttachment,
    insertDivider,
    isEditorValueEquivalent,
    useCursorInView,
} from './lib';
import { generateFloatingAddMenuOptions, MenuAction } from './menuOptions';
import type { EditorRef, EditorV4Props } from './types';
import { useCreateEditor } from './useCreateEditor';
import { usePendingOperation } from './usePendingOperation';
import { withAvailableWidth } from './withAvailableWidth';
import { withDebounce } from './withDebounce';

const EditorV4: FunctionComponent<EditorV4Props> = (props) => {
    const {
        align,
        availableWidth,
        autoFocus,
        className,
        contentStyle,
        editorRef,
        onChange,
        onIsOperationPendingChange,
        onKeyDown = noop,
        placeholder,
        plugins,
        readOnly,
        style,
        value,
        withAlignmentControls,
        withAttachments,
        withAutoformat,
        withCoverage,
        withCursorInView,
        withEmbeds,
        withFloatingAddMenu,
        withGalleries,
        withImages,
        withPlaceholders,
        withPressContacts,
        withRichFormatting,
        withUserMentions,
        withVideos,
        withWebBookmarks,
        withStoryEmbeds,
    } = props;
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
            containerRef,
            onOperationEnd,
            onOperationStart,
            onFloatingAddMenuToggle,
            withAttachments,
            withCoverage,
            withEmbeds,
            withFloatingAddMenu,
            withGalleries,
            withImages,
            withPlaceholders,
            withPressContacts,
            withRichFormatting,
            withUserMentions,
            withVideos,
            withWebBookmarks,
            withAutoformat,
            withStoryEmbeds,
        }),
    );

    const { decorateList, editor, onKeyDownList } = useCreateEditor({
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

    useCursorInView(editor, withCursorInView);

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

    const placeholders = usePlaceholderMentions(withPlaceholders);
    const userMentions = useUserMentions(withUserMentions);
    const [
        { isOpen: isFloatingWebBookmarkInputOpen, submitButtonLabel: webBookmarkSubmitButtonLabel },
        {
            close: closeFloatingWebBookmarkInput,
            open: openFloatingWebBookmarkInput,
            rootClose: rootCloseFloatingWebBookmarkInput,
            submit: submitFloatingWebBookmarkInput,
        },
    ] = useFloatingWebBookmarkInput(editor, withWebBookmarks?.fetchOembed);
    const [
        { isOpen: isFloatingVideoInputOpen, submitButtonLabel: videoSubmitButtonLabel },
        {
            close: closeFloatingVideoInput,
            open: openFloatingVideoInput,
            rootClose: rootCloseFloatingVideoInput,
            submit: submitFloatingVideoInput,
        },
    ] = useFloatingVideoInput(editor, withVideos?.fetchOembed);
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
    ] = useFloatingEmbedInput(editor, withEmbeds?.fetchOembed);

    const [
        { isOpen: isFloatingStoryEmbedInputOpen, submitButtonLabel: storyEmbedSubmitButtonLabel },
        {
            close: closeFloatingStoryEmbedInput,
            open: openFloatingStoryEmbedInput,
            rootClose: rootCloseFloatingStoryEmbedInput,
            submit: submitFloatingStoryEmbedInput,
        },
    ] = useFloatingStoryEmbedInput(editor, withStoryEmbeds?.fetchStoryId);

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

    const menuOptions = Array.from(generateFloatingAddMenuOptions(editor, props));
    const handleMenuAction = (action: MenuAction) => {
        if (action === MenuAction.ADD_PARAGRAPH) {
            return; // Do nothing. @see MT-4590
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
        if (action === MenuAction.ADD_GALLERY && withGalleries) {
            return createHandleAddGallery(withGalleries)(editor);
        }
        if (action === MenuAction.ADD_IMAGE && withImages) {
            return createHandleAddImage(withImages)(editor);
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

    return (
        <div className={classNames('editor-v4', className)} ref={containerRef} style={style}>
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
                    decorate={decorateList}
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

                {!hasCustomPlaceholder && <Placeholder>{placeholder}</Placeholder>}

                {withFloatingAddMenu && (
                    <FloatingAddMenu
                        {...withFloatingAddMenu}
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

                {withRichFormatting && withRichFormatting.menu && (
                    <RichFormattingMenu
                        availableWidth={availableWidth}
                        containerElement={containerRef.current}
                        defaultAlignment={align || Alignment.LEFT}
                        withAlignment={withAlignmentControls}
                        withLinks={Boolean(withRichFormatting.links)}
                        withRichBlockElements={Boolean(withRichFormatting.blocks)}
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
                        onSubmit={submitFloatingStoryEmbedInput}
                        submitButtonLabel={storyEmbedSubmitButtonLabel}
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
export default withAvailableWidth(withDebounce(EditorV4));
