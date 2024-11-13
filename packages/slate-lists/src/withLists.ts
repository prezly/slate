import type { SlateEditor } from '@udecode/plate-common';

import type { ListsSchema } from './types';
import { withListsNormalization } from './withListsNormalization';
import { withListsReact } from './withListsReact';
import { withListsSchema } from './withListsSchema';

export function withLists(schema: ListsSchema) {
    return <T extends SlateEditor>(editor: T): T => {
        // @ts-expect-error TODO: Fix this
        return withListsReact(withListsNormalization(withListsSchema(schema)(editor)));
    };
}
