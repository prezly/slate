import type { DecorateFactory } from '@prezly/slate-commons';
import { useMemo } from 'react';
import { useSlateStatic } from 'slate-react';

import { useDecoration } from './useDecoration';

export function useDecorationFactory(factory: DecorateFactory | undefined): void {
    const editor = useSlateStatic();

    const decorate = useMemo(() => factory?.(editor), [editor, factory]);

    return useDecoration(decorate);
}
