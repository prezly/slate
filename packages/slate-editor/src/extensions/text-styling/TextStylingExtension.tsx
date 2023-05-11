import type { Extension } from '@prezly/slate-commons';
import React from 'react';

import { Text } from './components';
import { detectMarks } from './lib';
import { onKeyDown } from './onKeyDown';

export const EXTENSION_ID = 'TextStylingExtension';

export function TextStylingExtension(): Extension {
    return {
        id: EXTENSION_ID,
        deserialize: {
            marks: detectMarks,
        },
        onKeyDown,
        renderLeaf: (props) => <Text {...props} />,
    };
}
