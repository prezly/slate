import { FunctionComponent, useState } from 'react';
import { Node } from 'slate';
import SlateEditor from '@prezly/slate-editor';

const Editor: FunctionComponent = () => {
    const [state, setState] = useState<Node[]>([]);

    return <SlateEditor availableWidth={900} onChange={setState} value={state} />;
};

export default Editor;
