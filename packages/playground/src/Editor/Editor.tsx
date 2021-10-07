import { createEmptyValue } from '@prezly/slate-commons';
import SlateEditor from '@prezly/slate-editor';
import { BlockNode } from '@prezly/slate-types';
import { FunctionComponent, useState } from 'react';

const Editor: FunctionComponent = () => {
    const [value, setValue] = useState<BlockNode[]>(createEmptyValue());

    return <SlateEditor availableWidth={900} onChange={setValue} value={value} />;
};

export default Editor;
