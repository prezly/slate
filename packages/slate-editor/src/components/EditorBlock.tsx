import classNames from 'classnames';
import type { PropsWithChildren, ReactNode } from 'react';
import React, { forwardRef } from 'react';
import { useSelected } from 'slate-react';
import type { RenderElementProps } from 'slate-react';

import styles from './EditorBlock.module.scss';

type OverlayMode = 'always' | 'autohide' | false;

type SlateInternalAttributes = RenderElementProps['attributes'];

interface Props extends Omit<RenderElementProps, 'attributes'>, SlateInternalAttributes {
    className?: string;
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
        slateInternalsChildren,
        overlay = false,
        void: isVoid,
        ...attributes
    }: PropsWithChildren<Props>,
    ref,
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

function Overlay({ selected, mode }: { selected: boolean; mode: OverlayMode }) {
    if (mode === false) {
        return null;
    }
    return (
        <div
            className={classNames(styles.overlay, {
                [styles.hidden]: selected && mode === 'autohide',
            })}
        />
    );
}
