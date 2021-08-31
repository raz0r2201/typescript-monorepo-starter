# TypeScript + ESLint + Jest + Nodemon + Yarn Workspace Monorepo

[![license](https://img.shields.io/badge/license-MIT-ff4081.svg)](./LICENSE)

An Typescript Monorepo starter/boilerplate

Feel free to make issues!

## Typescript: [**Path Mapping**](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
```jsonc
{
  "paths": {
    // => import demo from '@raz0r2201/mypackage'
    "@raz0r2201/*": ["*/src"]
  }
}
```


## Lerna & Yarn
The Yarn workspace is designed to make it easy to use monorepos and solve one of the main use cases of yarn link in a more declarative way
