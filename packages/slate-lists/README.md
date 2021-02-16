# @prezly/slate-lists

The best Slate lists extension out there.

API is inspired by https://github.com/GitbookIO/slate-edit-list.

![Version](https://img.shields.io/npm/v/@prezly/slate-lists)
![License](https://img.shields.io/npm/l/@prezly/slate-lists)

## Table of contents

-   [Features](#Features)
-   [Constraints](#Constraints)
-   [Schema](#Schema)
-   [API](#API)
-   [Examples](#Examples)

## Features

-   Nested lists
-   Customizable list types (ordered, bulleted, dashed - anything goes)
-   Transformations support multiple list items in selection
-   Normalizations recover from invalid structure (helpful when pasting)
-   Merges sibling lists of same type
-   `Range.prototype.cloneContents` monkey patch to improve edge cases that occur when copying lists

## Constraints

-   all list-related nodes have a `type: string` attribute (you can customize the supported string values via [ListsOptions](src/types.ts))
-   there is an assumption that a _default_ node `type` to which this extension can convert list-related nodes to exists (e.g. during normalization, or unwrapping lists)

## Schema

-   a **list** node can only contain **list item** nodes
-   a **list item** node can contain either:
    -   a **list item text** node
    -   a **list item text** node and a **list** node (in that order) (nesting lists)
-   a **list** node can either:
    -   have no parent node
    -   have a parent **list item** node

<details>
<summary>TypeScript interfaces</summary>
<p>

Sometimes code can be better than words. Here are example TypeScript interfaces that describe the above schema (some schema rules are not expressible in TypeScript, so please treat it just as a quick overview).

```tsx
import { Node } from 'slate';

interface ListNode {
    children: ListItemNode[];
    type: 'bulleted-list' | 'numbered-list'; // see ListsOptions to customize this
}

interface ListItemNode {
    children: [ListItemTextNode] | [ListItemTextNode, ListNode];
    type: 'list-item'; // see ListsOptions to customize this
}

interface ListItemTextNode {
    children: Node[]; // by default everything is allowed here
    type: 'list-item-text'; // see ListsOptions to customize this
}
```

</p>
</details>

## API

Only core API is documented although all utility functions are exposed. Should you ever need anything beyond the core API, please have a look at [`src/index.ts`](src/index.ts) to see what's available.

-   [`ListsOptions`](#ListsOptions)
-   [`withLists`](#withLists)
-   [`withListsReact`](#withListsReact)
-   [`Lists`](#Lists)

### `ListsOptions` ([source](src/types.ts))

First you're going to want to define options that will be passed to the extension. Just create an instance of [ListsOptions](src/types.ts) somewhere.

```tsx
import { ListsOptions } from '@prezly/slate-lists';

const options: ListsOptions = {
    defaultBlockType: 'paragraph',
    listItemTextType: 'list-item-text',
    listItemType: 'list-item',
    listTypes: ['ordered-list', 'unordered-list'],
    wrappableTypes: ['paragraph'],
};
```

### `withLists<T extends Editor>(editor: T, options: ListsOptions): T` ([source](src/lib/withLists.ts))

The next step is to use the `withLists` plugin. It's a [Slate plugin](https://docs.slatejs.org/concepts/07-plugins) that enables [normalizations](https://docs.slatejs.org/concepts/10-normalizing) which enforce [schema](#Schema) constraints and recover from unsupported cases.

```tsx
import { Lists, ListsOptions, withLists } from '@prezly/slate-lists';
import { createEditor } from 'slate';

const options: ListsOptions = {
    /* ... */
};

const baseEditor = createEditor();
const editor = withLists(options)(baseEditor);
```

### `withListsReact<T extends ReactEditor>(editor: T): T` ([source](src/lib/withListsReact.ts))

You may also want to use `withListsReact` on the client-side - it's a [Slate plugin](https://docs.slatejs.org/concepts/07-plugins) that overrides `editor.setFragmentData`. It enables `Range.prototype.cloneContents` monkey patch to improve copying behavior in some edge cases.

```tsx
import { Lists, ListsOptions, withLists, withListsReact } from '@prezly/slate-lists';
import React, { useMemo } from 'react';
import { createEditor } from 'slate';
import { withReact } from 'slate-react';

const options: ListsOptions = {
    /* ... */
};

const MyEditor = (/* ... */) => {
    const baseEditor = useMemo(() => withReact(createEditor()), []);
    const editor = useMemo(() => withListsReact(withLists(options)(baseEditor)), [baseEditor]);

    /* ... */
};

export default MyEditor;
```

### `Lists`

It's time to pass the [ListsOptions](src/types.ts) instance to `Lists` function. It will create an object (`lists`) with utilities and transforms bound to the options you passed to it. Those are the building blocks you're going to use when adding lists support to your editor. Use them to implement UI controls, keyboard shortcuts, etc.

```tsx
import { Lists, ListsOptions } from '@prezly/slate-lists';

const options: ListsOptions = {
    /* ... */
};
const lists = Lists(options);

const MyComponent = ({ editor }) => (
    <>
        <button onClick={() => lists.wrapInList(editor, 'bulleted-list')}>Bulleted list</button>
        <button onClick={() => lists.wrapInList(editor, 'numbered-list')}>Numbered list</button>
        <button onClick={() => lists.unwrapList(editor)}>Remove list</button>
    </>
);
```

The `lists` object has the following methods:

```tsx
/**
 * Returns true when editor.deleteBackward() is safe to call (it won't break the structure).
 */
canDeleteBackward(editor: Editor) => boolean

/**
 * Decreases nesting depth of all "list-items" in the current selection.
 * All "list-items" in the root "list" will become "default" nodes.
 */
decreaseDepth(editor: Editor) => void

/**
 * Decreases nesting depth of "list-item" at a given Path.
 */
decreaseListItemDepth(editor: Editor, listItemPath: Path) => void

/**
 * Returns all "list-items" in a given Range.
 * @param at defaults to current selection if not specified
 */
getListItemsInRange(editor: Editor, at: Range | null | undefined) => NodeEntry<Node>[]

/**
 * Returns all "lists" in a given Range.
 * @param at defaults to current selection if not specified
 */
getListsInRange(editor: Editor, at: Range | null | undefined) => NodeEntry<Node>[]

/**
 * Returns the "type" of a given list node.
 */
getListType(node: Node) => string

/**
 * Returns "list" node nested in "list-item" at a given path.
 * Returns null if there is no nested "list".
 */
getNestedList(editor: Editor, listItemPath: Path) => NodeEntry<Element> | null

/**
 * Returns parent "list" node of "list-item" at a given path.
 * Returns null if there is no parent "list".
 */
getParentList(editor: Editor, listItemPath: Path) => NodeEntry<Element> | null

/**
 * Returns parent "list-item" node of "list-item" at a given path.
 * Returns null if there is no parent "list-item".
 */
getParentListItem(editor: Editor, listItemPath: Path) => NodeEntry<Element> | null

/**
 * Increases nesting depth of all "list-items" in the current selection.
 * All nodes matching options.wrappableTypes in the selection will be converted to "list-items" and wrapped in a "list".
 */
increaseDepth(editor: Editor) => void

/**
 * Increases nesting depth of "list-item" at a given Path.
 */
increaseListItemDepth(editor: Editor, listItemPath: Path) => void

/**
 * Returns true when editor has collapsed selection and the cursor is in an empty "list-item".
 */
isCursorInEmptyListItem(editor: Editor) => boolean

/**
 * Returns true when editor has collapsed selection and the cursor is at the beginning of a "list-item".
 */
isCursorAtStartOfListItem(editor: Editor) => boolean

/**
 * Checks whether node.type is an Element matching any of options.listTypes.
 */
isList(node: Node) => node is Element

/**
 * Checks whether node.type is an Element matching options.listItemType.
 */
isListItem(node: Node) => node is Element

/**
 * Checks whether node.type is an Element matching options.listItemTextType.
 */
isListItemText(node: Node) => node is Element

/**
 * Returns true if given "list-item" node contains a non-empty "list-item-text" node.
 */
listItemContainsText(editor: Editor, node: Node) => boolean

/**
 * Moves all "list-items" from one "list" to the end of another "list".
 */
moveListItemsToAnotherList(editor: Editor, parameters: { at: NodeEntry<Node>; to: NodeEntry<Node>; }) => void

/**
 * Nests (moves) given "list" in a given "list-item".
 */
moveListToListItem(editor: Editor, parameters: { at: NodeEntry<Node>; to: NodeEntry<Node>; }) => void

/**
 * Sets "type" of all "list" nodes in the current selection.
 */
setListType(editor: Editor, listType: string) => void

/**
 * Collapses the current selection (by removing everything in it) and if the cursor
 * ends up in a "list-item" node, it will break that "list-item" into 2 nodes, splitting
 * the text at the cursor location.
 */
splitListItem(editor: Editor) => void

/**
 * Unwraps all "list-items" in the current selection.
 * No list be left in the current selection.
 */
unwrapList(editor: Editor) => void

/**
 * All nodes matching options.wrappableTypes in the current selection
 * will be converted to "list-items" and wrapped in "lists".
 */
wrapInList(editor: Editor, listType: string) => void
```

## Examples

TODO
