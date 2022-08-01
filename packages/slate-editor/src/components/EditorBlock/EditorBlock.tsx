import { EditorCommands } from '@prezly/slate-commons';
import type { ElementNode } from '@prezly/slate-types';
import { Alignment } from '@prezly/slate-types';
import classNames from 'classnames';
import { isHotkey } from 'is-hotkey';
import type { MouseEvent, ReactNode } from 'react';
import React, { forwardRef, useEffect, useState } from 'react';
import { Editor, Transforms } from 'slate';
import type { RenderElementProps } from 'slate-react';
import { ReactEditor, useSelected, useSlateStatic } from 'slate-react';

import { useFunction, useSlateDom } from '#lib';

import { CustomMenu } from './CustomMenu';
import styles from './EditorBlock.module.scss';
import { EntryPoint } from './EntryPoint';
import type { OverlayMode } from './Overlay';
import { Overlay } from './Overlay';
import { StandardMenu } from './StandardMenu';

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

    const [menuOpen, setMenuOpen] = useState<'none' | 'custom' | 'standard'>('none');
    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    // const openStandardMenu = useFunction(() => setMenuOpen('standard'));
    const toggleStandardMenu = useFunction(() =>
        setMenuOpen((menu) => (menu === 'standard' ? 'none' : 'standard')),
    );
    const openCustomMenu = useFunction(() => setMenuOpen('custom'));
    const closeMenus = useFunction(() => setMenuOpen('none'));

    const handleContentClick = useFunction(() => {
        closeMenus();
        ReactEditor.focus(editor);
    });

    const handleFrameClick = useFunction(function (event: MouseEvent) {
        openCustomMenu();

        event.stopPropagation();

        if (!isSelected) {
            const path = ReactEditor.findPath(editor, element);
            Transforms.select(editor, path);
        }
    });

    useEffect(
        function () {
            if (!isOnlyBlockSelected) setMenuOpen('none');
        },
        [isOnlyBlockSelected],
    );

    useEffect(() => {
        const onEsc = (e: KeyboardEvent) => {
            if (isHotkey('esc', e)) {
                closeMenus();
                ReactEditor.focus(editor);
            }
        };

        document.addEventListener('keydown', onEsc);
        return () => document.removeEventListener('keydown', onEsc);
    }, [closeMenus, editor]);

    return (
        <div
            {...attributes}
            className={classNames(className, styles.EditorBlock, {
                [styles.void]: isVoid,
                [styles.extendedHitArea]: extendedHitArea,
            })}
            data-slate-block-layout={layout}
            onClick={handleContentClick}
            ref={ref}
        >
            <EntryPoint
                className={`${styles.EntryPoint} ${styles.top}`}
                element={element}
                position="top"
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
                <StandardMenu
                    className={styles.StandardMenu}
                    element={element}
                    onClick={toggleStandardMenu}
                    onDismiss={closeMenus}
                    open={menuOpen === 'standard'}
                />
                {isOnlyBlockSelected &&
                    renderMenu &&
                    container &&
                    editorElement &&
                    menuOpen === 'custom' && (
                        <CustomMenu
                            className={styles.CustomMenu}
                            reference={container}
                            onClick={preventBubbling}
                        >
                            {renderMenu({ onClose: closeMenus })}
                        </CustomMenu>
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
            <EntryPoint
                className={`${styles.EntryPoint} ${styles.bottom}`}
                element={element}
                position="bottom"
            />
            {renderInjectionPoint(renderBelowFrame, { isSelected })}
        </div>
    );
});

EditorBlock.displayName = 'EditorBlock';

function preventBubbling(event: MouseEvent) {
    event.stopPropagation();
}

export function renderInjectionPoint<P>(
    value: ((props: P) => ReactNode) | ReactNode,
    props: P,
): ReactNode {
    return typeof value === 'function' ? value(props) : value;
}
