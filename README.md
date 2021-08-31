![alt Prezly ❤️ Slate](https://cdn.uc.assets.prezly.com/b9c8de97-cc75-4780-baa0-c9d9ac4c7c09/prezly-slate.png)

![Build](https://github.com/kamilmielnik/scrabble-solver/workflows/Build/badge.svg)
![Test](https://github.com/kamilmielnik/scrabble-solver/workflows/Test/badge.svg)
![Prettier](https://github.com/prezly/slate/workflows/Prettier/badge.svg)

[Prezly](https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/slate) software built upon [Slate](http://slatejs.org/).

---

# Packages

![Version](https://img.shields.io/npm/v/@prezly/slate-commons)
![License](https://img.shields.io/npm/l/@prezly/slate-commons)

Every package has been implemented with TypeScript.

Prezly-specific packages mention Prezly in the description. All other packages should be generic and reusable in any project.

| Package                                                                              | Readme                                            | Description                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------ | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@prezly/docx-cleaner](https://www.npmjs.com/package/@prezly/docx-cleaner)           | [README.md](packages/docx-cleaner/README.md)      | Normalize dirty HTML and DOCX/RTF documents into clean, understandable HTML                                                                                                                   |
| [@prezly/slate-commons](https://www.npmjs.com/package/@prezly/slate-commons)         | [README.md](packages/slate-commons/README.md)     | Low-level commands, utilities, plugins, types, etc. used throughout [Prezly](https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/slate)-[Slate](https://www.slatejs.org/) packages |
| [@prezly/slate-editor](https://www.npmjs.com/package/@prezly/slate-editor)           | [README.md](packages/slate-editor/README.md)      | The [Prezly](https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/slate-editor) [Slate](https://www.slatejs.org/) Editor                                                            |
| [@prezly/slate-hyperscript](https://www.npmjs.com/package/@prezly/slate-hyperscript) | [README.md](packages/slate-hyperscript/README.md) | Hyperscript helpers for creating [Slate](https://www.slatejs.org/) documents with JSX                                                                                                         |
| [@prezly/slate-lists](https://www.npmjs.com/package/@prezly/slate-lists)             | [README.md](packages/slate-lists/README.md)       | The best [Slate](https://www.slatejs.org/) lists extension out there                                                                                                                          |
| [@prezly/slate-renderer](https://www.npmjs.com/package/@prezly/slate-renderer)       | [README.md](packages/slate-renderer/README.md)    | Render [Slate](https://www.slatejs.org/) documents used at [Prezly](https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/slate)                                                     |
| [@prezly/slate-types](https://www.npmjs.com/package/@prezly/slate-types)             | [README.md](packages/slate-types/README.md)       | TypeScript definitions for [Slate](https://www.slatejs.org/) document structure used at [Prezly](https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/slate)                        |

# Development

For local development use [Playground](/packages/playground) project. It is a simple react application with all the sub-packages linked.

In order to start developing, run the playground project and related packages in watch mode.

On Linux systems use `make dev--linux` which builds all the packages in watch mode and provides a handy output management. It requires [multitail](https://linux.die.net/man/1/multitail) to be installed.

## Setup

```Shell
npm install         # install dependencies
npm run bootstrap   # bootstrap packages with lerna
npm run build       # build all packages
```

## Publishing

```Shell
npm run release     # reinstall & rebuild everything from scratch and...
                    # ...and run a wizard that'll guide you through bulk-publishing the npm packages
```

---

Brought to you by [Prezly](https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/slate).
