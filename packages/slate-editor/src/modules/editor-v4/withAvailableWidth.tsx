import type { ComponentType } from 'react';
import React from 'react';
import { useSize } from '#lib';

import type { EditorV4Props } from './types';

const withAvailableWidth = (EditorV4Component: ComponentType<EditorV4Props>) => {
    const WithAvailableWidth = ({
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
};

export default withAvailableWidth;
