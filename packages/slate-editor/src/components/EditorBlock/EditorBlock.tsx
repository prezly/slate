import { EditorCommands } from '@prezly/slate-commons';
import type { ElementNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { ReactNode, MouseEvent } from 'react';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import type { Node, Path } from 'slate';
import { Transforms } from 'slate';
import { Editor } from 'slate';
import { ReactEditor, useSelected, useSlateStatic } from 'slate-react';
import type { RenderElementProps } from 'slate-react';

import { Add } from '#icons';
import { useSlateDom } from '#lib';

import styles from './EditorBlock.module.scss';
import { Menu } from './Menu';
import type { OverlayMode } from './Overlay';
import { Overlay } from './Overlay';

type SlateInternalAttributes = RenderElementProps['attributes'];

type Layout = 'contained' | 'expanded' | 'full-width';

interface Props extends Omit<RenderElementProps, 'attributes'>, SlateInternalAttributes {
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
    layout?: Layout;
    renderBlock: (props: { isSelected: boolean }) => ReactNode;
    renderMenu?: (props: { onClose: () => void }) => ReactNode;
    overlay?: OverlayMode;
    void?: boolean;
}

export const EditorBlock = forwardRef<HTMLDivElement, Props>(function (
    {
        children,
        className,
        element,
        extendedHitArea,
        layout = 'contained',
        renderBlock,
        renderMenu,
        overlay = false,
        void: isVoid,
        ...attributes
    },
    ref,
) {
    const editor = useSlateStatic();
    const editorElement = useSlateDom(editor);
    const isSelected = useSelected();
    const isOnlyBlockSelected =
        isSelected && Array.from(Editor.nodes(editor, { match: isTopLevelBlock })).length === 1;

    const [menuOpen, setMenuOpen] = useState(true);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const openMenu = useCallback(() => setMenuOpen(true), [setMenuOpen]);
    const closeMenu = useCallback(() => setMenuOpen(false), [setMenuOpen]);

    useEffect(
        function () {
            if (isOnlyBlockSelected) setMenuOpen(true);
        },
        [isOnlyBlockSelected],
    );

    return (
        <div
            className={classNames(styles.main, {
                [styles.selected]: isSelected,
            })}
        >
            <Line element={element} position="above" />
            <div
                {...attributes}
                className={classNames(className, styles.block, {
                    [styles.selected]: isSelected,
                    [styles.void]: isVoid,
                    [styles.extendedHitArea]: extendedHitArea,
                })}
                data-slate-type={element.type}
                data-slate-value={JSON.stringify(element)}
                data-element-layout={layout}
                ref={ref}
            >
                <div
                    className={styles.container}
                    contentEditable={false}
                    ref={setContainer}
                    onClick={openMenu}
                >
                    {isOnlyBlockSelected && renderMenu && container && editorElement && (
                        <Menu
                            editorElement={editorElement}
                            open={menuOpen}
                            reference={container}
                            onClick={preventBubbling}
                        >
                            {renderMenu({ onClose: closeMenu })}
                        </Menu>
                    )}
                    <Overlay selected={isSelected} mode={overlay} />
                    {renderBlock({ isSelected })}
                </div>

                {/* We have to render children or Slate will fail when trying to find the node. */}
                {children}
            </div>
            <Line element={element} position="below" />
        </div>
    );
});

EditorBlock.displayName = 'EditorBlock';

function isTopLevelBlock(_node: Node, path: Path): boolean {
    return path.length === 1;
}

function preventBubbling(event: MouseEvent) {
    event.stopPropagation();
}

function Line(props: { element: ElementNode; position: 'above' | 'below' }) {
    const editor = useSlateStatic();
    const path = ReactEditor.findPath(editor, props.element);

    return (
        <div
            contentEditable={false}
            className={classNames(styles.wrapper)}
            onClick={() => {
                const where =
                    props.position === 'above'
                        ? Editor.before(editor, path) ?? path
                        : Editor.after(editor, path) ?? path;

                EditorCommands.insertEmptyParagraph(editor, where);
                Transforms.select(editor, where);
            }}
        >
            <div className={styles['wrapper-hit-area']} />
            <Add className={styles.add} />
            <hr className={styles.line} />
        </div>
    );
}
