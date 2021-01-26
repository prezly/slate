![alt Prezly ❤️ Slate](https://cdn.uc.assets.prezly.com/b9c8de97-cc75-4780-baa0-c9d9ac4c7c09/prezly-slate.png)

![Test](https://github.com/kamilmielnik/scrabble-solver/workflows/Test/badge.svg)
![Prettier](https://github.com/prezly/slate/workflows/Prettier/badge.svg)

[Prezly](https://www.prezly.com/) software built upon [Slate](http://slatejs.org/).

---

# Packages

| npm                                                                                | Badges                                                                                                                              | Readme                                           |
|------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| [@prezly/linear-partition](https://www.npmjs.com/package/@prezly/linear-partition) | ![Version](https://img.shields.io/npm/v/@prezly/linear-partition) ![License](https://img.shields.io/npm/l/@prezly/linear-partition) | [README.md](packages/linear-partition/README.md) |
| [@prezly/slate-renderer](https://www.npmjs.com/package/@prezly/slate-renderer)     | ![Version](https://img.shields.io/npm/v/@prezly/slate-renderer) ![License](https://img.shields.io/npm/l/@prezly/slate-renderer)     | [README.md](packages/slate-renderer/README.md)   |
| [@prezly/slate-types](https://www.npmjs.com/package/@prezly/slate-types)           | ![Version](https://img.shields.io/npm/v/@prezly/slate-types) ![License](https://img.shields.io/npm/l/@prezly/slate-types)           | [README.md](packages/slate-types/README.md)      |

# Development

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
