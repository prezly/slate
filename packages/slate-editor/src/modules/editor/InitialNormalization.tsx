import { useEditorRef } from '@udecode/plate/react';
import { useEffect } from 'react';

export function InitialNormalization() {
    const editor = useEditorRef();

    useEffect(() => {
        editor.tf.normalize({ force: true });
    }, []);

    return null;
}
