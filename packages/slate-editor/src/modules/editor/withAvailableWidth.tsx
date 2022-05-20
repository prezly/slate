import type { ComponentType, HTMLAttributes } from 'react';
import React from 'react';

import { useSize } from '#lib';

import type { EditorV4Props } from './types';

export function withAvailableWidth(attributes: HTMLAttributes<HTMLDivElement> = {}) {
    return function (EditorV4Component: ComponentType<EditorV4Props>) {
        function WithAvailableWidth({
            availableWidth: declaredAvailableWidth,
            ...props
        }: EditorV4Props) {
            const [sizer, { width: availableWidth }] = useSize(
                () => <div {...attributes} contentEditable={false} />,
                { width: declaredAvailableWidth },
            );

            return (
                <>
                    {sizer}
                    <EditorV4Component availableWidth={availableWidth} {...props} />
                </>
            );
        }

        const displayName = EditorV4Component.displayName || EditorV4Component.name;
        WithAvailableWidth.displayName = `withAvailableWidth(${displayName})`;

        return WithAvailableWidth;
    };
}
