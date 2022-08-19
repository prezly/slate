# @prezly/slate-lists

The best Slate lists extension out there.

Demo: https://veu8mp.csb.app/ ([source code](https://codesandbox.io/s/prezly-slate-lists-user-guide-1-define-options-forked-veu8mp)).

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

Live: ttps://veu8mp.csb.app/

Source code: https://codesandbox.io/s/prezly-slate-lists-user-guide-1-define-options-forked-veu8mp

## Features

-   Nested lists
-   Customizable list types (ordered, bulleted, dashed - anything goes)
-   Transformations support multiple list items in selection
-   Normalizations recover from invalid structure (helpful when pasting)
-   Merges sibling lists of same type
-   `Range.prototype.cloneContents` monkey patch to improve edge cases that occur when copying lists

## Constraints

- There are two types of lists: ordered and unordered. 
  You can initialize the plugin to work with any project-level data model via [`ListsSchema`](src/types.ts).

- There is an assumption that there is a _default_ text node type to which the plugin can convert list-related nodes
  (e.g. during normalization, or unwrapping lists). Normally, this is a paragraph block, but it's up to you.

## Schema

- a **list** node can only contain **list item** nodes

- a **list item** node can contain either:
    - a **list item text** node
    - a pair of **list item text** node and a **list** node (in that order) (nesting lists)

- a **list** node can either:
    - have no parent node
    - have a parent **list item** node

<details>
<summary>As TypeScript interfaces...</summary>
<p>

Sometimes code can be better than words. Here are example TypeScript interfaces that describe the above schema (some schema rules are not expressible in TypeScript, so please treat it just as a quick overview).

```tsx
import { Node } from 'slate';

interface ListNode {
    children: ListItemNode[];
    type: 'bulleted-list' | 'numbered-list'; // depends on your ListsSchema 
}

interface ListItemNode {
    children: [ListItemTextNode] | [ListItemTextNode, ListNode];
    type: 'list-item'; // depends on your ListsSchema
}

interface ListItemTextNode {
    children: Node[]; // by default everything is allowed here
    type: 'list-item-text'; // depends on your ListsSchema
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

Let's start with a minimal Slate + React example which we will be adding lists support to. 
Nothing interesting here just yet.

Live example: https://codesandbox.io/s/prezlyslate-lists-user-guide-0-initial-state-9gmff?file=/src/MyEditor.tsx

```tsx
import { useMemo, useState } from 'react';
import { createEditor, Node } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

const initialValue: Node[] = [{ type: 'paragraph', children: [{ text: 'Hello world!' }] }];

export const MyEditor = () => {
    const [value, setValue] = useState(initialValue);
    const editor = useMemo(() => withReact(createEditor()), []);

    return (
        <Slate editor={editor} value={value} onChange={setValue}>
            <Editable />
        </Slate>
    );
};
```

### Define [`ListsSchema`](src/types.ts)

First you're going to want to define schema that will be passed to the extension. 
Just create an object matching the [`ListsSchema`](src/types.ts) interface.

Live example: https://codesandbox.io/s/prezly-slate-lists-user-guide-1-define-options-forked-cnew1g?file=/src/MyEditor.tsx

```diff
 import { useMemo, useState } from 'react';
-import { createEditor, Node } from 'slate';
+import { createEditor, Element, Node } from 'slate';
 import { Editable, Slate, withReact } from 'slate-react';
+import { type ListsSchema, ListType } from '@prezly/slate-lists';
+
+const schema: ListsSchema = {
+  isConvertibleToListTextNode(node) {
+    return Element.isElementType(node, 'paragraph');
+  },
+  isDefaultTextNode(node) {
+    return Element.isElementType(node, 'paragraph');
+  },
+  isListNode(node, type?) {
+    if (type === ListType.UNORDERED) return Element.isElementType(node, 'bulleted-list');
+    if (type === ListType.ORDERED) return Element.isElementType(node, 'numbered-list');
+    return Element.isElementType(node, 'bulleted-list') || Element.isElementType(node, 'numbered-list');
+  },
+  isListItemNode(node) {
+    return Element.isElementType(node, 'list-item');
+  },
+  isListItemTextNode(node) {
+    return Element.isElementType(node, 'list-item-text');
+  },
+  createDefaultTextNode({ children } = {}) {
+    return { 
+      type: 'paragraph', 
+      children: children ?? [{ text: '' }],
+    };
+  },
+  createListNode(type = ListType.UNORDERED, { children } = {}) {
+    return {
+      type: type === ListType.UNORDERED ? 'bulleted-list' : 'numbered-list',
+      children: children ?? [this.createListItemNode()],
+    };
+  },
+  createListItemNode({ children } = {}) {
+    return {
+      type: 'list-item',
+      children: children ?? [this.createListItemTextNode()],
+    };
+  },
+  createListItemTextNode({ children } = {}) {
+    return {
+      type: 'list-item-text',
+      children: children ?? [{ text: '' }],
+    };
+  },
+};

 const initialValue: Node[] = [{ type: 'paragraph', children: [{ text: 'Hello world!' }] }];

 export const MyEditor = () => {
     const [value, setValue] = useState(initialValue);
     const editor = useMemo(() => withReact(createEditor()), []);

     return (
         <Slate editor={editor} value={value} onChange={setValue}>
             <Editable />
         </Slate>
     );
 };
