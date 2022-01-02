import type { ComponentType, FunctionComponent } from 'react';
import React from 'react';

import { useSize } from '#lib';

import type { EditorV4Props } from './types';

export function withAvailableWidth(EditorV4Component: ComponentType<EditorV4Props>) {
    const WithAvailableWidth: FunctionComponent<EditorV4Props> = ({
        availableWidth: declaredAvailableWidth,
        ...props
    }: EditorV4Props) => {
        const [sizer, { width: availableWidth }] = useSize(
            () => <div className="editor-v4-sizer" contentEditable={false} />,
            { width: declaredAvailableWidth },
        );

        return (
            <>
                {sizer}

                <EditorV4Component availableWidth={availableWidth} {...props} />
            </>
        );
    };

    const displayName = EditorV4Component.displayName || EditorV4Component.name;
    WithAvailableWidth.displayName = `withAvailableWidth(${displayName})`;

    return WithAvailableWidth;
}
