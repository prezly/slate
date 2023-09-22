import React, { useEffect } from 'react';
import { useSlateStatic } from 'slate-react';

import { FlashNodes } from './components/FlashNodes';
import { withFlashNodes } from './withFlashNodes';

export const EXTENSION_ID = 'FlashNodesExtension';

export interface Parameters {
    containerElement: HTMLElement | null | undefined;
}

export function FlashNodesExtension({ containerElement }: Parameters) {
    const editor = useSlateStatic();

    useEffect(() => {
        withFlashNodes(editor);
    }, [editor]);

    return <FlashNodes containerElement={containerElement} />;
}
