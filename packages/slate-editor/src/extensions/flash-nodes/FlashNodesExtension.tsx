import { useRegisterExtension } from '@prezly/slate-commons';
import React from 'react';

import { FlashNodes } from './components/FlashNodes';

export interface Parameters {
    containerElement: HTMLElement | null | undefined;
}

export function FlashNodesExtension({ containerElement }: Parameters) {
    useRegisterExtension({
        id: 'FlashNodesExtension',
        withOverrides: (editor) => {
            editor.nodesToFlash = [];

            editor.flash = (from, to) => {
                if (!from || !to) {
                    return;
                }

                editor.nodesToFlash.push([from, to]);
            };

            return editor;
        },
    });

    return <FlashNodes containerElement={containerElement} />;
}
