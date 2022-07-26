import { EditorCommands } from '@prezly/slate-commons';
import type { ElementNode } from '@prezly/slate-types';
import { Alignment } from '@prezly/slate-types';
import classNames from 'classnames';
import { isHotkey } from 'is-hotkey';
import type { MouseEvent, ReactNode } from 'react';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { Editor, Path, Transforms } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { ReactEditor, useSelected, useSlateStatic } from 'slate-react';

import { useFunction, useSlateDom } from '#lib';

import styles from './EditorBlock.module.scss';
import { Menu } from './Menu';
import type { OverlayMode } from './Overlay';
import { Overlay } from './Overlay';

type SlateInternalAttributes = RenderElementProps['attributes'];

enum Layout {
    CONTAINED = 'contained',
    EXPANDED = 'expanded',
    FULL_WIDTH = 'full-width',
}

export interface Props
    extends Omit<RenderElementProps, 'attributes' | 'children'>,
        SlateInternalAttributes {
    align?: Alignment;
    border?: boolean;
    className?: string;
    element: ElementNode;
    /**
     * Expand hit area and visual focused area when element is selected.
     * Useful for extremely thin blocks like Divider.
     */
    extendedHitArea?: boolean;
    /**
     * Mark the block having an error.
     */
    hasError?: boolean;
    layout?: `${Layout}`;
    overflow?: 'visible' | 'hidden';
    overlay?: OverlayMode;
    renderAboveFrame?: ((props: { isSelected: boolean }) => ReactNode) | ReactNode;
    renderBelowFrame?: ((props: { isSelected: boolean }) => ReactNode) | ReactNode;
    renderEditableFrame?: (props: { isSelected: boolean }) => ReactNode;
    renderReadOnlyFrame?: (props: { isSelected: boolean }) => ReactNode;
    renderMenu?: (props: { onClose: () => void }) => ReactNode;
    rounded?: boolean;
    selected?: boolean;
    void?: boolean;
    width?: string;
}

export const EditorBlock = forwardRef<HTMLDivElement, Props>(function (
    {
        align = Alignment.CENTER,
        border = false,
        className,
        element,
        extendedHitArea,
        hasError,
        layout = 'contained',
        overflow = 'hidden',
        overlay = false,
        renderAboveFrame,
        renderBelowFrame,
        renderEditableFrame,
        renderReadOnlyFrame,
        renderMenu,
        rounded = false,
        selected,
        void: isVoid,
        width,
        ...attributes
    },
    ref,
) {
    if (renderEditableFrame && renderReadOnlyFrame) {
        throw new Error(
            'EditorBlock expects either `renderEditableFrame` or `renderReadOnlyFrame`, but not both.',
        );
    }

    const editor = useSlateStatic();
    const editorElement = useSlateDom(editor);
    const isNodeSelected = useSelected();
    const isOnlyBlockSelected =
        isNodeSelected &&
        Array.from(Editor.nodes(editor, { match: EditorCommands.isTopLevelNode })).length === 1;
    const isSelected = selected ?? isNodeSelected;

    const [menuOpen, setMenuOpen] = useState(true);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    const closeMenu = useCallback(() => {
        setMenuOpen(false);
        ReactEditor.focus(editor);
    }, [editor]);

    const handleFrameClick = useFunction(function (event: MouseEvent) {
        setMenuOpen(true);

        event.stopPropagation();

        if (!isSelected) {
            const path = ReactEditor.findPath(editor, element);
            Transforms.select(editor, path);
        }
    });

    useEffect(
        function () {
            if (!isOnlyBlockSelected) setMenuOpen(false);
        },
        [isOnlyBlockSelected],
    );

    useEffect(() => {
        const onEsc = (e: KeyboardEvent) => {
            if (isHotkey('esc', e)) {
                closeMenu();
            }
        };

        document.addEventListener('keydown', onEsc);
        return () => document.removeEventListener('keydown', onEsc);
    }, [closeMenu]);

    return (
        <div
            {...attributes}
            className={classNames(className, styles.EditorBlock, {
                [styles.void]: isVoid,
                [styles.extendedHitArea]: extendedHitArea,
            })}
            data-slate-block-layout={layout}
            onClick={closeMenu}
            ref={ref}
        >
            <EntryPoint element={element} position="top" />
            {renderInjectionPoint(renderAboveFrame, { isSelected })}
            <div
                className={classNames(styles.Frame, {
                    [styles.alignLeft]: align === Alignment.LEFT,
                    [styles.alignCenter]: align === Alignment.CENTER,
                    [styles.alignRight]: align === Alignment.RIGHT,
                })}
                contentEditable={renderReadOnlyFrame ? false : undefined}
                suppressContentEditableWarning={true}
                ref={setContainer}
                style={{ width }}
            >
                {isOnlyBlockSelected && renderMenu && container && editorElement && menuOpen && (
                    <Menu className={styles.Menu} reference={container} onClick={preventBubbling}>
                        {renderMenu({ onClose: closeMenu })}
                    </Menu>
                )}
                <Overlay
                    className={styles.Overlay}
                    selected={isSelected}
                    mode={overlay}
                    onClick={handleFrameClick}
                />
                <div
                    className={classNames(styles.Content, {
                        [styles.border]: border,
                        [styles.editable]: Boolean(renderEditableFrame),
                        [styles.fullWidth]: layout === Layout.FULL_WIDTH,
                        [styles.hasError]: hasError,
                        [styles.overflowHidden]: overflow === 'hidden',
                        [styles.overflowVisible]: overflow === 'visible',
                        [styles.rounded]: rounded,
                        [styles.selected]: isSelected,
                    })}
                    onClick={handleFrameClick}
                >
                    {renderInjectionPoint(renderEditableFrame ?? renderReadOnlyFrame, {
                        isSelected,
                    })}
                </div>
            </div>
            <EntryPoint element={element} position="bottom" />
            {renderInjectionPoint(renderBelowFrame, { isSelected })}
        </div>
    );
});

EditorBlock.displayName = 'EditorBlock';

function EntryPoint(props: { element: ElementNode; position: 'top' | 'bottom'; title?: string }) {
    const { element, position, title = 'Click to insert a new paragraph' } = props;

    const editor = useSlateStatic();
    const handleClick = useFunction((event: MouseEvent) => {
        preventBubbling(event);
        const path = ReactEditor.findPath(editor, element);
        Transforms.insertNodes(editor, editor.createDefaultTextBlock(), {
            at: position === 'top' ? path : Path.next(path),
            select: true,
        });
    });

    return (
        <div
            data-block-entry-point={true}
            className={classNames(styles.EntryPoint, {
                top: position === 'top',
                bottom: position === 'bottom',
            })}
            contentEditable={false}
            onClick={handleClick}
            role="button"
            title={title}
        >
            {title}
        </div>
    );
}

function preventBubbling(event: MouseEvent) {
    event.stopPropagation();
}

export function renderInjectionPoint<P>(
    value: ((props: P) => ReactNode) | ReactNode,
    props: P,
): ReactNode {
    return typeof value === 'function' ? value(props) : value;
}