```

### Use [`withLists`](src/lib/withLists.ts) plugin

[`withLists`](src/lib/withLists.ts) is a [Slate plugin](https://docs.slatejs.org/concepts/07-plugins) 
that enables [normalizations](https://docs.slatejs.org/concepts/10-normalizing) 
which enforce [schema](#Schema) constraints and recover from unsupported structures.

Live example: https://codesandbox.io/s/prezly-slate-lists-user-guide-1-define-options-forked-llr5kw?file=/src/MyEditor.tsx

```diff
 import { useMemo, useState } from 'react';
 import { createEditor, Node } from 'slate';
 import { createEditor, Element, Node } from 'slate';
 import { Editable, Slate, withReact } from 'slate-react';
-import { type ListsSchema, ListType } from '@prezly/slate-lists';
+import { type ListsSchema, ListType, withLists } from '@prezly/slate-lists';
 
 const schema: ListsSchema = {
   isConvertibleToListTextNode(node) {
     return Element.isElementType(node, 'paragraph');
   },
   isDefaultTextNode(node) {
     return Element.isElementType(node, 'paragraph');
   },
   isListNode(node, type?) {
     if (type === ListType.UNORDERED) return Element.isElementType(node, 'bulleted-list');
     if (type === ListType.ORDERED) return Element.isElementType(node, 'numbered-list');
     return Element.isElementType(node, 'ordered-list') || Element.isElementType(node, 'numbered-list');
   },
   isListItemNode(node) {
     return Element.isElementType(node, 'list-item');
   },
   isListItemTextNode(node) {
     return Element.isElementType(node, 'list-item-text');
   },
   createDefaultTextNode({ children } = {}) {
     return { 
       type: 'paragraph', 
       children: children ?? [{ text: '' }],
     };
   },
   createListNode(type = ListType.UNORDERED, { children } = {}) {
     return {
       type: type === ListType.UNORDERED ? 'bulleted-list' : 'numbered-list',
       children: children ?? [this.createListItemNode()],
     };
   },
   createListItemNode({ children } = {}) {
     return {
       type: 'list-item',
       children: children ?? [this.createListItemTextNode()],
     };
   },
   createListItemTextNode({ children } = {}) {
     return {
       type: 'list-item-text',
       children: children ?? [{ text: '' }],
     };
   },
 };

 const initialValue: Node[] = [{ type: 'paragraph', children: [{ text: 'Hello world!' }] }];

 export const MyEditor = () => {
     const [value, setValue] = useState(initialValue);
-    const editor = useMemo(() => withReact(createEditor()), []);
+    const editor = useMemo(function() {
+       const baseEditor = withReact(createEditor());
+       return withLists(schema)(baseEditor);
+    }, []);

     return (
         <Slate editor={editor} value={value} onChange={setValue}>
             <Editable />
         </Slate>
     );
 };
```

### Use [`withListsReact`](src/lib/withListsReact.ts) plugin

[`withListsReact`](src/lib/withListsReact.ts) is useful on the client-side - 
it's a [Slate plugin](https://docs.slatejs.org/concepts/07-plugins) - that overrides `editor.setFragmentData`. 
It enables `Range.prototype.cloneContents` monkey patch to improve copying behavior in some edge cases.

Live example: https://codesandbox.io/s/prezly-slate-lists-user-guide-1-define-options-forked-pe7y8e?file=/src/MyEditor.tsx

```diff
 import { useMemo, useState } from 'react';
 import { createEditor, Node } from 'slate';
 import { createEditor, Element, Node } from 'slate';
 import { Editable, Slate, withReact } from 'slate-react';
