---
layout: post
title:  "A Belated Corporate Raiders Update"
date:   2009-10-12 22:23:00
---

So I haven't provided an update for y'all in quite some time but that doesn't
mean I haven't been busy working to build games and stories for your
consumption.  It also doesn't mean that I have been busy working on games and
stories for your consumption.  But I have.

So, it's a [Corporate Raiders](http://corporateraiders.hardboiledgeek.com/)
update today.  I went on a bit of a code binge for a while and made a lot of
changes to get the application to be mash-up friendly.  I also added lots of
JavaScript stuff to it as well.  These sort of went hand in hand.  The
significant update that you can actually see--an API.

I've added APIs to lot you access the actual data of the game so that you can
code against it and extend it in ways that I don't foresee.  Of course I also
plan to use this API to support other clients for the game.  In fact, I am
already using it on the main page of [Corporate
Raiders](http://corporateraiders.hardboiledgeek.com/).

If you want to check out the API for yourself you can access it using the following URLs:

{% highlight html %}
http://corporateraiders.hardboiledgeek.com/api/stock/{symbol}/{format}
http://corporateraiders.hardboiledgeek.com/api/market/{format}
{% endhighlight %}

Just replace _{symbol}_ with the stock symbol you care about.  For _{format}_
enter either _xml_ or _json_.  If you don't specify _{format}_, it will default
to _json_.  For example...

{% highlight html %}
http://corporateraiders.hardboiledgeek.com/api/stock/chch/xml
{% endhighlight %}

...will show you the info for [Chthonic Chemicals
Corporation](http://corporateraiders.hardboiledgeek.com/stock.jsp?stock=CHCH)
in XML. Either of these urls...

{% highlight html %}
http://corporateraiders.hardboiledgeek.com/api/stock/chch/json
http://corporateraiders.hardboiledgeek.com/api/stock/chch
{% endhighlight %}

...would show you that same info in JSON.

This API is ripe for consumption by fat client and portal device applications.
Got an [Android Phone](http://www.android.com/) or an
[iPhone](http://developer.apple.com/iphone/) and some spare time?  How about an
[Adobe Air](http://www.adobe.com/products/air/) client?  This would be a good
place for you to play.  And if you do something cool, tell me about it either
via [email](mailto:guy@guyroyse.com) or by leaving a comment.

Also, and perhaps more significantly, the market now moves.  Right now the
algorithm is completely random day by day and the incrementals are very
predictable over the course of a given day.  [Nonetheless, it
move](http://en.wikipedia.org/wiki/E_pur_si_muove).  Next, the plan is to
swap out the core engine with something a little more random so we can start
letting people actually buy and sell stocks.  Then, we'll add a more
event-based model so that we can have news items, rumors, and the like to
affect the stock price.  Insider trading here we come!

In the short term I plan to add users to the model as well as put some tasty
JavaScript stuff on the screen.  Tabs and accordions are probably where I'll
start.

So stay tuned.  I'll post updates as I go so that you can watch the sausage
being made.
