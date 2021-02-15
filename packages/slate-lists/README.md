# @prezly/slate-lists

The best Slate lists extension out there.

Supports nested lists & transformations on multiple selected items at the same time. Comes with opt-in normalizations.

API is based on https://github.com/GitbookIO/slate-edit-list. But it works much better :)

![Version](https://img.shields.io/npm/v/@prezly/slate-lists)
![License](https://img.shields.io/npm/l/@prezly/slate-lists)

## Documentation

Only core API is documented although all utility functions are exposed. Should you ever need anything beyond the core API, please have a look at [`src/index.ts`](src/index.ts) to see what's available.

### Assumptions

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

## API

-   [`ListsOptions`](#ListsOptions)
-   [`Lists`](#Lists)
-   [`withLists`](#withLists)
-   [`withListsReact`](#withListsReact)

### `ListsOptions`

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

### `Lists`

The next step is to pass the [ListsOptions](src/types.ts) instance to `Lists` function. It will create an object with utilities and transforms bound to the options you passed to it.

```tsx
import { Lists } from '@prezly/slate-lists';

const options: ListsOptions = {
    /* ... */
};
const lists = Lists(options);
```

Now, the `lists` object has the following methods:

-   [`decreaseDepth(editor: Editor) => void`](src/lib/decreaseDepth.ts)
-   [`decreaseListItemDepth(editor: Editor, listItemPath: Path) => void`](src/lib/decreaseListItemDepth.ts)
-   [`getListItemsInRange(editor: Editor, at: Range | null | undefined) => NodeEntry<Node>[]`](src/lib/getListItemsInRange.ts)
-   [`getListsInRange(editor: Editor, at: Range | null | undefined) => NodeEntry<Node>[]`](src/lib/getListsInRange.ts)
-   [`getListType(node: Node) => string`](src/lib/getListType.ts)
-   [`getNestedList(editor: Editor, listItemPath: Path) => NodeEntry<Element> | null`](src/lib/getNestedList.ts)
-   [`getParentList(editor: Editor, listItemPath: Path) => NodeEntry<Element> | null`](src/lib/getParentList.ts)
-   [`getParentListItem(editor: Editor, listItemPath: Path) => NodeEntry<Element> | null`](src/lib/getParentListItem.ts)
-   [`increaseDepth(editor: Editor) => void`](src/lib/increaseDepth.ts)
-   [`increaseListItemDepth(editor: Editor, listItemPath: Path) => void`](src/lib/increaseListItemDepth.ts)
-   [`isList(node: Node) => node is Element`](src/lib/isList.ts)
-   [`isListItem(node: Node) => node is Element`](src/lib/isListItem.ts)
-   [`isListItemText(node: Node) => node is Element`](src/lib/isListItemText.ts)
-   [`listItemContainsText(editor: Editor, node: Node) => boolean`](src/lib/listItemContainsText.ts)
-   [`moveListItemsToAnotherList(editor: Editor, parameters: { at: NodeEntry<Node>; to: NodeEntry<Node>; }) => void`](src/lib/moveListItemsToAnotherList.ts)
-   [`moveListToListItem(editor: Editor, parameters: { at: NodeEntry<Node>; to: NodeEntry<Node>; }) => void`](src/lib/moveListToListItem.ts)
-   [`setListType(editor: Editor, listType: string) => void`](src/lib/setListType.ts)
-   [`splitListItem(editor: Editor) => void`](src/lib/splitListItem.ts)
-   [`unwrapList(editor: Editor) => void`](src/lib/unwrapList.ts)
-   [`wrapInList(editor: Editor, listType: string) => void`](src/lib/wrapInList.ts)

### withLists

### withListsReact
