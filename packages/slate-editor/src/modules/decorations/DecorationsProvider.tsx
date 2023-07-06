import type { Decorate } from '@prezly/slate-commons';
import { isNotUndefined } from '@technically/is-not-undefined';
import React, { useMemo, useState, type ReactElement } from 'react';
import { useSlateStatic } from 'slate-react';

import { combineDecorate } from '../editable/lib';

import { decorationsContext, type DecorationsConnector } from './context';

interface Props {
    decorate?: Decorate | undefined;
    children: (combinedDecorate: Decorate | undefined) => ReactElement | null;
}

type Entry = { decorate: Decorate };

/**
 * DecorationsProvider allows to attach additional Slate Editor decorations dynamically down the hierarchy.
 */
export function DecorationsProvider({ decorate, children }: Props) {
    const editor = useSlateStatic();
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
        <decorationsContext.Provider value={connector}>
            {children(combinedDecorate)}
        </decorationsContext.Provider>
    );
}
