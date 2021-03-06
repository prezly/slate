import Events from '@prezly/events';
import { EditableWithExtensions, EditorCommands } from '@prezly/slate-commons';
import classNames from 'classnames';
import { noop } from 'lodash';
import React, {
    FunctionComponent,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { ReactEditor, Slate } from 'slate-react';

import { Coverage, DotsThreeHorizontal, FilesEmpty2, Link, User } from '../../icons';
import { Placeholder } from '../../modules/editor-v4-components';
import { FloatingCoverageMenu, useFloatingCoverageMenu } from '../../modules/editor-v4-coverage';
import { FloatingEmbedInput, useFloatingEmbedInput } from '../../modules/editor-v4-embed';
import { EditorEventMap } from '../../modules/editor-v4-events';
import { FloatingAddMenu, FloatingAddMenuOption } from '../../modules/editor-v4-floating-add-menu';
import { LoaderContentType } from '../../modules/editor-v4-loader';
import {
    PlaceholderMentionsDropdown,
    usePlaceholderMentions,
} from '../../modules/editor-v4-placeholder-mentions';
import {
    FloatingPressContactsMenu,
    useFloatingPressContactsMenu,
} from '../../modules/editor-v4-press-contacts';
import { RichFormattingMenu } from '../../modules/editor-v4-rich-formatting';
import { UploadcareEditor } from '../../modules/editor-v4-uploadcare';
import { UserMentionsDropdown, useUserMentions } from '../../modules/editor-v4-user-mentions';

import './EditorV4.scss';
import getEnabledExtensions from './getEnabledExtensions';
import {
    createHandleAddGallery,
    createHandleAddImage,
    createOnCut,
    handleAddAttachment,
    insertDivider,
    isEditorValueEquivalent,
    useCursorInView,
} from './lib';
import { EditorRef, EditorV4Props } from './types';
import useCreateEditor from './useCreateEditor';
import usePendingOperation from './usePendingOperation';
import withAvailableWidth from './withAvailableWidth';
import withDebounce from './withDebounce';

const EditorV4: FunctionComponent<EditorV4Props> = ({
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
    withAttachments,
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
}) => {
    const events = useMemo(() => new Events<EditorEventMap>(), []);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isCustomPlaceholderShown, setIsCustomPlaceholderShown] = useState(false);
    const { onOperationEnd, onOperationStart } = usePendingOperation(onIsOperationPendingChange);

    const extensions = Array.from(
        getEnabledExtensions({
            availableWidth,
            containerRef,
            onOperationEnd,
            onOperationStart,
            withAttachments,
            withCoverage,
            withEmbeds,
            withGalleries,
            withImages,
            withPlaceholders,
            withPressContacts,
            withRichFormatting,
            withUserMentions,
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

    function* generateFloatingAddMenuOptions(): Generator<FloatingAddMenuOption> {
        if (withImages && UploadcareEditor.isUploadcareEditor(editor)) {
            yield {
                icon: <i className="icon icon-camera2" />,
                onClick: createHandleAddImage(withImages),
                text: 'Add image',
            };
        }

        if (withGalleries && UploadcareEditor.isUploadcareEditor(editor)) {
            yield {
                icon: <i className="icon icon-images2" />,
                onClick: createHandleAddGallery(withGalleries),
                text: 'Add gallery',
            };
        }

        if (withEmbeds?.menuOptions.video) {
            yield {
                icon: <i className={classNames('icon', 'icon-play2')} />,
                onClick: () =>
                    openFloatingEmbedInput('Add video', {
                        contentType: LoaderContentType.VIDEO,
                        message: 'Embedding Video',
                    }),
                text: 'Add video',
            };
        }

        if (withEmbeds?.menuOptions.socialPost) {
            yield {
                beta: true,
                icon: <i className={classNames('icon', 'icon-chat')} />,
                onClick: () =>
                    openFloatingEmbedInput('Add social post', {
                        contentType: LoaderContentType.EMBED,
                        message: 'Embedding Social Post',
                    }),
                text: 'Add social post',
            };
        }

        if (withEmbeds?.menuOptions.link) {
            yield {
                beta: true,
                icon: <Link className="editor-v4__floating-add-menu-icon" />,
                onClick: () =>
                    openFloatingEmbedInput('Add link', {
                        contentType: LoaderContentType.EMBED,
                        message: 'Embedding Link',
                    }),
                text: 'Add link',
            };
        }

        if (withEmbeds?.menuOptions.embed) {
            yield {
                beta: true,
                icon: <i className={classNames('icon', 'icon-news')} />,
                onClick: () =>
                    openFloatingEmbedInput('Add embed', {
                        contentType: LoaderContentType.EMBED,
                        message: 'Embedding Content',
                    }),
                text: 'Add embed',
            };
        }

        if (withAttachments && UploadcareEditor.isUploadcareEditor(editor)) {
            yield {
                icon: <FilesEmpty2 className="editor-v4__floating-add-menu-icon" />,
                onClick: handleAddAttachment,
                text: 'Add attachment',
            };
        }

        yield {
            icon: <DotsThreeHorizontal className="editor-v4__floating-add-menu-icon" />,
            onClick: insertDivider,
            text: 'Add divider',
        };

        if (withPressContacts) {
            yield {
                icon: <User className="editor-v4__floating-add-menu-icon" />,
                onClick: openFloatingPressContactsMenu,
                text: 'Add contact',
            };
        }

        if (withCoverage) {
            yield {
                icon: <Coverage className="editor-v4__floating-add-menu-icon" />,
                onClick: openFloatingCoverageMenu,
                text: 'Add coverage',
            };
        }
    }

    const hasCustomPlaceholder =
        withFloatingAddMenu && (ReactEditor.isFocused(editor) || isCustomPlaceholderShown);

    return (
        <div className={classNames('editor-v4', className)} ref={containerRef} style={style}>
            <Slate
                editor={editor}
                onChange={(newValue) => {
                    onChange(newValue);
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
                        availableWidth={availableWidth}
                        containerRef={containerRef}
                        onToggle={setIsCustomPlaceholderShown}
                        parameters={{
                            ...withFloatingAddMenu,
                            options: Array.from(generateFloatingAddMenuOptions()),
                        }}
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
                        containerRef={containerRef}
                        parameters={withRichFormatting}
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

export default withAvailableWidth(withDebounce(EditorV4));
