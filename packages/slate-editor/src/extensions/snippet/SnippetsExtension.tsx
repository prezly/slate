import { useRegisterExtension } from '@prezly/slate-commons';
import type { RefObject } from 'react';
import React from 'react';

import { FloatingSnippetInput } from './components';
import { useFloatingSnippetInput } from './lib';
import type { SnippetsExtensionConfiguration } from './types';

export const EXTENSION_ID = 'SnippetsExtension';

export interface Parameters extends SnippetsExtensionConfiguration {
    availableWidth: number;
    containerRef: RefObject<HTMLDivElement>;
}

export function SnippetsExtension({ availableWidth, containerRef, renderInput }: Parameters) {
    const [{ isOpen }, { close, open, rootClose, submit }] = useFloatingSnippetInput();

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
}
