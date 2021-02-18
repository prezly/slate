# @prezly/slate-hyperscript

Hyperscript helpers for creating [Slate](https://www.slatejs.org/) documents with JSX.

![Version](https://img.shields.io/npm/v/@prezly/slate-hyperscript)
![License](https://img.shields.io/npm/l/@prezly/slate-hyperscript)

## Description

This is a copy of [slate-hyperscript](https://github.com/ianstormtaylor/slate/tree/93fe25151722343488e9002a0ebd8ed3ba66ee95/packages/slate-hyperscript/src) package into our code (v0.58.0).

The only changes done to this code are:

-   formatting this code with prettier
-   adding `/* eslint-disable */` comments at the top of these files so that ESLint does not complain
-   prefixing unused function arguments with `_` to avoid TS6133

## Why

We need `createText` function in our code and `slate-hyperscript` package does not export it.

## Why do we need `createText` function in our code

Slate uses `createText` function for handling `<text>` elements in hyperscript.
This collides with `<text>` elements from [React TypeScript definitions](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0182cd9094aa081558a3c4bfc970bbdfb71d891d/types/react/index.d.ts#L3136).
That's why we need a different tag name to represent `text` elements from Slate.
We chose `h-text` for that tag name (and actually apply `h-` prefix for all other custom tag names). But to make it work we need `createText` function.

See `src/createHyperscript.ts` to see how it's composed.

----

Brought to you by [Prezly](https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/slate-hyperscript).
