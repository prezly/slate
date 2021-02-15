# @prezly/slate-lists

The best Slate lists extension out there.

Supports nested lists & transformations on multiple selected items at the same time. Comes with opt-in normalizations.

API is based on https://github.com/GitbookIO/slate-edit-list. But it works much better :)

![Version](https://img.shields.io/npm/v/@prezly/slate-lists)
![License](https://img.shields.io/npm/l/@prezly/slate-lists)

## API

Only core API is documented although all utility functions are exposed. Should you ever need anything beyond the core API, please have a look at [`src/index.ts`](src/index.ts) to see what's available.

### Assumptions

-   all list-related nodes have a `type: string` attribute (you can customize the supported string values via [ListsOptions](#ListsOptions))
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

### ListsOptions

```tsx
export interface ListsOptions {
    /**
     * Type of the node that "listItemTextType" will become when it is unwrapped or normalized.
     */
    defaultBlockType: string;

    /**
     * Type of the node representing list item text.
     */
    listItemTextType: string;

    /**
     * Type of the node representing list item.
     */
    listItemType: string;

    /**
     * Types of nodes representing lists.
     */
    listTypes: string[];

    /**
     * Types of nodes that can be converted into a node representing list item text.
     */
    wrappableTypes: string[];
}
```

### Lists

### `decreaseDepth(editor: Editor) => void`

-   decreaseListItemDepth
-   getListItemsInRange
-   getListsInRange
-   getListType
-   getNestedList
-   getParentList
-   getParentListItem
-   increaseDepth
-   increaseListItemDepth
-   isList
-   isListItem
-   isListItemText
-   listItemContainsText
-   moveListItemsToAnotherList
-   moveListToListItem
-   setListType
-   splitListItem
-   unwrapList
-   wrapInList

### withLists

### withListsReact
