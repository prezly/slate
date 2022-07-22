import { EditorCommands } from '@prezly/slate-commons';
import type { ElementNode } from '@prezly/slate-types';
import { Alignment } from '@prezly/slate-types';
import classNames from 'classnames';
import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';
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
    const closeMenu = useCallback(() => setMenuOpen(false), []);

    const handleFrameClick = useFunction(function (event: MouseEvent) {
        setMenuOpen(true);

        event.stopPropagation();

        if (!isSelected) {
            const path = ReactEditor.findPath(editor, element);
            Transforms.select(editor, path);
        }
    });

    const handleTopEntryPointClick = useFunction(function () {
        const path = ReactEditor.findPath(editor, element);
        Transforms.insertNodes(editor, editor.createDefaultTextBlock(), { at: path, select: true });
    });

    const handleBottomEntryPointClick = useFunction(function () {
        const path = ReactEditor.findPath(editor, element);
        Transforms.insertNodes(editor, editor.createDefaultTextBlock(), {
            at: Path.next(path),
            select: true,
        });
    });

    useEffect(
        function () {
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
            onClick={closeMenu}
            ref={ref}
        >
            <EntryPoint
                className={classNames(styles.EntryPoint, styles.top)}
                onClick={handleTopEntryPointClick}
            />
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
            {renderInjectionPoint(renderBelowFrame, { isSelected })}
            <EntryPoint
                className={classNames(styles.EntryPoint, styles.bottom)}
                onClick={handleBottomEntryPointClick}
            />
        </div>
    );
});

EditorBlock.displayName = 'EditorBlock';

function EntryPoint({
    className,
    title = 'Click to insert a new paragraph',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={classNames(className, styles.EntryPoint)}
            contentEditable={false}
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
