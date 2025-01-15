import type { Decorate } from '@prezly/slate-commons';
import { isNotUndefined } from '@technically/is-not-undefined';
import { useEditorRef } from '@udecode/plate/react';
import React, { useMemo, useState, type ReactElement } from 'react';

import { combineDecorate } from '../editable/lib';

import { DecorationsContext, type DecorationsConnector } from './DecorationsContext';

interface Props {
    decorate?: Decorate | undefined;
    children: (combinedDecorate: Decorate | undefined) => ReactElement | null;
}

type Entry = { decorate: Decorate };

/**
 * DecorationsProvider allows to attach additional Slate Editor decorations dynamically down the hierarchy.
 */
export function DecorationsProvider({ decorate, children }: Props) {
    const editor = useEditorRef();
    const [entries, setEntries] = useState<Entry[]>([]);

    const connector = useMemo(
        (): DecorationsConnector => ({
            attach(decorate: Decorate) {
                const entry = { decorate };
                setEntries((prev) => [...prev, entry]);

                return () => {
                    setEntries((prev) => prev.filter((e) => e !== entry));
                };
            },
        }),
        [],
    );

    const combinedDecorate = useMemo(() => {
        if (!decorate && entries.length === 0) {
            return undefined;
        }
        const fns = [decorate, ...entries.map((entry) => entry.decorate)].filter(isNotUndefined);

        return combineDecorate(fns);
    }, [decorate, entries, editor]);

    return (
        <DecorationsContext.Provider value={connector}>
            {children(combinedDecorate)}
        </DecorationsContext.Provider>
    );
}
