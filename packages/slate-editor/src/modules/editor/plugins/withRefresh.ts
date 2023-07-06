import type { BaseEditor } from 'slate';

export interface RefreshableEditor extends BaseEditor {
    refresh(): void;
}

export function withRefresh(refresh: () => void) {
    return function <T extends BaseEditor>(editor: T): T & RefreshableEditor {
        return Object.assign(editor, {
            refresh,
        });
    };
}
