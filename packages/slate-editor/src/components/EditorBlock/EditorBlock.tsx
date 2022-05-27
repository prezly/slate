import { EditorCommands } from '@prezly/slate-commons';
import type { ElementNode } from '@prezly/slate-types';
import { Alignment } from '@prezly/slate-types';
import classNames from 'classnames';
import type { MouseEvent, ReactNode } from 'react';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { Editor, Transforms } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { ReactEditor, useSelected, useSlateStatic } from 'slate-react';

import { useSlateDom } from '#lib';

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

export interface Props extends Omit<RenderElementProps, 'attributes'>, SlateInternalAttributes {
    align?: Alignment;
    border?: boolean;
    /**
     * Children nodes provided by Slate, required for Slate internals.
     */
    children: ReactNode;
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
    overlay?: OverlayMode;
    renderBlock: (props: { isSelected: boolean }) => ReactNode;
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
        children,
        className,
        element,
        extendedHitArea,
        hasError,
        layout = 'contained',
        overlay = false,
        renderBlock,
        renderMenu,
        rounded = false,
        selected,
        void: isVoid,
        width,
        ...attributes
    },
    ref,
) {
    const editor = useSlateStatic();
    const editorElement = useSlateDom(editor);
    const isNodeSelected = useSelected();
    const isOnlyBlockSelected =
        isNodeSelected &&
        Array.from(Editor.nodes(editor, { match: EditorCommands.isTopLevelNode })).length === 1;
    const isSelected = selected ?? isNodeSelected;

    const [menuOpen, setMenuOpen] = useState(true);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const closeMenu = useCallback(() => setMenuOpen(false), []);

    const handleVoidBlockClick = useCallback(function () {
        setMenuOpen(true);
    }, []);

    const handleNonVoidBlockClick = useCallback(
        function (event: MouseEvent) {
            setMenuOpen(true);
            event.stopPropagation();
            const path = ReactEditor.findPath(editor, element);
            Transforms.select(editor, path);
        },
        [editor, element],
    );

    useEffect(
        function () {
            if (isVoid && isOnlyBlockSelected) setMenuOpen(true);
            if (!isOnlyBlockSelected) setMenuOpen(false);
        },
        [isOnlyBlockSelected],
    );

    return (
        <div
            {...attributes}
            className={classNames(className, styles.EditorBlock, {
                [styles.void]: isVoid,
                [styles.extendedHitArea]: extendedHitArea,
            })}
            data-slate-block-layout={layout}
            onClick={isVoid ? undefined : closeMenu}
            ref={ref}
        >
            {/* We have to render children or Slate will fail when trying to find the node. */}
            {isVoid && children}
            <div
                className={classNames(styles.Frame, {
                    [styles.alignLeft]: align === Alignment.LEFT,
                    [styles.alignCenter]: align === Alignment.CENTER,
                    [styles.alignRight]: align === Alignment.RIGHT,
                })}
                contentEditable={false}
                ref={setContainer}
                style={{ width }}
            >
                {isOnlyBlockSelected && renderMenu && container && editorElement && (
                    <Menu
                        className={styles.Menu}
                        open={menuOpen}
                        reference={container}
                        onClick={preventBubbling}
                    >
                        {renderMenu({ onClose: closeMenu })}
                    </Menu>
                )}
                <Overlay
                    className={styles.Overlay}
                    selected={isSelected}
                    mode={overlay}
                    onClick={isVoid ? handleVoidBlockClick : handleNonVoidBlockClick}
                />
                <div
                    className={classNames(styles.Content, {
                        [styles.selected]: isSelected,
                        [styles.hasError]: hasError,
                        [styles.border]: border,
                        [styles.rounded]: rounded,
                    })}
                    onClick={isVoid ? handleVoidBlockClick : handleNonVoidBlockClick}
                >
                    {renderBlock({ isSelected })}
                </div>
            </div>

            {/* We have to render children or Slate will fail when trying to find the node. */}
            {!isVoid && children}
        </div>
    );
});

EditorBlock.displayName = 'EditorBlock';

function preventBubbling(event: MouseEvent) {
    event.stopPropagation();
}
