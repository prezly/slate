import { createEmptyValue } from '@prezly/slate-commons';
import SlateEditor from '@prezly/slate-editor';
import { FunctionComponent, useState } from 'react';
import { Node } from 'slate';

const INITIAL_VALUE = createEmptyValue();

const Editor: FunctionComponent = () => {
    const [value, setValue] = useState<Node[]>(INITIAL_VALUE);

    return <SlateEditor availableWidth={900} onChange={setValue} value={value} />;
};

export default Editor;
