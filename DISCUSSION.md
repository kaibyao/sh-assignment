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

^ UPDATE: In retrospect, this wasn't necessary as I was able to get everything working with existing packages (I did install some new ones, however). In a real production app I'd want to update these to the latest versions + test them before deploying.

### Fixed issues + improvements

#### UI is basic, can be improved (done)

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

#### Specialties are just an array of strings (resolved)

There's a lot of duplicate specialties, and the specialties for each advocate is just a json payload of a string array... that's JSON-stringified (IE, it's not actually an array, but a JSON string representing an array of strings). If we ever want to do any kind of filtering / grouping / analysis on specialties, they will need to be their own data model / db table.

#### Search area improvements (resolved)

* It's just html (which isn't a problem on its own, except...)
* We are making stateful updates on the html element itself (prime candidate for React componentization).
* Some redundant information could be iconized.
* UX: "Reset" doesn't have to appear when the text box is empty.
* Could use filters for specialties, years of experience, degree, and city.
* The searching logic itself is basic and uses `.includes()` on every field, which can lead to perf issues when searching across many advocates. Would probably want to convert this to using a fuzzy-searching library (or if this were being productionized, to a search engine a la Algolia, ElasticSearch, TypeSense, etc.).

#### Currently fetching all advocates (resolved)

We currently fetch all advocate rows from the database. Given that we should assume that there are potentially hundreds of thousands of advocates, it would make sense to limit this via pagination.

### Other improvements & ideas I didn't get to due to time

#### Currently READ-only

There's no way to add or edit (or remove/archive) an advocate, and I suspect this is necessary for this kind of application.

We should have a way to add new advocates/specialties, as well as a way to edit existing ones.

UX Ideas for this are:
* Have a `+ New Advocate` button above the table (probably next to the pagination control).
* Clicking the button would either:
  1. Open up a side drawer/panel with a form for creating the advocate, along with a "Submit" button on the bottom, OR
  2. The existing view's table would create a "temporary" advocate row at the top of the list of advocates, with input fields in each column. The submit button would be in a new column on the right side of the table.
    * PRO: no need for a new "view" or to take the user out of their current context (faster implementation).
    * CON: depending on how many columns/fields we add for advocates, this could get noisy / hard to use. Idea number 1 is better to maintain in a complex app over a long period of time.
* There would be an "Edit" button in a new column on the right side of the table that opens up the same view, except with field values pre-filled (this would be the same column as the new one in idea number 2).
* Implementation details:
  * React context for managing form state.
  * Create + Edit component wrappers that include the react context provider.
  * Form component is a child of the context and uses context handlers for updating state.
  * `onSubmit()` prop that can be passed in from either Create or Edit functions.

#### Sorting & filtering on Advocates Table

I'd probably want to eventually convert the table to a data-grid framework (like [agGrid](https://www.ag-grid.com/), or [Glide](https://grid.glideapps.com/)) to more easily support filtering & sorting + better performance when loading large datasets. We'd also want additional filter components (checkboxes, dropdowns, etc) above the table for filtering the data themselves.

#### We only have cities and not states

Feels like a larger feature improvement for this kind of assignment (this would be a future task if a real project), but we might want to filter/search on US-state and not just city, which would mean having a location model that links a city to a US-state.

#### More thoughtful styling

Using a default RadixUI theme for now to get basic layout and styling. If this were a full-fledged app, I'd probably want to start from the unstyled primitives instead and build off of that w/ specs given by the Design team.

#### Implement better logging

If we productionize this, console.log isn't going to cut it. Should probably use Pino or similar for better integration w/ DataDog/Prometheus/similar monitoring + logging tools.

#### Better separation of Server-side business vs data fetching logic

In an actual production app, we wouldn't be putting DB queries in the HTTP handlers themselves; rather we would have data-fetch calls inside a DAO/class/file dedicated to fetching from specific tables, and a middle service layer (for business logic) that handles calling the data-fetch and transforming + returning them back through the API handler/controller.

#### Update the Header Font

Solace uses [Mollie Glaston](https://www.1001fonts.com/mollie-glaston-font.html) as its title fonts... with more time I'd like to also do the same for the header title.

#### Format the phone #

The phone numbers are all unformatted 10-character strings. I'd want to format them such that they are displayed as `(xxx)yyy-zzzz`.

#### Mobile styling

HTML tables don't translate well to mobile. We should have an alternate mobile view that uses list-cards (cards containing 2 columns: 1 for the field label, and the other for the field value).

## AI Usage

* Environment setup w/ DB config.
* DB Schema model typing.
* Conversion of table to Radix table.
* Conversion of `specialties` data model.
* Adding pagination.
