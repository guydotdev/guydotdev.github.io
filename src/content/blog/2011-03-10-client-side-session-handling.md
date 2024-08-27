---
title: 'Client-Side Session Handling'
date: 2011-03-10
---

OK. Let's say you've got some big, bulky, enterprisey application. This
application consists of an outer page (probably called index.jsp or something
like that) that never moves and assorted iframe tags for portlets and tabs.

The first through you probably have is "Ewwww, iframes, really?" You're second
thought is probably that this is an application very much like the one Guy
works with. And, I hope, your third thought is one of sympathy for me since I
have to work on such an application. But I digress, como siempre.

Also, this application has session data that needs to be shared between
portlets and tabs and across tabs and all other sorts of complex interactions.
And, you want to do this client side for performance reasons. How, pray tell,
can you do this without writing spaghetti code?

If you're really smart (and you are, right?) you're probably just saying that I
should use [HTML5 Local Storage](http://diveintohtml5.info/storage.html) and be
done with it. Great idea! I even wrote
[ProtonDB](https://github.com/guyroyse/proton-db), a framework to make this
sort of thing super-easy. But, alas, I'm stuck in Enterpriseland and HTML5 is
not permitted because it's new and we fear newness because it is fraught with
risk and uncertainty.

But, I do have an elegant solution to the problem and the key lies in the fact
that the parent page doesn't move. And since it doesn't move it can simply hold
my session state in a JavaScript object. I can define this object with one line
of code and import the .js file in all HTML pages (i.e. each portlet, tab, and
the outer page)

{% highlight javascript %}
var session = session || parent.session || {};
{% endhighlight %}

This code is simple and complex. Make sense of that! It assigns session if it
hasn't been assigned yet. Since the outer page loads first, it gets defined
there initially because session doesn't exist, and parent.session doesn't
exist. All of the iframes then evaluate this same code and session doesn't
exists but parent.session does. And, just in case someone _has_ defined this
already we'll always assign session to session if it exists.

To use the code simply modify the session object. For example:

{% highlight javascript %}
session.foo = 'bar'
{% endhighlight %}

Now I like to know what I've put in session so that I have a feel for how big
it is. So I actually use a slightly more complex pattern. I define a session
object with explicit accessors so the code tells me what's stored there. And I
use a closure so no one can mess with my internal state and they have to go
through the defined session object. Here's the code:

{% highlight javascript %}
var session = session || parent.session || (function() {
var sessionValues = {};
return {
setFoo : function(value) {
sessionValues.foo = value;
},
getFoo : function() {
return sessionValues.foo;
}
};
})();
{% endhighlight %}

In this case, you would use the code like this:

{% highlight javascript %}
session.setFoo('bar')
{% endhighlight %}

A little extra code, sure, but I think the value add is worth it.

While I hope you don't have to use this pattern and can instead just enjoy
HTML5 goodness, if you need it, here it is. Enjoy!
