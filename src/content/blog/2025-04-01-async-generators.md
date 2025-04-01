---
title: Finding Bigfoot with Async Generators + TypeScript
date: 2025-04-01
image: /images/bigfoot-flag.jpg
slug: finding-bigfoot-with-async-generators-and-typescript
---

Lately, I've been messing about with generators—of the synchronous and asynchronous varieties—using TypeScript. They're not something I've used much and I thought it'd be a good idea to get a little more well acquainted with them. And, of course, I like to share what I learn. So, let's commence with the sharing.

# Generators in TypeScript

Generators are special functions that generate a sequence of values and return [iterators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator). For stand-alone functions, you define them by putting a `*` immediately after the `function` keyword. For functions in a class, including static ones, you put it right before the function name itself.

```typescript
function* someNumbers(): Generator<number> {...}

class NumberGenerators {
  static *someNumbers(): Generator<number> {...}
}
```

Generators then return data using the `yield` keyword.

```typescript
function* someNumbers(): Generator<number> {
  yield 1
  yield 2
  yield 3
}
```

You can then access these values just like any iterator by looping calls to `.next()` or by using a `for...of` loop.

```typescript
const generator = someNumbers()

while (true) {
  const { value, done } = generator.next()
  if (done) break
  console.log(value)
}

for (const value of someNumbers()) {
  console.log(value)
}
```

Now, this might not sound all that interesting as, after all, you could do this by simply returning an array. However, the magic is in that `yield` keyword. A generator isn't actually executed until you—or your `for...of` loop—calls `.next()`. Once you—or it—does, the code runs right up to the `yield` statement, returns the value, and then pauses the execution until the next call to `.next()`.

Generators don't have to end. They can just keep on going forever. For example, you could create a generator that returns numbers from 1 to infinity and just call `.next()` until you're sick of it. Or, you can use a `for...of` to create an infinite loop.

```typescript
function* allNumbers(): Generator<number> {
  let i = 0
  while (true) yield i++
}

for (const value of allNumbers()) {
  console.log(value)
}
```

# Asynchronous Generators

Generators can also be asynchronous. This means that instead of yielding values they yield [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). To make an asynchronous generator just mark your generator functions as `async` and `yield` Promises.

```typescript
async function* allAsyncNumbers(): AsyncGenerator<number> {
  let i = 0
  while (true) yield Promise.resolve(i++)
}
```

To consume them, you can either call `.next()` and `await` the `Promise` or use a `for await...of` loop and not think about promises. Personally, I'm a fan of the latter.

```typescript
const generator = allAsyncNumbers()
while (true) {
  const { value, done } = await generator.next()
  if (done) break
  console.log(value)
}

for await (const value of allAsyncNumbers()) {
  console.log(value)
}
```

# Doing Something Allegedly Useful

Of course, these examples are just toys. A more proper use for asynchronous generators is handling things like reading files, accessing network services, and calling slow running things like AI models. So, I'm going to use an asynchronous generator to access a networked service. That service is [Redis](https://redis.io) and we'll be using [Node Redis](https://redis.io/docs/latest/develop/clients/nodejs/) and [Redis Query Engine](https://redis.io/docs/latest/develop/interact/search-and-query/) to find Bigfoot.

I'm not gonna get into the details on connecting to Redis or on how to create a schema for Redis Query Engine. There's plenty out there about that already, some of it created by me. And, I have a [repo with all the details](https://github.com/guyroyse/async-generators-search) anyhow.

However, this is TypeScript so we are gonna start out by defining some types. First, the `BigfootSighting` type. This type matches the [JSON](https://redis.io/docs/latest/develop/data-types/json/) that we are getting out of Redis. It's just a bunch of carefully arranged strings.

```typescript
type BigfootSighting = {
  id: string
  title: string
  account: string
  classification: string
  location: {
    county: string
    state: string
    lnglat: string
  }
}
```

The generator itself takes a Redis query, which is just a `string` and, of course, returns the generator.

Inside the generator, we start a loop that calls `.ft.search()` until there are no more results. As each result has multiple JSON documents—_ahem_—I mean Bigfoot sightings. Totally Bigfoot sightings. I cast it and everything.

As each result has multiple _Bigfoot sightings_, we need to loop over those too, yielding them as we go.

```typescript
async function* fetchBigfootSightings(query: string): AsyncGenerator<BigfootSighting> {
  let offset = 0
  let hasMore = true

  while (hasMore) {
    /* Get a page of data. */
    const options: SearchOptions = {
      LIMIT: { from: offset, size: PAGE_SIZE },
      DIALECT: 4 // The latest dialect. Supports cool stuff like vector search.
    }

    const result = await redis.ft.search(INDEX_NAME, query, options)

    /* Loop over the resulting documents and yield them. */
    for (const document of result.documents) {
      /*
        There's only one value in the document and technically it's in a
        property named '0' but this looks better.
      */
      yield document.value[0] as BigfootSighting
    }

    /* Prepare for the next page. */
    hasMore = result.total > offset
    offset += PAGE_SIZE
  }
}
```

Remember, the code pauses execution after every yield. So, we won't make another network call until after we've consumed the first page of sightings. This is great, because if our code decides to not consume all the results, say by calling break in our `for await...of` loop or just not calling `.next()` again, we don't have to make another network call. Less is more.

Another nice perk here is memory efficiency. Since we’re yielding one sighting at a time and waiting between calls, we’re not slurping the entire dataset into memory all at once. That means if there are thousands of Bigfoot sightings—and you know [there are](https://bfro.net/GDB/)—we’re only dealing with them as needed. It’s lazy in the best possible way.

# Wrapping Up

So, that's generators. Let's wrap up by wrapping up some calls to this generator to execute "meaningful" queries for your application. Here's a few that will help you find Bigfoot.

```typescript
function fetchAll(): AsyncGenerator<BigfootSighting> {
  return fetchBigfootSightings('*')
}

function fetchByKeywords(keywords: string): AsyncGenerator<BigfootSighting> {
  return fetchBigfootSightings(keywords)
}

function fetchByClassification(classification: string): AsyncGenerator<BigfootSighting> {
  return fetchBigfootSightings(`@classification:{${classification}}`)
}

function fetchByState(state: string): AsyncGenerator<BigfootSighting> {
  return fetchBigfootSightings(`@state:${state}`)
}

function fetchByCountyAndState(county: string, state: string): AsyncGenerator<BigfootSighting> {
  return fetchBigfootSightings(`@county:${county} @state:${state}`)
}

function fetchByLocation(longitude: number, latitude: number, radiusInMiles: number): AsyncGenerator<BigfootSighting> {
  return fetchBigfootSightings(`@lnglat:[${longitude} ${latitude} ${radiusInMiles} mi]`)
}
```

Happy hunting!
