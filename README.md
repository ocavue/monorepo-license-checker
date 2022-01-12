# monorepo-license-checker

This is a simple wrapper for [license-checker-rseidelsohn](https://github.com/RSeidelsohn/license-checker-rseidelsohn) that allows you to check the license of your monorepo.

## CLI Usage

```bash
$ npm install -g monorepo-license-checker
$ cd your-monorepo
$ monorepo-license-checker
```

## CLI Options

```
$ monorepo-license-checker --help

Options:
  --json                    Output in JSON format.
  --csv                     Output in CSV format.
  --markdown                Output in markdown format.
  --excludePrivatePackages  Restrict output to not include any package marked as private.
  --help                    The text you are reading right now :)
```

## Call programmatically

```js
import { checkLicenses } from 'monorepo-license-checker';

const cwd = process.cwd();
checkLicenses(cwd).then((models) => {
    console.log(models);
})
```
