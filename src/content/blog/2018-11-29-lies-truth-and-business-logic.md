---
title: 'Machine Learning for Developers: Lies, Truth, and Business Logic'
date: 2018-11-29
image: /images/toy-robot.jpg
altText: A blue toy robot
slug: lies-truth-and-business-logic
---

When I first heard about machine learning, my reaction was pretty much "meh". I didn't care. I didn't see it affecting me or my job all that much. I was busy writing software. Software which was primarily focused on pulling data from some remote source, applying rules to that data, and putting it on a screen. Machine learning wasn't going to change that.

Actually, that’s a bald-faced lie. I was terrified. There was this new technology out there that I had to master or I would be "left behind". And this time, it wasn't just a new programming language or JavaScript framework. It was something completely different. I had no idea how it was going to affect the software I wrote, but it was going to be bad.

Well, it turns out, I had it all backward. My bald-faced lie wasn’t a lie. Machine learning fit really well into what I was already doing and, while certainly different, it wasn't shockingly so and didn’t justify my terror. Let me explain with what may seem like a digression about "business logic".

Business logic is that bit of code that sits between the "presentation" (i.e. what the user sees) and the "data" (i.e. the information we have). It's a sort of two-way adapter that takes the data and presents it to the user in a meaningful way and takes meaningful input from the user and saves it in a technical way.

For a simple application, there is often little to be had in the way of business logic. The data matches what the user wants to see and so these applications focus on just putting data on a screen (or perhaps a piece of paper). They tended to be easy to write and maintain because there's no significant logic to be had.

Of course, eventually, you need a bit more. The user enters a particular value–notify them of a particular thing. The data has some special value–display some special thing. Rules like these are the business logic of the application. They start out simple and, for this reason, are often mistakenly put in the presentation or the data layers out of expediency or inexperience. But they rapidly get quite complex and you end up with a steaming plate of spaghetti code. Solution: give them their own layer.

But that business logic layer itself can get quite complex as rules grow and expand. I spent a fair bit of my career working for an insurance company where I saw this firsthand. If the state is Ohio and the county is Cuyahoga and the EPA check of the vehicle is no older than 90 days, do one thing. But if the county is Franklin or Cuyahoga (but not any other counties) and the EPA check is no older than 60 days do some other thing. Craziness! Code like this can swiftly spiral out of control into a marinara covered pile of noodles.

Often, the solution to this problem is a rules engine. Instead of writing a deeply nested set of hard to understand conditions, you define all your rules in an external piece of software and use that software to execute your rules. Rules engines are optimized for managing these rules and can even expose them to the business itself instead of just the developers. But sometimes even rules engines become difficult to manage and it becomes hard to understand how the rules are interacting within it. Eventually, instead of spaghetti code, you end up with a heaping portion of spaghetti rules with a side of meatballs.

At this point, there is an important realization to make. All of these approaches fall down in the face of excessive complexity. They have differing thresholds, to be sure. But, with enough complexity, they all become unmanageable. Once you've implemented a rules engine have you've hit the end of the line?

Oh. Hello there, machine learning.

Machine learning is like a rules engine on steroids. It allows us to create rules that encapsulate complex patterns that would otherwise be nigh impossible. But instead of us using it to define our rules, it _finds_ the rules and then encodes them for us. All we have to provide it are examples and correct answers (i.e. features and labels) and it will create an abstraction we can use to exercise those rules (i.e. a model).

That's a pretty neat trick!

Does that mean models should replace all business logic? Of course not. Rules engines didn't replace all the business logic we coded. It augmented it. Sometimes a simple conditional in our code works just fine. And sometimes business logic is better managed with a rules engine. It's not a question of code vs. rules engines vs. machine learning. It's a menu from which we pick what we need. The business logic of our application, that layer between our data and our users, can be made of many things: simple rules in code, rules engines, and now machine learning models.

Machine learning, it turns out, doesn't change what I'm doing. I'm still writing software which is primarily focused on pulling data from some remote source, applying rules to that data, and putting it on a screen. It's just that we found a new way to encapsulate rules that before were too complex for us to manage or, in some cases, even define.

And that's not scary. That's empowering!

_This post originally appeared on [DataRobot.com](https://blog.datarobot.com/machine-learning-for-developers-lies-truth-and-business-logic)._
