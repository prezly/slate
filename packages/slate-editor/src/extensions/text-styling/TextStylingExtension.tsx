import type { DeserializeHtml } from '@prezly/slate-commons';
import { useRegisterExtension } from '@prezly/slate-commons';
import React from 'react';
import type { RenderLeafProps } from 'slate-react';

import { Text } from './components';
import { detectMarks } from './lib';
import { onKeyDown } from './onKeyDown';

export const EXTENSION_ID = 'TextStylingExtension';

const DESERIALIZE: DeserializeHtml = {
    marks: detectMarks,
};

export function TextStylingExtension() {
    return useRegisterExtension({
        id: EXTENSION_ID,
        deserialize: DESERIALIZE,
        onKeyDown,
        renderLeaf,
    });
}

function renderLeaf(props: RenderLeafProps) {
    return <Text {...props} />;
}
