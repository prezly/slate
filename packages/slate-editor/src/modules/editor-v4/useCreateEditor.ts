import Events from '@prezly/events';
import { Decorate, Extension, OnKeyDown } from '@prezly/slate-commons';
import { KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useLatest } from 'react-use';
import { createEditor } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

import { EditorEventMap, withEvents } from '../../modules/editor-v4-events';

import createEditorV4 from './createEditorV4';

interface Parameters {
    events: Events<EditorEventMap>;
    extensions: Extension[];
    onKeyDown?: (event: KeyboardEvent) => void;
    plugins?: (<T extends ReactEditor>(editor: T) => T)[];
}

interface State {
    decorateList: Decorate[];
    editor: ReactEditor & HistoryEditor;
    onKeyDownList: OnKeyDown[];
}

const DEFAULT_PLUGINS: Parameters['plugins'] = [];

const useCreateEditor = ({
    events,
    extensions,
    onKeyDown,
    plugins = DEFAULT_PLUGINS,
}: Parameters): State => {
    const decorateList: Decorate[] = [];
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
        return createEditorV4(createEditor(), getExtensions, finalPlugins);
    }, [getExtensions, finalPlugins]);

    useEffect(() => {
        if (plugins !== userPlugins) {
            console.warn(
                'EditorV4: "plugins" prop has changed. This will have no effect (plugins are initialized on mount only).',
            );
        }
    }, [plugins, userPlugins]);

    return {
        decorateList,
        editor,
        onKeyDownList,
    };
};

export default useCreateEditor;
