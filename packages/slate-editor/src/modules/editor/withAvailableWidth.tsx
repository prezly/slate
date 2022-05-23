import type { ComponentType, HTMLAttributes } from 'react';
import React from 'react';

import { useSize } from '#lib';

import type { EditorProps } from './types';

export function withAvailableWidth(attributes: HTMLAttributes<HTMLDivElement> = {}) {
    return function (EditorComponent: ComponentType<EditorProps>) {
        function WithAvailableWidth({
            availableWidth: declaredAvailableWidth,
            ...props
        }: EditorProps) {
            const [sizer, { width: availableWidth }] = useSize(
                () => <div {...attributes} contentEditable={false} />,
                { width: declaredAvailableWidth },
            );

            return (
                <>
                    {sizer}
                    <EditorComponent availableWidth={availableWidth} {...props} />
                </>
            );
        }

        const displayName = EditorComponent.displayName || EditorComponent.name;
        WithAvailableWidth.displayName = `withAvailableWidth(${displayName})`;

        return WithAvailableWidth;
    };
}
