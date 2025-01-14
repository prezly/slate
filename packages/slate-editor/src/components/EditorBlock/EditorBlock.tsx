import { EditorCommands } from '@prezly/slate-commons';
import type { ElementNode } from '@prezly/slate-types';
import { Alignment } from '@prezly/slate-types';
import { findNodePath, focusEditor, useEditorRef } from '@udecode/plate-common/react';
import classNames from 'classnames';
import type { MouseEvent, ReactNode } from 'react';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSelected } from 'slate-react';

import { NewParagraphDelimiter } from '#components';
import { useFunction } from '#lib';

import {
    type PopperOptionsContextType,
    usePopperOptionsContext,
} from '#modules/popper-options-context';

import styles from './EditorBlock.module.scss';
import { Menu } from './Menu';
import { Overlay } from './Overlay';

type SlateInternalAttributes = RenderElementProps['attributes'];
export type OverlayMode = 'always' | 'autohide' | false;

enum Layout {
    CONTAINED = 'contained',
    EXPANDED = 'expanded',
    FULL_WIDTH = 'full-width',
}

export interface RenderProps {
    isSelected: boolean;
    isHovered: boolean;
}

export interface Props
    extends Omit<RenderElementProps, 'attributes' | 'children'>,
        SlateInternalAttributes {
    align?: `${Alignment}`;
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
    loading?: boolean;
    menuPlacement?: PopperOptionsContextType['placement'];
    overflow?: 'visible' | 'hidden' | 'auto';
    overlay?: OverlayMode;
    renderAboveFrame?: ((props: RenderProps) => ReactNode) | ReactNode;
    renderBelowFrame?: ((props: RenderProps) => ReactNode) | ReactNode;
    renderEditableFrame?: (props: RenderProps) => ReactNode;
    renderReadOnlyFrame?: (props: RenderProps) => ReactNode;
    renderMenu?: (props: { onClose: () => void; updatePosition: () => void }) => ReactNode;
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
        loading = false,
        overflow = 'hidden',
        overlay = false,
        menuPlacement,
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

    const editor = useEditorRef();
    const isNodeSelected = useSelected();
    const isOnlyBlockSelected =
        isNodeSelected &&
        Array.from(editor.nodes({ match: EditorCommands.isTopLevelNode })).length === 1;
    const isSelected = selected ?? isNodeSelected;
    const isOverlayEnabled = overlay === 'always' || (overlay === 'autohide' && !isSelected);
    const popperOptions = usePopperOptionsContext();

    const [menuOpen, setMenuOpen] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    const closeMenu = useCallback(() => {
        setMenuOpen(false);
        focusEditor(editor);
    }, [editor]);

    const handleFrameClick = useFunction(function (event: MouseEvent) {
        setMenuOpen(true);

        event.stopPropagation();

        if (!isSelected) {
            const path = findNodePath(editor, element);
            if (path) {
                editor.select(path);
            }
        }
    });

    useEffect(
        function () {
            if (!isOnlyBlockSelected) {
                setMenuOpen(false);
            }
        },
        [isOnlyBlockSelected],
    );

    const renderProps: RenderProps = {
        isSelected,
        isHovered,
    };

    return (
        <div
            {...attributes}
            className={classNames(className, styles.EditorBlock, {
                [styles.isVoid]: isVoid,
                [styles.extendedHitArea]: extendedHitArea,
                [styles.withOverlay]: isOverlayEnabled,
                [styles.rounded]: rounded,
                [styles.hasError]: hasError,
                [styles.selected]: selected,
                [styles.loading]: loading,
            })}
            data-slate-block-layout={layout}
            data-slate-block-align={align}
            onClick={closeMenu}
            ref={ref}
        >
            <NewParagraphDelimiter
                extendedHitArea={extendedHitArea}
                element={element}
                position="top"
            />
            {renderInjectionPoint(renderAboveFrame, renderProps)}
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
                {isOnlyBlockSelected && !loading && renderMenu && container && menuOpen && (
                    <Menu
                        className={styles.Menu}
                        onClick={preventBubbling}
                        popperOptions={{
                            ...popperOptions,
                            placement: menuPlacement ?? popperOptions.placement,
                        }}
                        reference={container}
                    >
                        {({ updatePosition }) => renderMenu({ onClose: closeMenu, updatePosition })}
                    </Menu>
                )}
                {isOverlayEnabled && (
                    <Overlay className={styles.Overlay} onClick={handleFrameClick} />
                )}
                <div
                    className={classNames(styles.Content, {
                        [styles.border]: border,
                        [styles.editable]: Boolean(renderEditableFrame),
                        [styles.hasError]: hasError,
                        [styles.selected]: isSelected,
                    })}
                    onClick={handleFrameClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{ overflow }}
                >
                    {renderInjectionPoint(renderEditableFrame ?? renderReadOnlyFrame, renderProps)}
                </div>
                {loading && <div className={styles.LoadingIndicator} />}
            </div>
            <NewParagraphDelimiter
                extendedHitArea={extendedHitArea}
                element={element}
                position="bottom"
            />
            {renderInjectionPoint(renderBelowFrame, renderProps)}
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
