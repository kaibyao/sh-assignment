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

### Problems noticed when running `npm run dev` the first time.

#### UI is basic, can be improved

Not a whole lot to say. Unstyled / hard to read. Some work can be done here to improve the basic layout to make this easier to read & browse for users.

Some things:
* "Solace Advocates" page title could be improved (Typography, logo, header styling?)
* Search area is all text-based (this is its own later section).
* Table layout / spacing / separation of contextual information

#### Nextjs hydration issue (fixed)

Next.js:
```
Error: Hydration failed because the initial UI does not match what was rendered on the server.
See more info here: https://nextjs.org/docs/messages/react-hydration-error

In HTML, <th> cannot be a child of <thead>.
This will cause a hydration error.
```

^ This seems like an easy fix.

#### JS error when searching (fixed)

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

#### `Advocate` data model is untyped. (fixed)

We have a number of typescript issues stemming from using the API endpoint to fetch & display various advocate attributes without them being typed, which leads to issues like the previous one.

#### Search area improvements

* It's just html (which isn't a problem on its own, except...)
* We are making stateful updates on the html element itself (prime candidate for React componentization).
* Some redundant information could be iconized.
* UX: "Reset" doesn't have to appear when the text box is empty.
* Could use filters for specialties, years of experience, degree, and city.
* The searching logic itself is basic and uses `.includes()` on every field, which can lead to perf issues when searching across many advocates. Would probably want to convert this to using a fuzzy-searching library (or if this were being productionized, to a search engine a la Algolia, ElasticSearch, TypeSense, etc.).

#### Currently fetching all advocates

We currently fetch all advocate rows from the database. Given that we should assume that there are potentially hundreds of thousands of advocates, it would make sense to limit this via pagination.

#### Currently READ-only

There's no way to add or edit (or remove/archive) an advocate, and I suspect this is necessary for this kind of application.

#### Specialties are just an array of strings

There's a lot of duplicate specialties, and the specialties for each advocate is just a json payload of a string array. If we ever want to do any kind of filtering / grouping / analysis on specialties, they will need to be their own data model / db table.

#### We only have cities and not states

Feels like a larger feature improvement for this kind of assignment (this would be a future task if a real project), but we might want to filter/search on US-state and not just city, which would mean having a location model that links a city to a US-state.
