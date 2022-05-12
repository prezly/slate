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

type Layout = 'contained' | 'expanded' | 'full-width';

export interface Props extends Omit<RenderElementProps, 'attributes'>, SlateInternalAttributes {
    align?: Alignment;
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
    layout?: Layout;
    overlay?: OverlayMode;
    renderBlock: (props: { isSelected: boolean }) => ReactNode;
    renderMenu?: (props: { onClose: () => void }) => ReactNode;
    selected?: boolean;
    void?: boolean;
    width?: string;
}

export const EditorBlock = forwardRef<HTMLDivElement, Props>(function (
    {
        align = Alignment.CENTER,
        children,
        className,
        element,
        extendedHitArea,
        hasError,
        layout = 'contained',
        overlay = false,
        renderBlock,
        renderMenu,
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
    const openMenu = useCallback(() => setMenuOpen(true), [setMenuOpen]);
    const closeMenu = useCallback(() => setMenuOpen(false), [setMenuOpen]);

    const handleClick = useCallback(
        function () {
            openMenu();

            if (!isVoid) {
                const path = ReactEditor.findPath(editor, element);
                Transforms.select(editor, path);
            }
        },
        [editor, element, openMenu, isVoid],
    );

    useEffect(
        function () {
            if (isOnlyBlockSelected) setMenuOpen(true);
        },
        [isOnlyBlockSelected],
    );

    return (
        <div
            {...attributes}
            className={classNames(className, styles.outer, {
                [styles.void]: isVoid,
                [styles.extendedHitArea]: extendedHitArea,
            })}
            data-slate-type={element.type}
            data-slate-value={JSON.stringify(element)}
            data-element-layout={layout}
            ref={ref}
        >
            <div
                className={classNames(styles.card, {
                    [styles.selected]: isSelected,
                    [styles.error]: hasError,
                    [styles.alignLeft]: align === Alignment.LEFT,
                    [styles.alignCenter]: align === Alignment.CENTER,
                    [styles.alignRight]: align === Alignment.RIGHT,
                })}
                contentEditable={false}
                ref={setContainer}
                onClick={handleClick}
                style={{ width }}
            >
                {isOnlyBlockSelected && renderMenu && container && editorElement && (
                    <Menu
                        className={styles.menu}
                        editorElement={editorElement}
                        open={menuOpen}
                        reference={container}
                        onClick={preventBubbling}
                    >
                        {renderMenu({ onClose: closeMenu })}
                    </Menu>
                )}
                <Overlay className={styles.overlay} selected={isSelected} mode={overlay} />
                {renderBlock({ isSelected })}
            </div>

            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </div>
    );
});

EditorBlock.displayName = 'EditorBlock';

function preventBubbling(event: MouseEvent) {
    event.stopPropagation();
}