-import { type ListsSchema, ListType, withLists } from '@prezly/slate-lists';
+import { type ListsSchema, ListType, withLists, withListsReact } from '@prezly/slate-lists';
 
 const schema: ListsSchema = {
   isConvertibleToListTextNode(node) {
     return Element.isElementType(node, 'paragraph');
   },
   isDefaultTextNode(node) {
     return Element.isElementType(node, 'paragraph');
   },
   isListNode(node, type?) {
     if (type === ListType.UNORDERED) return Element.isElementType(node, 'bulleted-list');
     if (type === ListType.ORDERED) return Element.isElementType(node, 'numbered-list');
     return Element.isElementType(node, 'ordered-list') || Element.isElementType(node, 'numbered-list');
   },
   isListItemNode(node) {
     return Element.isElementType(node, 'list-item');
   },
   isListItemTextNode(node) {
     return Element.isElementType(node, 'list-item-text');
   },
   createDefaultTextNode({ children } = {}) {
     return { 
       type: 'paragraph', 
       children: children ?? [{ text: '' }],
     };
   },
   createListNode(type = ListType.UNORDERED, { children } = {}) {
     return {
       type: type === ListType.UNORDERED ? 'bulleted-list' : 'numbered-list',
       children: children ?? [this.createListItemNode()],
     };
   },
   createListItemNode({ children } = {}) {
     return {
       type: 'list-item',
       children: children ?? [this.createListItemTextNode()],
     };
   },
   createListItemTextNode({ children } = {}) {
     return {
       type: 'list-item-text',
       children: children ?? [{ text: '' }],
     };
   },
 };

 const initialValue: Node[] = [{ type: 'paragraph', children: [{ text: 'Hello world!' }] }];

 export const MyEditor = () => {
     const [value, setValue] = useState(initialValue);
     const editor = useMemo(() => withReact(createEditor()), []);
     const editor = useMemo(function() {
        const baseEditor = withReact(createEditor());
-       return withLists(schema)(baseEditor);
+       return withListsReact(withLists(schema)(baseEditor));
     }, []);

     return (
         <Slate editor={editor} value={value} onChange={setValue}>
             <Editable />
         </Slate>
     );
 };
```

### Good to go

Now you can use the [API exposed on the `Lists` functions](#Lists).

Be sure to check the [complete usage example](#Demo).

## API

There are JSDocs for all core functionality.

Only core API is documented although all utility functions are exposed. Should you ever need anything beyond the core API, please have a look at [`src/index.ts`](src/index.ts) to see what's available.

-   [`ListsSchema`](#ListsSchema)
-   [`withLists`](#withLists)
-   [`withListsReact`](#withListsReact)
-   [`Lists`](#Lists)

### [`ListsSchema`](src/types.ts)

Lists schema wires the Lists plugin to your project-level defined Slate model. 
It is designed with 100% customization in mind, not depending on any specific node types, or non-core interfaces.

| Name                          | Description                                                                                                            |
|-------------------------------|------------------------------------------------------------------------------------------------------------------------|
| `isConvertibleToListTextNode` | Check if a node can be converted to a list item text node.                                                             |
| `isDefaultTextNode`           | Check if a node is a plain default text node, that list item text node will become when it is unwrapped or normalized. |
| `isListNode`                  | Check if a node is representing a list.                                                                                |
| `isListItemNode`              | Check if a node is representing a list item.                                                                           |
| `isListItemTextNode`          | Check if a node is representing a list item text.                                                                      |
| `createDefaultTextNode`       | Create a plain default text node. List item text nodes become these when unwrapped or normalized.                      |
| `createListNode`              | Create a new list node of the given type.                                                                              |
| `createListItemNode`          | Create a new list item node.                                                                                           |
| `createListItemTextNode`      | Create a new list item text node.                                                                                      |

### [`ListsEditor`](src/types.ts)

ListsEditor is an instance of Slate `Editor`, extends with `ListsSchema` methods:

```ts
type ListsEditor = Editor & ListsSchema;
```

### [`withLists`](src/lib/withLists.ts)

```ts
/**
 * Enables normalizations that enforce schema constraints and recover from unsupported cases.
 */
