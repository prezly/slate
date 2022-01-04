## Glossary

### Plugin

As per Slate's [concept of plugins](https://docs.slatejs.org/concepts/07-plugins), "plugin" is a naming reserved for wrapping functions that directly mutate `editor` object. These wrapping functions always start with `with` prefix, e.g. `withDeserializeHtml`.

Our plugins work as an intermediary layer between our custom extensions and Slate editor. They provide the necessary framework that our extensions can then use.

### Extension

In previous versions of Slate, all plugins were equal in terms of implementation, but this has now changed.

We currently use an approach inspired by [udecode's Slate plugins](https://github.com/udecode/slate-plugins) which provides a basic framework for custom extensions.

The main purpose of an extension is to extend the editor's functionality WITHOUT mutating the `editor` object.

Extensions can describe several things, e.g.:
- how to render elements
- how to render leafs
- how to deserialize HTML
- how to apply decorations
- how to handle `keydown` events
- specify inline and void nodes


## Using hyperscript in tests

1. Make sure your test file has `.tsx` extension.
2. Include this comment at the top of your test file:

```tsx
/** @jsx jsx */
```

3. Import hyperscript JSX definitions from the module you're writing tests for:

```tsx
import { jsx } from './jsx';
```

4. Feel free to cast hyperscript JSX `as any` to satisfy TypeScript compiler, e.g.

```tsx
const editor = ((<editor>text</editor>) as unknown) as Editor;
```

5. Use JSX to represent document structure with elements such as:
```
<editor />
<h-text />
<cursor />
<anchor />
<focus />
```

You can look them up in https://github.com/prezly/slate/blob/master/packages/slate-hyperscript/src/index.ts and in `jsx.ts` file in respective extension directory (e.g. `modules/editor-v4-rich-formatting/jsx.ts`).
