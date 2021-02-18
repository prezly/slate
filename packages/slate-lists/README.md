# @prezly/slate-lists

The best Slate lists extension out there.

Demo: https://h9xxi.csb.app/ ([source code](https://codesandbox.io/s/prezlyslate-lists-demo-complete-example-h9xxi)).

API inspired by https://github.com/GitbookIO/slate-edit-list.

![Version](https://img.shields.io/npm/v/@prezly/slate-lists)
![License](https://img.shields.io/npm/l/@prezly/slate-lists)

## Table of contents

-   [Demo](#demo)
-   [Features](#Features)
-   [Constraints](#Constraints)
-   [Schema](#Schema)
-   [Installation](#Installation)
-   [User guide](#User-guide)
-   [API](#API)

## Demo

Live: https://h9xxi.csb.app/

Source code: https://codesandbox.io/s/prezlyslate-lists-demo-complete-example-h9xxi

## Features

-   Nested lists
-   Customizable list types (ordered, bulleted, dashed - anything goes)
-   Transformations support multiple list items in selection
-   Normalizations recover from invalid structure (helpful when pasting)
-   Merges sibling lists of same type
-   `Range.prototype.cloneContents` monkey patch to improve edge cases that occur when copying lists

## Constraints

-   all list-related nodes have a `type: string` attribute (you can customize the supported string values via [`ListsOptions`](src/types.ts))
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
<summary>As TypeScript interfaces...</summary>
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

## Installation

### npm

```Shell
npm install --save @prezly/slate-lists
```

### yarn

```Shell
yarn add @prezly/slate-lists
```

## User guide

Let's start with a minimal Slate + React example which we will be adding lists support to. Nothing interesting here just yet.

Live example: https://codesandbox.io/s/prezlyslate-lists-user-guide-0-initial-state-9gmff?file=/src/MyEditor.tsx

```tsx
import { useMemo, useState } from 'react';
import { createEditor, Node } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

const initialValue: Node[] = [{ type: 'paragraph', children: [{ text: 'Hello world!' }] }];

const MyEditor = () => {
    const [value, setValue] = useState(initialValue);
    const editor = useMemo(() => withReact(createEditor()), []);

    return (
        <Slate editor={editor} value={value} onChange={setValue}>
            <Editable />
        </Slate>
    );
};

export default MyEditor;
```

### Define [`ListsOptions`](src/types.ts)

First you're going to want to define options that will be passed to the extension. Just create an object matching the [`ListsOptions`](src/types.ts) interface.

Live example: https://codesandbox.io/s/prezlyslate-lists-user-guide-1-define-options-m564b?file=/src/MyEditor.tsx

```diff
 import { useMemo, useState } from 'react';
 import { createEditor, Node } from 'slate';
 import { Editable, Slate, withReact } from 'slate-react';
+import { ListsOptions } from '@prezly/slate-lists';
+
+const options: ListsOptions = {
+  defaultBlockType: 'paragraph',
+  listItemTextType: 'list-item-text',
+  listItemType: 'list-item',
+  listTypes: ['ordered-list', 'unordered-list'],
+  wrappableTypes: ['paragraph']
+};

 const initialValue: Node[] = [{ type: 'paragraph', children: [{ text: 'Hello world!' }] }];

 const MyEditor = () => {
     const [value, setValue] = useState(initialValue);
     const editor = useMemo(() => withReact(createEditor()), []);

     return (
         <Slate editor={editor} value={value} onChange={setValue}>
             <Editable />
         </Slate>
     );
 };

 export default MyEditor;
```

### Use [`withLists`](src/lib/withLists.ts) plugin

[`withLists`](src/lib/withLists.ts) is a [Slate plugin](https://docs.slatejs.org/concepts/07-plugins) that enables [normalizations](https://docs.slatejs.org/concepts/10-normalizing) which enforce [schema](#Schema) constraints and recover from unsupported structures.

Live example: https://codesandbox.io/s/prezlyslate-lists-user-guide-2-use-withlists-plugin-5splt?file=/src/MyEditor.tsx

```diff
 import { useMemo, useState } from 'react';
 import { createEditor, Node } from 'slate';
 import { Editable, Slate, withReact } from 'slate-react';
-import { ListsOptions } from '@prezly/slate-lists';
+import { ListsOptions, withLists } from '@prezly/slate-lists';

 const options: ListsOptions = {
     defaultBlockType: 'paragraph',
     listItemTextType: 'list-item-text',
     listItemType: 'list-item',
     listTypes: ['ordered-list', 'unordered-list'],
     wrappableTypes: ['paragraph'],
 };

 const initialValue: Node[] = [{ type: 'paragraph', children: [{ text: 'Hello world!' }] }];

 const MyEditor = () => {
     const [value, setValue] = useState(initialValue);
-    const editor = useMemo(() => withReact(createEditor()), []);
+    const baseEditor = useMemo(() => withReact(createEditor()), []);
+    const editor = useMemo(() => withLists(options)(baseEditor), [baseEditor]);

     return (
         <Slate editor={editor} value={value} onChange={setValue}>
             <Editable />
         </Slate>
     );
 };

 export default MyEditor;
```

### Use [`withListsReact`](src/lib/withListsReact.ts) plugin

[`withListsReact`](src/lib/withListsReact.ts) is useful on the client-side - it's a [Slate plugin](https://docs.slatejs.org/concepts/07-plugins) that overrides `editor.setFragmentData`. It enables `Range.prototype.cloneContents` monkey patch to improve copying behavior in some edge cases.

Live example: https://codesandbox.io/s/prezlyslate-lists-user-guide-3-use-withlistsreact-plugin-rgubg?file=/src/MyEditor.tsx

```diff
 import { useMemo, useState } from 'react';
 import { createEditor, Node } from 'slate';
 import { Editable, Slate, withReact } from 'slate-react';
-import { ListsOptions, withLists } from '@prezly/slate-lists';
+import { ListsOptions, withLists, withListsReact } from '@prezly/slate-lists';

 const options: ListsOptions = {
     defaultBlockType: 'paragraph',
     listItemTextType: 'list-item-text',
     listItemType: 'list-item',
     listTypes: ['ordered-list', 'unordered-list'],
     wrappableTypes: ['paragraph'],
 };

 const initialValue: Node[] = [{ type: 'paragraph', children: [{ text: 'Hello world!' }] }];

 const MyEditor = () => {
     const [value, setValue] = useState(initialValue);
     const baseEditor = useMemo(() => withReact(createEditor()), []);
-    const editor = useMemo(() => withLists(options)(baseEditor), [baseEditor]);
+    const editor = useMemo(() => withListsReact(withLists(options)(baseEditor)), [baseEditor]);

     return (
         <Slate editor={editor} value={value} onChange={setValue}>
             <Editable />
         </Slate>
     );
 };

 export default MyEditor;
```

### Use [`Lists`](src/Lists.ts)

It's time to pass the [`ListsOptions`](src/types.ts) instance to [`Lists`](src/Lists.ts) function. It will create an object (`lists`) with utilities and transforms bound to the options you passed to it. Those are the building blocks you're going to use when adding lists support to your editor. Use them to implement UI controls, keyboard shortcuts, etc.

Live example: https://codesandbox.io/s/prezlyslate-lists-user-guide-4-use-lists-v5fop?file=/src/MyEditor.tsx

```diff
 import { useMemo, useState } from 'react';
 import { createEditor, Node } from 'slate';
 import { Editable, Slate, withReact } from 'slate-react';
-import { ListsOptions, withLists, withListsReact } from '@prezly/slate-lists';
+import { Lists, ListsOptions, withLists, withListsReact } from '@prezly/slate-lists';

 const options: ListsOptions = {
     defaultBlockType: 'paragraph',
     listItemTextType: 'list-item-text',
     listItemType: 'list-item',
     listTypes: ['ordered-list', 'unordered-list'],
     wrappableTypes: ['paragraph'],
 };
+
+ const lists = Lists(options);

 const initialValue: Node[] = [{ type: 'paragraph', children: [{ text: 'Hello world!' }] }];

 const MyEditor = () => {
     const [value, setValue] = useState(initialValue);
     const baseEditor = useMemo(() => withReact(createEditor()), []);
     const editor = useMemo(() => withListsReact(withLists(options)(baseEditor)), [baseEditor]);

     return (
         <Slate editor={editor} value={value} onChange={setValue}>
             <Editable />
         </Slate>
     );
 };

 export default MyEditor;
```

### Good to go

Now you can use the [API exposed on the `lists` instance](#Lists).

Be sure to check the [complete usage example](#Demo).

## API

There are JSDocs for all core functionality.

Only core API is documented although all utility functions are exposed. Should you ever need anything beyond the core API, please have a look at [`src/index.ts`](src/index.ts) to see what's available.

-   [`ListsOptions`](#ListsOptions)
-   [`withLists`](#withLists)
-   [`withListsReact`](#withListsReact)
-   [`Lists`](#Lists)

### [`ListsOptions`](src/types.ts)

All options are required.

| Name               | Type       | Description                                                                                                 |
| ------------------ | ---------- | ----------------------------------------------------------------------------------------------------------- |
| `defaultBlockType` | `string`   | Type of the node that `listItemTextType` will become when it is unwrapped or normalized.                    |
| `listItemTextType` | `string`   | Type of the node representing list item text.                                                               |
| `listItemType`     | `string`   | Type of the node representing list item.                                                                    |
| `listTypes`        | `string[]` | Types of nodes representing lists. The first type will be the default type (e.g. when wrapping with lists). |
| `wrappableTypes`   | `string[]` | Types of nodes that can be converted into a node representing list item text.                               |

### [`withLists`](src/lib/withLists.ts)

```tsx
/**
 * Enables normalizations that enforce schema constraints and recover from unsupported cases.
 */
withLists(options: ListsOptions) => (<T extends Editor>(editor: T) => T)
```

### [`withListsReact`](src/lib/withListsReact.ts)

```tsx
/**
 * Enables Range.prototype.cloneContents monkey patch to improve pasting behavior
 * in few edge cases.
 */
withListsReact<T extends ReactEditor>(editor: T): T
```

### [`Lists`](src/Lists.ts)

```tsx
/**
 * Creates an API adapter with functions bound to passed options.
 */
Lists(options: ListsOptions) => :ListsApiAdapter:
```

Note: `:ListsApiAdapter:` is actually an implicit interface (`ReturnType<typeof Lists>`).

Here are its methods:

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

----

Brought to you by [Prezly](https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/slate-lists).