withLists(schema: ListsSchema) => (<T extends Editor>(editor: T) => T & ListsEditor)
```

### [`withListsReact`](src/lib/withListsReact.ts)

```ts
/**
 * Enables Range.prototype.cloneContents monkey patch to improve pasting behavior
 * in few edge cases.
 */
withListsReact<T extends ReactEditor & ListsEditor>(editor: T): T
```

### [`ListsEditor`](src/index.ts)

`ListsEditor` is a namespace export with all list-related editor utility functions. 
Most of them require an instance of [`ListsEditor`](#ListsEditor) as the first argument.  

Here are the functions methods:

```ts
/**
 * Returns true when editor.deleteBackward() is safe to call (it won't break the structure).
 */
canDeleteBackward(editor: ListsEditor) => boolean

/**
 * Decreases nesting depth of all "list-items" in the current selection.
 * All "list-items" in the root "list" will become "default" nodes.
 */
decreaseDepth(editor: ListsEditor) => void

/**
 * Decreases nesting depth of "list-item" at a given Path.
 */
decreaseListItemDepth(editor: ListsEditor, listItemPath: Path) => void

/**
 * Returns all "list-items" in a given Range.
 * @param at defaults to current selection if not specified
 */
getListItemsInRange(editor: ListsEditor, at: Range | null | undefined) => NodeEntry<Node>[]

/**
 * Returns all "lists" in a given Range.
 * @param at defaults to current selection if not specified
 */
getListsInRange(editor: ListsEditor, at: Range | null | undefined) => NodeEntry<Node>[]

/**
 * Returns the "type" of a given list node.
 */
getListType(node: Node) => string

/**
 * Returns "list" node nested in "list-item" at a given path.
 * Returns null if there is no nested "list".
 */
getNestedList(editor: ListsEditor, listItemPath: Path) => NodeEntry<Element> | null

/**
 * Returns parent "list" node of "list-item" at a given path.
 * Returns null if there is no parent "list".
 */
getParentList(editor: ListsEditor, listItemPath: Path) => NodeEntry<Element> | null

/**
 * Returns parent "list-item" node of "list-item" at a given path.
 * Returns null if there is no parent "list-item".
 */
getParentListItem(editor: ListsEditor, listItemPath: Path) => NodeEntry<Element> | null

/**
 * Increases nesting depth of all "list-items" in the current selection.
 * All nodes matching options.wrappableTypes in the selection will be converted to "list-items" and wrapped in a "list".
 */
increaseDepth(editor: ListsEditor) => void

/**
 * Increases nesting depth of "list-item" at a given Path.
 */
increaseListItemDepth(editor: ListsEditor, listItemPath: Path) => void

/**
 * Returns true when editor has collapsed selection and the cursor is in an empty "list-item".
 */
isCursorInEmptyListItem(editor: ListsEditor) => boolean

/**
 * Returns true when editor has collapsed selection and the cursor is at the beginning of a "list-item".
 */
isCursorAtStartOfListItem(editor: ListsEditor) => boolean

/**
 * Returns true if given "list-item" node contains a non-empty "list-item-text" node.
 */
isListItemContainingText(editor: ListsEditor, node: Node) => boolean

/**
 * Moves all "list-items" from one "list" to the end of another "list".
 */
moveListItemsToAnotherList(editor: ListsEditor, parameters: { at: NodeEntry<Node>; to: NodeEntry<Node>; }) => void

/**
 * Nests (moves) given "list" in a given "list-item".
 */
moveListToListItem(editor: ListsEditor, parameters: { at: NodeEntry<Node>; to: NodeEntry<Node>; }) => void

/**
 * Sets "type" of all "list" nodes in the current selection.
 */
setListType(editor: ListsEditor, listType: string) => void

/**
 * Collapses the current selection (by removing everything in it) and if the cursor
 * ends up in a "list-item" node, it will break that "list-item" into 2 nodes, splitting
 * the text at the cursor location.
 */
splitListItem(editor: ListsEditor) => void

/**
 * Unwraps all "list-items" in the current selection.
 * No list be left in the current selection.
 */
unwrapList(editor: ListsEditor) => void

/**
 * All nodes matching options.wrappableTypes in the current selection
 * will be converted to "list-items" and wrapped in "lists".
 */
wrapInList(editor: ListsEditor, listType: ListType) => void
```

----

Brought to you by [Prezly](https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/slate-lists).
