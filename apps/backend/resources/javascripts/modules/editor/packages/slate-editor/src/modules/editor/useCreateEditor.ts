import { type Extension, type OnKeyDown } from '@prezly/slate-commons';
import type { PlateEditor, PlatePlugin } from '@udecode/plate/react';
import { createPlateEditor } from '@udecode/plate/react';
import type { KeyboardEvent } from 'react';
import { useCallback, useMemo } from 'react';

import { useLatest } from '#lib';

import { createEditor } from './createEditor';
import type { Value } from './types';

interface Parameters {
    extensions: Extension[];
    initialValue: Value;
    onKeyDown?: (event: KeyboardEvent) => void;
    plugins?: PlatePlugin[] | undefined;
}

interface State {
    editor: PlateEditor;
    onKeyDownList: OnKeyDown[];
}

type NonUndefined<T> = T extends undefined ? never : T;

const DEFAULT_PLUGINS: NonUndefined<Parameters['plugins']> = [];

export function useCreateEditor({
    extensions,
    initialValue,
    onKeyDown,
    plugins = DEFAULT_PLUGINS,
}: Parameters): State {
    const onKeyDownList: OnKeyDown[] = [];

    if (onKeyDown) {
        onKeyDownList.push(onKeyDown);
    }

    // We have to make sure that editor is created only once.
    // We do it by ensuring dependencies of `useMemo` returning the editor never change.
    const extensionsRef = useLatest<Extension[]>(extensions);
    const getExtensions = useCallback(() => extensionsRef.current, [extensionsRef]);
    const editor = useMemo(() => {
        const plateEditor = createPlateEditor({
            plugins: plugins,
            value: initialValue,
        });

        return createEditor(plateEditor, getExtensions);
    }, [getExtensions, plugins]);

    return {
        editor,
        onKeyDownList,
    };
}
