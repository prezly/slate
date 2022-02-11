import type { ElementNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { PropsWithChildren, ReactNode, Ref } from 'react';
import React, { forwardRef } from 'react';
import { useSelected } from 'slate-react';
import type { RenderElementProps } from 'slate-react';

import styles from './EditorBlock.module.scss';
import type { OverlayMode } from './Overlay';
import { Overlay } from './Overlay';

type SlateInternalAttributes = RenderElementProps['attributes'];

interface Props<T extends ElementNode>
    extends Omit<RenderElementProps, 'attributes'>,
        SlateInternalAttributes {
    className?: string;
    element: T;
    overlay?: OverlayMode;
    /**
     * Children nodes provided by Slate, required for Slate internals.
     */
    slateInternalsChildren: ReactNode;
    void?: boolean;
}

export const EditorBlock = forwardRef(function <T extends ElementNode>(
    {
        children,
        className,
        element,
        slateInternalsChildren,
        overlay = false,
        void: isVoid,
        ...attributes
    }: PropsWithChildren<Props<T>>,
    ref: Ref<HTMLDivElement>,
) {
    const isSelected = useSelected();

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
            <div contentEditable={false}>
                <Overlay selected={isSelected} mode={overlay} />
                {children}
            </div>

            {/* We have to render children or Slate will fail when trying to find the node. */}
            {slateInternalsChildren}
        </div>
    );
});

EditorBlock.displayName = 'EditorBlock';


