import { useRegisterExtension } from '@prezly/slate-commons';
import type { RefObject } from 'react';
import React, { forwardRef, useImperativeHandle } from 'react';

import { FloatingSnippetInput } from './components';
import { useFloatingSnippetInput } from './lib';
import type { SnippetsExtensionConfiguration } from './types';

export const EXTENSION_ID = 'SnippetsExtension';

export interface Parameters extends SnippetsExtensionConfiguration {
    availableWidth: number;
    containerRef: RefObject<HTMLDivElement>;
}

export const SnippetsExtension = forwardRef(
    ({ availableWidth, containerRef, renderInput }: Parameters, forwardedRef) => {
        const { isOpen, close, open, rootClose, submit } = useFloatingSnippetInput();

        useImperativeHandle(
            forwardedRef,
            (): SnippetsExtension.Ref => ({
                open,
            }),
            [open],
        );

        useRegisterExtension({
            id: EXTENSION_ID,
        });

        return (
            <>
                {isOpen && (
                    <FloatingSnippetInput
                        availableWidth={availableWidth}
                        containerRef={containerRef}
                        onClose={close}
                        onRootClose={rootClose}
                    renderInput={() => renderInput({ onCreate: submit })}
                    />
                )}
            </>
        );
    },
);

SnippetsExtension.displayName = 'SnippetsExtension';

export namespace SnippetsExtension {
    export interface Ref {
        open(): void;
    }
}
