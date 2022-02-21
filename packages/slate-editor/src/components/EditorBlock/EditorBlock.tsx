import type { ElementNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import React, { forwardRef, useCallback, useState } from 'react';
import type { Node, Path } from 'slate';
import { Editor } from 'slate';
import { useSelected, useSlateStatic } from 'slate-react';
import type { RenderElementProps } from 'slate-react';

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

    return (
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
            <div className={styles.container} contentEditable={false} ref={setContainer}>
                {isOnlyBlockSelected && renderMenu && container && editorElement && (
                    <Menu editorElement={editorElement} open={menuOpen} reference={container}>
                        {renderMenu({ onClose: closeMenu })}
                    </Menu>
                )}
                <Overlay selected={isSelected} mode={overlay} onClick={openMenu} />
                {renderBlock({ isSelected })}
            </div>

            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </div>
    );
});

EditorBlock.displayName = 'EditorBlock';

function isTopLevelBlock(_node: Node, path: Path): boolean {
    return path.length === 1;
}
