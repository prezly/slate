import type { ElementNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import React, { forwardRef, useState } from 'react';
import { useSelected } from 'slate-react';
import type { RenderElementProps } from 'slate-react';

import { useSlateDom } from '#lib';

import styles from './EditorBlock.module.scss';
import { Menu } from './Menu';
import type { OverlayMode } from './Overlay';
import { Overlay } from './Overlay';

type SlateInternalAttributes = RenderElementProps['attributes'];

interface Props extends Omit<RenderElementProps, 'attributes'>, SlateInternalAttributes {
    className?: string;
    element: ElementNode;
    renderMenu?: () => ReactNode;
    overlay?: OverlayMode;
    /**
     * Children nodes provided by Slate, required for Slate internals.
     */
    slateInternalsChildren: ReactNode;
    void?: boolean;
}

export const EditorBlock = forwardRef<HTMLDivElement, Props>(function (
    {
        children,
        className,
        element,
        renderMenu,
        slateInternalsChildren,
        overlay = false,
        void: isVoid,
        ...attributes
    },
    ref,
) {
    const editorElement = useSlateDom();
    const isSelected = useSelected();
    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    return (
        <div
            {...attributes}
            className={classNames(className, styles.block, {
                [styles.selected]: isSelected,
                [styles.void]: isVoid,
            })}
            data-slate-type={element.type}
            data-slate-value={JSON.stringify(element)}
            ref={ref}
        >
            <div contentEditable={false} ref={setContainer}>
                {isSelected && renderMenu && container && editorElement && (
                    <Menu editorElement={editorElement} reference={container}>
                        {renderMenu()}
                    </Menu>
                )}
                <Overlay selected={isSelected} mode={overlay} />
                {children}
            </div>

            {/* We have to render children or Slate will fail when trying to find the node. */}
            {slateInternalsChildren}
        </div>
    );
});

EditorBlock.displayName = 'EditorBlock';
