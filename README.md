![alt Prezly ❤️ Slate](https://cdn.uc.assets.prezly.com/b9c8de97-cc75-4780-baa0-c9d9ac4c7c09/prezly-slate.png)

[![Build](https://github.com/prezly/slate/actions/workflows/build.yml/badge.svg)](https://github.com/prezly/slate/actions/workflows/build.yml)
[![Test](https://github.com/prezly/slate/actions/workflows/test.yml/badge.svg)](https://github.com/prezly/slate/actions/workflows/test.yml)
[![Prettier](https://github.com/prezly/slate/actions/workflows/prettier.yml/badge.svg)](https://github.com/prezly/slate/actions/workflows/prettier.yml)

[Prezly](https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/slate) software built upon [Slate](http://slatejs.org/).

---

# Packages

![Version](https://img.shields.io/npm/v/@prezly/slate-commons)
![License](https://img.shields.io/npm/l/@prezly/slate-commons)

Every package has been implemented with TypeScript.

Prezly-specific packages mention Prezly in the description. All other packages should be generic and reusable in any project.

| Package                                                                              | Readme                                            | Description                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------ | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@prezly/slate-commons](https://www.npmjs.com/package/@prezly/slate-commons)         | [README.md](packages/slate-commons/README.md)     | Low-level commands, utilities, plugins, types, etc. used throughout [Prezly](https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/slate)-[Slate](https://www.slatejs.org/) packages |
| [@prezly/slate-editor](https://www.npmjs.com/package/@prezly/slate-editor)           | [README.md](packages/slate-editor/README.md)      | The [Prezly](https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/slate-editor) [Slate](https://www.slatejs.org/) Editor                                                            |
| [@prezly/slate-lists](https://www.npmjs.com/package/@prezly/slate-lists)             | [README.md](packages/slate-lists/README.md)       | The best [Slate](https://www.slatejs.org/) lists extension out there                                                                                                                          |
| [@prezly/slate-types](https://www.npmjs.com/package/@prezly/slate-types)             | [README.md](packages/slate-types/README.md)       | TypeScript definitions for [Slate](https://www.slatejs.org/) document structure used at [Prezly](https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/slate)                        |

# Development

In order to try changes made to the packages with the main application, 
link the root package to global npm prefix by running `npm link` in the root:

```sh
npm link
```

Then link the root package and its sub-packages to the main app with `npm link @prezly/slate`:

```sh
npm link @prezly/slate
rm -rf node_modules/@prezly/slate-{types,commons,lists,tables,editor}
ln -sf node_modules/@prezly/slate/packages/* node_modules/@prezly/
```

There's an `npm` task configured in our main application to simplify this routine:

```sh
pnpm link-slate-packages
```

## Setup

```Shell
pnpm bootstrap   # install dependencies
pnpm build       # build all packages
```

## Publishing

```Shell
pnpm release     # reinstall & rebuild everything from scratch and...
                    # ...and run a wizard that'll guide you through bulk-publishing the npm packages
```

---

Brought to you by [Prezly](https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/slate).
