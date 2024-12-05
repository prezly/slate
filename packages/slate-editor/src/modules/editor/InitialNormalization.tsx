import { useEditorRef } from '@udecode/plate-common/react';
import { useEffect } from 'react';

export function InitialNormalization() {
    const editor = useEditorRef();

    useEffect(() => {
        editor.normalize({ force: true });
    }, []);

    return null;
}
