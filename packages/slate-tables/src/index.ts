export * from './TablesEditor';

// The all-in-one Slate editor plugin for tables
export { withTables } from './withTables';
// Keystroke handler
export { onKeyDown } from './core';

// Separate parts of the `withTables()` plugin, if you need more control of how they're applied
// - Copy & Paste behavior
export { withTablesCopyPasteBehavior, getFragment } from './core';
// - Backspace & Delete behavior
export { withTablesDeleteBehavior, deleteBackward, deleteForward } from './core';
// - Normalization
export { withNormalization, normalizeNode } from './withNormalization';
