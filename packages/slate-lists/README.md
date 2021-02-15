# @prezly/slate-lists

The best Slate lists extension out there.

Supports nested lists & transformations on multiple selected items at the same time. Comes with opt-in normalizations.

API is based on https://github.com/GitbookIO/slate-edit-list. But it works much better :)

![Version](https://img.shields.io/npm/v/@prezly/slate-lists)
![License](https://img.shields.io/npm/l/@prezly/slate-lists)

## Documentation

-   [`Constraints`](#Constraints)
-   [`Schema`](#Schema)
-   [`API`](#API)
    -   [`ListsOptions`](#ListsOptions)
    -   [`Lists`](#Lists)
    -   [`withLists`](#withLists)
    -   [`withListsReact`](#withListsReact)
-   [`Examples`](#Examples)

### Constraints

-   all list-related nodes have a `type: string` attribute (you can customize the supported string values via [ListsOptions](src/types.ts))
-   there is a _default_ node `type` to which this extension can convert list-related nodes to (e.g. during normalization, or unwrapping lists)

### Schema

-   a **list** node can only contain **list item** nodes
-   a **list item** node can contain either:
    -   a **list item text** node
    -   a **list item text** node and a **list** node (nested list)
-   a **list** node can either:
    -   have no parent node
    -   have a parent **list item** node (in that order)
-   every **list**, **list item** and **list item text** node needs to have children

#### TypeScript interface

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

### API

Only core API is documented although all utility functions are exposed. Should you ever need anything beyond the core API, please have a look at [`src/index.ts`](src/index.ts) to see what's available.

-   [`ListsOptions`](#ListsOptions)
-   [`withLists`](#withLists)
-   [`withListsReact`](#withListsReact)
-   [`Lists`](#Lists)

#### `ListsOptions` ([source](src/types.ts))

First you're going to want to define options that will be passed to the extension. Just create an instance of [ListsOptions](src/types.ts) somewhere.

```tsx
import { ListsOptions } from '@prezly/slate-lists';

const options: ListsOptions = {
    defaultBlockType: 'paragraph',
    listItemTextType: 'list-item-text',
    listItemType: 'list-item,
    listTypes: ['ordered-list', 'unordered-list'],
    wrappableTypes: ['paragraph'],
};
```

#### `withLists<T extends Editor>(editor: T, options: ListsOptions): T` ([source](src/lib/withLists.ts))

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

#### `withListsReact<T extends ReactEditor>(editor: T): T` ([source](src/lib/withListsReact.ts))

You may also want to use `withListsReact` on the client-side - it's a [Slate plugin](https://docs.slatejs.org/concepts/07-plugins) that overrides `editor.setFragmentData`. It enables `Range.prototype.cloneContents` monkey patch to improve pasting behavior in some edge cases.

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

#### `Lists`

It's time to pass the [ListsOptions](src/types.ts) instance to `Lists` function. It will create an object (`lists`) with utilities and transforms bound to the options you passed to it. Those are the building blocks you're going to use when adding lists support to your editor. Use them to implement UI controls, keyboard shortcuts, etc.

```tsx
import { Lists, ListsOptions } from '@prezly/slate-lists';

const options: ListsOptions = {
    /* ... */
};
const lists = Lists(options);
```

The `lists` object has the following methods:

##### `decreaseDepth(editor: Editor) => void` ([source](src/lib/decreaseDepth.ts))

Decreases nesting depth of all "list-items" in the current selection. All "list-items" in the root "list" will become "default" nodes.

##### `decreaseListItemDepth(editor: Editor, listItemPath: Path) => void` ([source](src/lib/decreaseListItemDepth.ts))

Decreases nesting depth of "list-item" at a given Path. If the "list-item" is in the root "list", it will become a "default" node.

##### `getListItemsInRange(editor: Editor, at: Range | null | undefined) => NodeEntry<Node>[]` ([source](src/lib/getListItemsInRange.ts))

##### `getListsInRange(editor: Editor, at: Range | null | undefined) => NodeEntry<Node>[]` ([source](src/lib/getListsInRange.ts))

##### `getListType(node: Node) => string` ([source](src/lib/getListType.ts))

##### `getNestedList(editor: Editor, listItemPath: Path) => NodeEntry<Element> | null` ([source](src/lib/getNestedList.ts))

##### `getParentList(editor: Editor, listItemPath: Path) => NodeEntry<Element> | null` ([source](src/lib/getParentList.ts))

##### `getParentListItem(editor: Editor, listItemPath: Path) => NodeEntry<Element> | null` ([source](src/lib/getParentListItem.ts))

##### `increaseDepth(editor: Editor) => void` ([source](src/lib/increaseDepth.ts))

##### `increaseListItemDepth(editor: Editor, listItemPath: Path) => void` ([source](src/lib/increaseListItemDepth.ts))

##### `isList(node: Node) => node is Element` ([source](src/lib/isList.ts))

##### `isListItem(node: Node) => node is Element` ([source](src/lib/isListItem.ts))

##### `isListItemText(node: Node) => node is Element` ([source](src/lib/isListItemText.ts))

##### `listItemContainsText(editor: Editor, node: Node) => boolean` ([source](src/lib/listItemContainsText.ts))

##### `moveListItemsToAnotherList(editor: Editor, parameters: { at: NodeEntry<Node>; to: NodeEntry<Node>; }) => void` ([source](src/lib/moveListItemsToAnotherList.ts))

##### `moveListToListItem(editor: Editor, parameters: { at: NodeEntry<Node>; to: NodeEntry<Node>; }) => void` ([source](src/lib/moveListToListItem.ts))

##### `setListType(editor: Editor, listType: string) => void` ([source](src/lib/setListType.ts))

##### `splitListItem(editor: Editor) => void` ([source](src/lib/splitListItem.ts))

##### `unwrapList(editor: Editor) => void` ([source](src/lib/unwrapList.ts))

##### `wrapInList(editor: Editor, listType: string) => void` ([source](src/lib/wrapInList.ts))

### Examples

TODO
