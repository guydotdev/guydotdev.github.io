---
title: Weather Watching with Redis Streams + Event Emitters
date: 2025-04-22
image: /images/event-emmiters.jpg
slug: weather-watching-with-redis-stream-and-event-emitters
draft: true
---

Event emitters:

- what they are and when to use them—a thing happened (i.e. an event)
- What they are and when to use them: “A thing happened” style problems
- Common use cases: logging, alerting, updating UI, analytics, etc.
- we'll cover the basics but more in the docs
- we'll do it with weather

How to use them:

- instantiate an EventEmitter
- use `.on()` to listen for events
- use `.emit()` to trigger them

A better way to use them:

- extend the event emitter class
- class emits events internally based on logic
- consumers just listen—clean and decoupled

Generating events from a Redis stream:

- streamed weather data lands in Redis
  - maybe via radio (with link to Plucking Data workshop)
  - we're just gonna use XADD from Redis Insight
- class reads the end of the Redis stream and emits events
  - realtime update
  - nice decoupling—keeps the event ingestion and reaction logic cleanly separated
  - scales naturally—add sensors or listeners without changing core logic

CTA:

- read more about streams on the Redis website
- try it yourself, here's the link
