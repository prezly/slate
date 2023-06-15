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

Live: [https://ocbkit.csb.app/](https://ocbkit.csb.app/)

Source code: https://codesandbox.io/s/prezly-slate-lists-demo-ocbkit?file=/src/MyEditor.tsx

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
    type: 'ordered-list' | 'unordered-list'; // depends on your ListsSchema 
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

### 0. Basic Editor

Let's start with a minimal Slate + React example which we will be adding lists support to. 
Nothing interesting here just yet.

Live example: https://codesandbox.io/s/prezly-slate-lists-user-guide-0-basic-editor-veu8mp?file=/src/MyEditor.tsx

```tsx
import { useMemo, useState } from 'react';
import { createEditor, BaseElement, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, ReactEditor, RenderElementProps, Slate, withReact } from 'slate-react';

declare module 'slate' {
    interface CustomTypes {
        Element: { type: Type } & BaseElement;
    }
}

enum Type {
    PARAGRAPH = 'paragraph',
}

function renderElement({ element, attributes, children }: RenderElementProps) {
    switch (element.type) {
        case Type.PARAGRAPH:
            return <p {...attributes}>{children}</p>;
    }
}

const initialValue: Descendant[] = [{ type: Type.PARAGRAPH, children: [{ text: 'Hello world!' }] }];

export function MyEditor() {
    const [value, setValue] = useState(initialValue);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    return (
        <Slate editor={editor} value={value} onChange={setValue}>
            <Editable renderElement={renderElement} />
        </Slate>
    );
}

```

### 1. Define Lists Model

First, you're going to want to define the model to power the lists functionality.

You'll need at least three additional node types:

1. List Node
2. List Item Node
3. List Item Text Node

Additionally, you may want to split List Node into two types: ordered list and unordered list. Or alternatively,
achieve the split with an additional node property (like `listNode: ListType`).

In this example, for the sake of simplicity, we'll use two different node types:

1. Ordered List Node
2. Unordered List Node

Live example: https://codesandbox.io/s/prezly-slate-lists-user-guide-1-list-nodes-model-qyepe4?file=/src/MyEditor.tsx

```diff
 import { useMemo, useState } from 'react';
 import { createEditor, BaseElement, Descendant } from 'slate';
 import { withHistory } from 'slate-history';
 import { Editable, ReactEditor, RenderElementProps, Slate, withReact } from 'slate-react';

 declare module 'slate' {
     interface CustomTypes {
         Element: { type: Type } & BaseElement;
     }
 }
 
 enum Type {
     PARAGRAPH = 'paragraph',
+    ORDERED_LIST = 'ordered-list',
+    UNORDERED_LIST = 'unordered-list',
+    LIST_ITEM = 'list-item',
+    LIST_ITEM_TEXT = 'list-item-text',
 }
 
 function renderElement({ element, attributes, children }: RenderElementProps) {
     switch (element.type) {
         case Type.PARAGRAPH:
             return <p {...attributes}>{children}</p>;
+        case Type.ORDERED_LIST:
+            return <ol {...attributes}>{children}</ol>;
+        case Type.UNORDERED_LIST:
+            return <ul {...attributes}>{children}</ul>;
+        case Type.LIST_ITEM:
+            return <li {...attributes}>{children}</li>;
+        case Type.LIST_ITEM_TEXT:
+            return <div {...attributes}>{children}</div>;
     }
 }
 
 const initialValue: Descendant[] = [
     { type: Type.PARAGRAPH, children: [{ text: 'Hello world!' }] },
+    {
+        type: Type.ORDERED_LIST,
+        children: [
+            {
+                type: Type.LIST_ITEM,
+                children: [{ type: Type.LIST_ITEM_TEXT, children: [{ text: 'One' }] }],
+            },
+            {
+                type: Type.LIST_ITEM,
+                children: [{ type: Type.LIST_ITEM_TEXT, children: [{ text: 'Two' }] }],
+            },
+            {
+                type: Type.LIST_ITEM,
+                children: [{ type: Type.LIST_ITEM_TEXT, children: [{ text: 'Three' }] }],
+            },
+        ],
+    },
+    {
+        type: Type.UNORDERED_LIST,
+        children: [
+            {
+                type: Type.LIST_ITEM,
+                children: [{ type: Type.LIST_ITEM_TEXT, children: [{ text: 'Red' }] }],
+            },
+            {
+                type: Type.LIST_ITEM,
+                children: [{ type: Type.LIST_ITEM_TEXT, children: [{ text: 'Green' }] }],
+            },
+            {
+                type: Type.LIST_ITEM,
+                children: [{ type: Type.LIST_ITEM_TEXT, children: [{ text: 'Blue' }] }],
+            },
+        ],
+    },
 ];
 
 export function MyEditor() {
     const [value, setValue] = useState(initialValue);
     const editor = useMemo(() => withHistory(withReact(createEditor())), []);

     return (
         <Slate editor={editor} value={value} onChange={setValue}>
             <Editable renderElement={renderElement} />
         </Slate>
     );
 }
```

### 2. Define lists plugin schema and connect [`withLists`](src/lib/withLists.ts) plugin to your model.

[`withLists`](src/lib/withLists.ts) is a [Slate plugin](https://docs.slatejs.org/concepts/07-plugins) 
that enables [normalizations](https://docs.slatejs.org/concepts/10-normalizing) 
which enforce [schema](#Schema) constraints and recover from unsupported structures.

Live example: https://codesandbox.io/s/prezly-slate-lists-user-guide-2-add-withlists-plugin-r2xscj?file=/src/MyEditor.tsx

```diff
 import { useMemo, useState } from 'react';
 import { createEditor, BaseElement, Descendant, Element, Node } from 'slate';
 import { withHistory } from 'slate-history';
 import { Editable, ReactEditor, RenderElementProps, Slate, withReact } from 'slate-react';
+import { ListType, ListsSchema, withLists } from '@prezly/slate-lists';
 
 declare module 'slate' {
     interface CustomTypes {
         Element: { type: Type } & BaseElement;
     }
 }
 
 enum Type {
     PARAGRAPH = 'paragraph',
     ORDERED_LIST = 'ordered-list',
     UNORDERED_LIST = 'unordered-list',
     LIST_ITEM = 'list-item',
     LIST_ITEM_TEXT = 'list-item-text',
 }
 
+const schema: ListsSchema = {
+    isConvertibleToListTextNode(node: Node) {
+        return Element.isElementType(node, Type.PARAGRAPH);
+    },
+    isDefaultTextNode(node: Node) {
+        return Element.isElementType(node, Type.PARAGRAPH);
+    },
+    isListNode(node: Node, type?: ListType) {
+        if (type === ListType.ORDERED) {
+            return Element.isElementType(node, Type.ORDERED);
+        }
+        if (type === ListType.UNORDERED) {
+            return Element.isElementType(node, Type.UNORDERED);
+        }
+        return (
+            Element.isElementType(node, Type.ORDERED_LIST) ||
+            Element.isElementType(node, Type.UNORDERED_LIST)
+        );
+    },
+    isListItemNode(node: Node) {
+        return Element.isElementType(node, Type.LIST_ITEM);
+    },
+    isListItemTextNode(node: Node) {
+        return Element.isElementType(node, Type.LIST_ITEM_TEXT);
+    },
+    createDefaultTextNode(props = {}) {
+        return { children: [{ text: '' }], ...props, type: Type.PARAGRAPH };
+    },
+    createListNode(type: ListType = ListType.UNORDERED, props = {}) {
+        const nodeType = type === ListType.ORDERED ? Type.ORDERED_LIST : Type.UNORDERED_LIST;
+        return { children: [{ text: '' }], ...props, type: nodeType };
+    },
+    createListItemNode(props = {}) {
+        return { children: [{ text: '' }], ...props, type: Type.LIST_ITEM };
+    },
+    createListItemTextNode(props = {}) {
+        return { children: [{ text: '' }], ...props, type: Type.LIST_ITEM_TEXT };
+    },
+};
 
 function renderElement({ element, attributes, children }: RenderElementProps) {
     switch (element.type) {
         case Type.PARAGRAPH:
             return <p {...attributes}>{children}</p>;
         case Type.ORDERED_LIST:
             return <ol {...attributes}>{children}</ol>;
         case Type.UNORDERED_LIST:
             return <ul {...attributes}>{children}</ul>;
         case Type.LIST_ITEM:
             return <li {...attributes}>{children}</li>;
         case Type.LIST_ITEM_TEXT:
             return <div {...attributes}>{children}</div>;
     }
 }
 
 const initialValue: Descendant[] = [
     { type: Type.PARAGRAPH, children: [{ text: 'Hello world!' }] },
     {
         type: Type.ORDERED_LIST,
         children: [
             {
                 type: Type.LIST_ITEM,
                 children: [{ type: Type.LIST_ITEM_TEXT, children: [{ text: 'One' }] }],
             },
             {
                 type: Type.LIST_ITEM,
                 children: [{ type: Type.LIST_ITEM_TEXT, children: [{ text: 'Two' }] }],
             },
             {
                 type: Type.LIST_ITEM,
                 children: [{ type: Type.LIST_ITEM_TEXT, children: [{ text: 'Three' }] }],
             },
         ],
     },
     {
         type: Type.UNORDERED_LIST,
         children: [
             {
                 type: Type.LIST_ITEM,
                 children: [{ type: Type.LIST_ITEM_TEXT, children: [{ text: 'Red' }] }],
             },
             {
                 type: Type.LIST_ITEM,
                 children: [{ type: Type.LIST_ITEM_TEXT, children: [{ text: 'Green' }] }],
             },
             {
                 type: Type.LIST_ITEM,
                 children: [{ type: Type.LIST_ITEM_TEXT, children: [{ text: 'Blue' }] }],
             },
         ],
     },
 ];
 
 export function MyEditor() {
     const [value, setValue] = useState(initialValue);
+    const editor = useMemo(() => withLists(schema)(withHistory(withReact(createEditor()))), []);
 
     return (
         <Slate editor={editor} value={value} onChange={setValue}>
             <Editable renderElement={renderElement} />
         </Slate>
     );
 }
```

### 3. Add `onKeyDown` handler

`@prezly/slate-lists` comes with a pre-defined `onKeyDown` handler to implement keyboard interactions for lists.
For example, pressing `Tab` in a list will indent the current list item one level deeper. 
Pressing `Shift+Tab` will raise the current list item one level up.

Live example: https://codesandbox.io/s/prezly-slate-lists-user-guide-4-add-onkeydown-handler-5wpqxv?file=/src/MyEditor.tsx

```diff
 import { useMemo, useState } from 'react';
 import { createEditor, BaseElement, Descendant, Element, Node } from 'slate';
 import { withHistory } from 'slate-history';
 import { Editable, ReactEditor, RenderElementProps, Slate, withReact } from 'slate-react';
+import { ListType, ListsSchema, onKeyDown, withLists } from '@prezly/slate-lists';
 
 declare module 'slate' {
     interface CustomTypes {
         Element: { type: Type } & BaseElement;
     }
 }
 
 enum Type {
     PARAGRAPH = 'paragraph',
     ORDERED_LIST = 'ordered-list',
     UNORDERED_LIST = 'unordered-list',
     LIST_ITEM = 'list-item',
     LIST_ITEM_TEXT = 'list-item-text',
 }
 
 const schema: ListsSchema = {
     isConvertibleToListTextNode(node: Node) {
         return Element.isElementType(node, Type.PARAGRAPH);
     },
     isDefaultTextNode(node: Node) {
         return Element.isElementType(node, Type.PARAGRAPH);
     },
     isListNode(node: Node, type: ListType) {
         if (type) {
             return Element.isElementType(node, type);
         }
         return (
             Element.isElementType(node, Type.ORDERED_LIST) ||
             Element.isElementType(node, Type.UNORDERED_LIST)
         );
     },
     isListItemNode(node: Node) {
         return Element.isElementType(node, Type.LIST_ITEM);
     },
     isListItemTextNode(node: Node) {
         return Element.isElementType(node, Type.LIST_ITEM_TEXT);
     },
     createDefaultTextNode(props = {}) {
         return { children: [{ text: '' }], ...props, type: Type.PARAGRAPH };
     },
     createListNode(type: ListType = ListType.UNORDERED, props = {}) {
           const nodeType = type === ListType.ORDERED ? Type.ORDERED_LIST : Type.UNORDERED_LIST;
           return { children: [{ text: '' }], ...props, type: nodeType };
     },
     createListItemNode(props = {}) {
         return { children: [{ text: '' }], ...props, type: Type.LIST_ITEM };
     },
     createListItemTextNode(props = {}) {
         return { children: [{ text: '' }], ...props, type: Type.LIST_ITEM_TEXT };
     },
 };
 
 function renderElement({ element, attributes, children }: RenderElementProps) {
     switch (element.type) {
         case Type.PARAGRAPH:
             return <p {...attributes}>{children}</p>;
         case Type.ORDERED_LIST:
             return <ol {...attributes}>{children}</ol>;
         case Type.UNORDERED_LIST:
             return <ul {...attributes}>{children}</ul>;
         case Type.LIST_ITEM:
             return <li {...attributes}>{children}</li>;
         case Type.LIST_ITEM_TEXT:
             return <div {...attributes}>{children}</div>;
         default:
             return <div {...attributes}>{children}</div>;
     }
 }
 
 const initialValue: Descendant[] = [
     { type: Type.PARAGRAPH, children: [{ text: 'Hello world!' }] },
     {
         type: Type.ORDERED_LIST,
         children: [
             {
                 type: Type.LIST_ITEM,
                 children: [{ type: Type.LIST_ITEM_TEXT, children: [{ text: 'One' }] }],
             },
             {
                 type: Type.LIST_ITEM,
                 children: [{ type: Type.LIST_ITEM_TEXT, children: [{ text: 'Two' }] }],
             },
             {
                 type: Type.LIST_ITEM,
                 children: [{ type: Type.LIST_ITEM_TEXT, children: [{ text: 'Three' }] }],
             },
         ],
     },
     {
         type: Type.UNORDERED_LIST,
         children: [
             {
                 type: Type.LIST_ITEM,
                 children: [{ type: Type.LIST_ITEM_TEXT, children: [{ text: 'Red' }] }],
             },
             {
                 type: Type.LIST_ITEM,
                 children: [{ type: Type.LIST_ITEM_TEXT, children: [{ text: 'Green' }] }],
             },
             {
                 type: Type.LIST_ITEM,
                 children: [{ type: Type.LIST_ITEM_TEXT, children: [{ text: 'Blue' }] }],
             },
         ],
     },
 ];
 
 export function MyEditor() {
     const [value, setValue] = useState(initialValue);
     const editor = useMemo(() => withLists(schema)(withHistory(withReact(createEditor()))), []);
 
     return (
         <Slate editor={editor} value={value} onChange={setValue}>
             <Editable
+                onKeyDown={(event) => onKeyDown(editor, event)}
                 renderElement={renderElement}
             />
         </Slate>
     );
 }
```


### Good to go

Now you can use the [API exposed on the `ListsEditor` functions](#ListsEditor).

Be sure to check the [complete usage example](#Demo).

## API

There are JSDocs for all core functionality.

Only core API is documented although all utility functions are exposed. Should you ever need anything beyond the core API, please have a look at [`src/index.ts`](src/index.ts) to see what's available.

-   [`ListsSchema`](#ListsSchema)
-   [`withLists`](#withLists)
-   [`withListsSchema`](#withListsSchema)
-   [`withListsNormalization`](#withListsNormalization)
-   [`withListsReact`](#withListsReact)
-   [`ListsEditor`](#ListsEditor)

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

### [`withLists`](src/lib/withLists.ts)

`withLists()` is an all-in-one plugin initializer. 
It calls `withListsSchema()`, `withListsReact()`, and `withListsNormalization()` internall. 

```ts
/**
 * Mutate the Editor instance by adding all lists plugin functionality on top of it.
 */
withLists(schema: ListsSchema) => (<T extends Editor>(editor: T) => T)
```

### [`withListsSchema`](src/lib/withListsSchema.ts)

*Note: this is already included into `withLists()`.*

```ts
/**
 * Bind the given ListsSchema to the editor instance.
 * The schema is used by all lists operations.
 */
withListsSchema(schema: ListsSchema) => (<T extends Editor>(editor: T) => T)
```

### [`withListsNormalization`](src/lib/withListsNormalization.ts)

*Note: this is already included into `withLists()`.* 

```ts
/**
 * Enable normalizations that enforce schema constraints and recover from unsupported cases.
 */
withListsNormalization<T extends Editor>(editor: T): T
```

### [`withListsReact`](src/lib/withListsReact.ts)

*Note: this is already included into `withLists()`.*

```ts
/**
 * Enables Range.prototype.cloneContents monkey patch to improve pasting behavior
 * in few edge cases.
 */
withListsReact<T extends ReactEditor>(editor: T): T
```

### [`ListsEditor`](src/index.ts)

`ListsEditor` is a namespace export with all list-related editor utility functions. 
Most of them require an instance of `Editor` as the first argument.

> **Warning**: all `ListsEditor` methods expect a ListsSchema to be bound 
> to the editor instance with `withLists()` function prior to using them. 

Here are the functions methods:

```ts
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
 * Returns true if given "list-item" node contains a non-empty "list-item-text" node.
 */
isListItemContainingText(editor: Editor, node: Node) => boolean

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
wrapInList(editor: Editor, listType: ListType) => void
```

----

Brought to you by [Prezly](https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/slate-lists).
