import type { Extension } from '@prezly/slate-commons';

import { Text } from './components';
import { createDeserialize } from './createDeserialize';
import { onKeyDown } from './onKeyDown';

export const EXTENSION_ID = 'TextStylingExtension';

export function TextStylingExtension(): Extension {
    return {
        id: EXTENSION_ID,
        deserialize: createDeserialize(),
        onKeyDown,
        renderLeaf: Text,
    };
}
