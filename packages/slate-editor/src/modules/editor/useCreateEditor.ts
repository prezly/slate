import type { Events } from '@prezly/events';
import type { Extension } from '@prezly/slate-commons';
import { withExtensions } from '@prezly/slate-commons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Editor } from 'slate';
import { createEditor as createSlateEditor } from 'slate';

import { useLatest } from '#lib';

import type { EditorEventMap } from '../events';
import { withEvents } from '../events';

import { createEditor } from './createEditor';

interface Parameters {
    events: Events<EditorEventMap>;
    extensions: Extension[];
    plugins?: (<T extends Editor>(editor: T) => T)[] | undefined;
}

type NonUndefined<T> = T extends undefined ? never : T;

const DEFAULT_PLUGINS: NonUndefined<Parameters['plugins']> = [];

export function useCreateEditor({
    events,
    extensions,
    plugins = DEFAULT_PLUGINS,
}: Parameters): Editor {
    // We have to make sure that editor is created only once.
    // We do it by ensuring dependencies of `useMemo` returning the editor never change.
    const extensionsRef = useLatest<Extension[]>(extensions);
    const getExtensions = useCallback(() => extensionsRef.current, [extensionsRef]);
    const [userPlugins] = useState(plugins);
    const finalPlugins = useMemo(() => [withEvents(events), ...userPlugins], [userPlugins, events]);
    const editor = useMemo(() => {
        return withExtensions(createEditor(createSlateEditor(), getExtensions, finalPlugins));
    }, [getExtensions, userPlugins]);

    useEffect(() => {
        if (plugins !== userPlugins) {
            console.warn(
                'EditorV4: "plugins" prop has changed. This will have no effect (plugins are initialized on mount only).',
            );
        }
    }, [plugins, userPlugins]);

    return editor;
}
