import type { Events } from '@prezly/events';
import { type Extension, type OnKeyDown } from '@prezly/slate-commons';
import type { SlateEditor } from '@udecode/plate-common';
import type { PlateEditor } from '@udecode/plate-common/react';
import { createPlateEditor } from '@udecode/plate-common/react';
import type { KeyboardEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useLatest } from '#lib';

import type { EditorEventMap } from '../events';
import { withEvents } from '../events';

import { createEditor } from './createEditor';
import type { Value } from './types';

interface Parameters {
    events: Events<EditorEventMap>;
    extensions: Extension[];
    initialValue: Value;
    onKeyDown?: (event: KeyboardEvent) => void;
    plugins?: (<T extends SlateEditor>(editor: T) => T)[] | undefined;
}

interface State {
    editor: PlateEditor;
    onKeyDownList: OnKeyDown[];
}

type NonUndefined<T> = T extends undefined ? never : T;

const DEFAULT_PLUGINS: NonUndefined<Parameters['plugins']> = [];

export function useCreateEditor({
    events,
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
    const [userPlugins] = useState(plugins);
    const finalPlugins = useMemo(() => [withEvents(events), ...userPlugins], [userPlugins, events]);
    const editor = useMemo(() => {
        const plateEditor = createPlateEditor({
            plugins: [],
            value: initialValue,
        });

        return createEditor(plateEditor, getExtensions, finalPlugins);
    }, [getExtensions, finalPlugins]);

    useEffect(() => {
        if (plugins !== userPlugins) {
            console.warn(
                'EditorV4: "plugins" prop has changed. This will have no effect (plugins are initialized on mount only).',
            );
        }
    }, [plugins, userPlugins]);

    return {
        editor,
        onKeyDownList,
    };
}
