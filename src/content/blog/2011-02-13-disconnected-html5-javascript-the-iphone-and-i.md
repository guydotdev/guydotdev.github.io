---
title: 'Disconnected HTML5, JavaScript, the iPhone & I'
date: 2011-02-23
slug: disconnected-html5-javascript-the-iphone-and-i
---

I've been working on a simple test case for a disconnected HTML5 application
for the iPhone/iTouch off and on for the past couple of weeks. It's a points
calculator for a popular weight loss program who shall remain anonymous.
Anyhow, I thought this would be a handy tool for my wife and I and it would be
a nice and simple application to test a disconnected HTML5 application from the
iPhone.

So, I present to you [Puntos](http://files.guyroyse.com/puntos/). Full [source
code](https://github.com/guyroyse/puntos) is available on github but here's how
I wrote it.

# Step #1: Write an HTML5 and JavaScript Application

The application I developed is not remarkable. In fact, it is a simple math
problem. Peruse the source if you want details on how it works. The important
part is that it has the following files:

- index.html
- calculator.js
- calculator.css
- jquery.js

Just create the files for your application (or copy mine) and make it do what
it does. I'm assuming you know how to program in JavaScript and HTML.

# Step #2: Make it iPhone Friendly

If you want it to be a cool iPhone HTML5 application, you have to provide an
icon from the iPhone desktop. You can do this by creating a file called
_iphone-icon.png_ and placing it in the root of you project. This little file
is the _favicon.ico_ of the Apple Mobile world. It is a 45 pixel by 45 pixel
PNG that your iPhone or iTouch will use if you decided to save a link to a
website on your desktop.

So, just create this file with your favorite image editing program (I used
Gimp) and save it with the other files.

# Step #3: Add the Caching Magic

Here's where the fun comes in. We can finally make the application
disconnected. The magic lies in an attribute on the html tag pointing the
browser to a cache.manifest file. This file then tells the browser which files
to cache and serve up when there isn't a network connection.

So, simply add something like this to your HTML file.

```html
<html manifest="cache.manifest"></html>
```

This tells your browser to load up the file in the manifest attribute. The
filename can be anything but I would recommend having it end in .manifest as
this makes setting up the content type later much easier.

The _cache.manifest_ is simplicity itself:

```
CACHE MANIFEST
calculator.js
calculator.css
jquery.js
iphone-icon.png
```

It simple contains the words CACHE MANIFEST at the top and lists all the files
needed by the application.

You might note that I did not include the _index.html_ and you would be
correct. This is because the browser will assume that the file you loaded in
the initial request is part of the _cache.manifest_. No need to specify.
However, if you have several HTML files, you will need to specify them all in
your _cache.manifest_ as there is no way to know which file you entered the
application from.

# Step #4: Serving Up text/cache-manifest

It turns out that the _cache.manifest_ file must be served up with a content
type of _text/cache-manifest_. It also turns out that most web servers aren't
configured by default to do this since this is all bleeding edge and stuff.

So, you need to add it yourself. If you are using an apache server you can add
the content type to your _.htaccess_ file. Add the following line and you
should be golden.

```
AddType text/cache-manifest .manifest
```

# Step #5: Access the Application from Your iPhone & Troubleshoot

Your application should now work. So go access it. Then turn on Airplane Mode
and refresh the application. I should reload gorgeously. If it doesn't, go back
and troubleshoot. But you knew that already.

One caveat though. I had a hell of a time trying to get the application to work
disconnected until I rebooted my iTouch (I don't have an iPhone because I'm
lame). So, if everything looks like it should work but isn't then you might
want to try turning off your iPhone by pressing and holding the power button
until it shuts down completely.

So, those are the steps I followed to get my first disconnected iPhone
application working with HTML5, JavaScript, and some _cache.manifest_ magic.
Now go out and write me a game or something.

Also, for more information on HTML5 and disconnected applications check out
[this fine website](http://diveintohtml5.info/offline.html).
