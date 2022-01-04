import type { ReactEditor } from 'slate-react';

export type OnDOMBeforeInput = (event: Event, editor: ReactEditor) => void;
