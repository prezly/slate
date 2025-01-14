import type { SlateEditor, TNodeEntry } from '@udecode/plate-common';
import type { Range } from 'slate';

/**
 * Decorations are another type of text-level formatting.
 * They are similar to regular old custom properties,
 * except each one applies to a Range of the document instead of being
 * associated with a given text node.
 * However, decorations are computed at render-time based on the content itself.
 * This is helpful for dynamic formatting like syntax highlighting or search
 * keywords, where changes to the content (or some external data) has the
 * potential to change the formatting.
 */
export type Decorate = (options: { editor: SlateEditor; entry: TNodeEntry }) => Range[];
