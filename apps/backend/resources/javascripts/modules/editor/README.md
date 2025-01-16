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

| Package                                                                      | Readme                                            | Description                                                                                                                                                                                   |
|------------------------------------------------------------------------------| ------------------------------------------------- |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [@prezly/slate-types](https://www.npmjs.com/package/@prezly/slate-types)     | [README.md](packages/slate-types/README.md)       | TypeScript definitions for [Slate](https://www.slatejs.org/) document structure used at [Prezly](https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/slate)                        |
| [@prezly/slate-commons](https://www.npmjs.com/package/@prezly/slate-commons) | [README.md](packages/slate-commons/README.md)     | Low-level commands, utilities, plugins, types, etc. used throughout [Prezly](https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/slate)-[Slate](https://www.slatejs.org/) packages |
| [@prezly/slate-lists](https://www.npmjs.com/package/@prezly/slate-lists)     | [README.md](packages/slate-lists/README.md)       | The best [Slate](https://www.slatejs.org/) lists extension out there                                                                                                                          |
| [@prezly/slate-tables](https://www.npmjs.com/package/@prezly/slate-tables)   | [README.md](packages/slate-tables/README.md)      | The best [Slate](https://www.slatejs.org/) tables extension out there                                                                                                                         |
| [@prezly/slate-editor](https://www.npmjs.com/package/@prezly/slate-editor)   | [README.md](packages/slate-editor/README.md)      | The [Prezly](https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/slate-editor) [Slate](https://www.slatejs.org/) Editor                                                            |

# Development

In order to try changes made to the packages with the main application:

1. Link the root package and all sub-packages via PNPM workspace:

    ```yaml
    # pnpm-workspace.yaml
    packages:
        - "../../../slate"
        - "../../../slate/packages/*"
    ```

2. And then install normally:

   ```sh
   pnpm install
   ```

## Developing with the Prezly app:

The main Prezly application has a Makefile target to simplify the linking process.

1. Link the Slate repo and its subpackages with symlinks (adjust the paths to match your directory structure):
   ```sh
   cd apps/backend/linked_modules
   ln -s ../../../../slate
   ln -s ../../../../slate/packages/slate-types
   ln -s ../../../../slate/packages/slate-commons
   ln -s ../../../../slate/packages/slate-lists
   ln -s ../../../../slate/packages/slate-tables
   ln -s ../../../../slate/packages/slate-editor
   ```
   
2. Run `make link-modules` (in the `apps/backend` folder)
   
3. Build `@prezly/slate` repo code with `pnpm build` (in the `@prezly/slate` local working copy):

  ```sh
  pnpm build
  ```

4. Build or watch the backend app with `pnpm build` or `pnpm watch` (in the `apps/backend` folder)


## Setup

```Shell
pnpm install
pnpm build
```

## Publishing

```Shell
pnpm clean && pnpm install && pnpm release
```


---

Brought to you with :metal: by [Prezly](https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/slate).
