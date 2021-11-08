import { createEmptyValue } from '@prezly/slate-commons';
import SlateEditor from '@prezly/slate-editor';
import { FunctionComponent, useState } from 'react';
import { Element } from 'slate';

const Editor: FunctionComponent = () => {
    const [value, setValue] = useState<Element[]>(createEmptyValue());

    return <SlateEditor availableWidth={900} onChange={setValue} value={value} />;
};

export default Editor;
