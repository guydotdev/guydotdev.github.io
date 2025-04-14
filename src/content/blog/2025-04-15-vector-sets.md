---
title: A First Look at Vector Sets
date: 2025-04-15
image: /images/photomosaic.jpg
slug: a-first-look-at-vector-sets
draft: true
---

Last week, [Redis announced vector sets](https://redis.io/blog/announcing-vector-sets-a-new-redis-data-type-for-vector-similarity/)—a new data structure for Redis 8. They also annouced the release of [Redis 8 RC1](https://hub.docker.com/_/redis). Which means we can play with this new data structure. So, that's just where we're gonna do!

# Before We Get Started

Two big caveats before we dive into the details:

1. Even though they are part of Redis 8, _Vector sets are in beta_. They could change or even be removed from future versions of Redis. So, think about that before you ship code to production.

2. This post isn't intented to be an introduction to vectors, vector search, and embeddings. I'm going to assume that you have at least an inkling of what these things are. If you don't, watch [this talk](https://www.youtube.com/watch?v=Ybva5RiRBKQ) that I gave at [Jfokus](https://www.jfokus.se/) where I explain it in detail.

Disclaimer delivered. Now, on with the fun!

# What's a Vector Set

A vector set is a lot like other sets in Redis like the [sorted set](https://redis.io/docs/latest/develop/data-types/sorted-sets/) or the [plain old set](https://redis.io/docs/latest/develop/data-types/sets/). However, a vector set contains labeled points in a multi-dimensional space—think X-Y coordinates but with more axes. The labels are themselves are just simple strings. The points are a series of numbers—the coordinates in the multi-dimensional space. These numbers _are_ the vector.

I can add vectors to a vector set using the [VADD](https://redis.io/docs/latest/commands/vadd/) command. In this example I'm adding 512-dimensional embeddings of photos for a user named Alice. The `photoId` is being used as the label and the `embedding` returned from the call to `embedPhoto` are the vector:

```typescript
async function addPhotoToVectorSet(userId: string, photoId: string, pathToPhoto: string) {
  const embedding: number[] = await embedPhoto(pathToPhoto)
  const key = `user:${userId}:photos`
  const values: string[] = embedding.map(v => v.toString())
  const dims = embedding.length.toString()

  await redis.sendCommand(['VADD', key, 'VALUES', dims, ...values, photoId])
}

await addPhotoToVectorSet('alice', 'photo:42', '/photos/IMG_0042.png')
await addPhotoToVectorSet('alice', 'photo:23', '/photos/IMG_0023.png')
await addPhotoToVectorSet('alice', 'photo:13', '/photos/IMG_0013.png')
```

Note that I am using TypeScript here and [Node Redis](https://github.com/redis/node-redis), but this should translate nicely to whatever tool you're using. Vector sets are so bleeding edge that the client libraries don't even support them yet. So, we have to use the lower-level `.sendCommand()` function which accept a `string[]`. You're client library of choice will have some variation of this.

Also, the `.embedPhoto()` is, effectively, pseudocode. Your magic embedding code goes in there. If you want to take a peek at that magic, check out my [meme twin finding example](https://github.com/guyroyse/modern-problems-require-modern-solutions).

So, a vector set is a set of vectors, as the name suggests. In this case, those vectors are embeddings. This will almost always be the case.

# Using a Vector Set

Once you have vectors in a vector set, you can manipulate them:

```typescript
const key = `user:${userId}:photos`

// removes a photo from the set
await redis.sendCommand(['VREM', key, 'photo:42'])

// the cardinality of the set
await redis.sendCommand(['VCARD', key])

// the number of dimensions the vectors in the set have, 512 in our case
await redis.sendCommand(['VDIM', key])
```

This isn't exactly complex code, so you can just read the comments and learn what it does. The full details of all the commands are in [the docs](https://redis.io/docs/latest/develop/data-types/vector-sets/).

The more interesting command is [VSIM](https://redis.io/docs/latest/commands/vsim/). It lets you do a similarity search on the vector. There are two mains ways that you can do this. I'm calling them a _value search_ and an _element search_.

A value search find similar vectors using another embedding that the user provides. This is the classic semantic search use case:

```typescript
async function searchPhotos(userId: string, query: string): string[] {
  const embedding: number[] = await embedText(pathToPhoto)
  const key = `user:${user}:photos`
  const dims = embedding.length.toString()
  const values: string[] = embedding.map(v => v.toString())

  return await redis.sendCommand(['VSIM', key, 'VALUES', dims, ...values, 'COUNT', '3'])
}
```

An element search finds similar vectors using an existing vector, referenced by its label:

```typescript
async function similarPhotos(userId: string, photoId: string) {
  const key = `user:${user}:photos`
  return await redis.sendCommand(['VSIM', key, 'ELE', photoId, 'COUNT', '3'])
}
```

You can see how they might work nicely together:

```typescript
// returns photos matching the query
const foundPhotoIds: string[] = await searchPhotos('alice', 'Show me pictures of animals')

// returns photos similar to the first found photo
const firstFoundPhotoId = foundPhotoIds[0]
const similarPhotos: string[] = await similarPhotos('alice', firstFoundPhotoId)
```

And that's pretty much all you need to know to get started with vector sets.

# So What?

So, what's the big deal? I could do all of this with the [Redis Query Engine](https://redis.io/docs/latest/develop/interact/search-and-query/), right?

Absolutely—and in many cases, Redis Query Engine is still the right choice. It supports hybrid search, rich document indexing, and can scale across shards in a Redis cluster. If you're doing full-text search, filtering on structured data, and searching across millions of vectors, Redis Query Engine is the way to go.

Vector sets are offering something different. They're simpler, easier to work with, and perfect for use cases where data is naturally scoped—to a user, a device, a region, or a moment in time. You don’t need to define a schema. You don’t need to manage an index. You just add vectors and search them.

Of course, that's their limitation as well. The vector is the heart of a vector set—it's in the name! But there is no rich document indexing, querying attached JSON is a [filtered](https://redis.io/docs/latest/develop/data-types/vector-sets/filtered-search/) search and not a hybrid one, [scaling](https://redis.io/docs/latest/develop/data-types/vector-sets/scalability/)—while possible—requires manual effort.

So while there’s overlap in what you can build, the way you build it—and the trade-offs you make—are different. It’s not better vs. worse. It’s about using the right tool for the job.

If your application needs rich filtering, hybrid search, and global indexing, Redis Query Engine is the clear choice. But if you're building lightweight, fast, and highly scoped similarity search—especially for things like user-specific data or ephemeral sessions—vector sets can be a great fit.

That’s why the photo album example works so well for vector sets. Each user has their own vector set, so clustering and performance aren't a problem. You can quickly find similar photos, search by description, and build real-time recommendations—all without the overhead of Redis Query Engine.
