import { useEffect } from 'react';
import { Editor } from 'slate';
import { useSlateStatic } from 'slate-react';

export function InitialNormalization() {
    const editor = useSlateStatic();

    useEffect(() => {
        Editor.normalize(editor, { force: true });
    }, []);

    return null;
}
