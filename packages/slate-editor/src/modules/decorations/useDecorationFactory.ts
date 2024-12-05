import type { DecorateFactory } from '@prezly/slate-commons';
import { useEditorRef } from '@udecode/plate-common/react';
import { useMemo } from 'react';

import { useDecoration } from './useDecoration';

export function useDecorationFactory(factory: DecorateFactory | undefined): void {
    const editor = useEditorRef();

    const decorate = useMemo(() => factory?.(editor), [editor, factory]);

    return useDecoration(decorate);
}
