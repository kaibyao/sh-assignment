# Discussion Topics

## Chronological Thought Process

Here I will detail the thoughts I have as I work on this assignment.

### `npm install` issues

```console
npm i
npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
npm warn deprecated @humanwhocodes/config-array@0.13.0: Use @eslint/config-array instead
npm warn deprecated @humanwhocodes/object-schema@2.0.3: Use @eslint/object-schema instead
npm warn deprecated @esbuild-kit/core-utils@3.3.2: Merged into tsx: https://tsx.is
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm warn deprecated @esbuild-kit/esm-loader@2.6.5: Merged into tsx: https://tsx.is
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated eslint@8.57.1: This version is no longer supported. Please see https://eslint.org/version-support for other options.

added 424 packages, and audited 425 packages in 16s
```

* Might warrant fixing some of these if they turn out to be significantly problematic.

### Setup issues

* .gitignore refers to `.env*.local`, but nextjs is configured to refer to `.env`...

### Problems noticed when running `npm run dev` the first time.

UI:
* Basic list view, UI can be significantly improved.

Next.js:
```
Error: Hydration failed because the initial UI does not match what was rendered on the server.
See more info here: https://nextjs.org/docs/messages/react-hydration-error

In HTML, <th> cannot be a child of <thead>.
This will cause a hydration error.
```

^ This seems like an easy fix.

Another error when searching:

```
Unhandled Runtime Error
TypeError: advocate.yearsOfExperience.includes is not a function

Source
src/app/page.tsx (32:36) @ includes

  30 |         advocate.degree.includes(searchTerm) ||
  31 |         advocate.specialties.includes(searchTerm) ||
> 32 |         advocate.yearsOfExperience.includes(searchTerm)
     |                                    ^
  33 |       );
  34 |     });
  35 |
```
