---
title: 'Installing RVM on Mavericks'
date: 2014-07-30
---

I find myself back in ruby land for a bit and it was time to help some of my
co-workers get RVM running on Mavericks. Having recently figured this out (and
needing to share it with more co-workers) I figured I'd share it with everyone.

These instructions will show you how to install RVM on Mavericks for a single
user. And, it's all pretty easy so no worries. We can handle this.

First off, make sure you don't already have RVM. Just look in your home
directory and make sure there is not a folder called .rvm.

{% highlight bash %}
$ ls ~/.rvm
ls: /Users/guy/.rvm: No such file or directory
{% endhighlight %}

If there is a folder called, this you can either remove it (scorched earth,
baby!) rename it, or go find another blog post on how to repair it.

Now, install RVM.

{% highlight bash %}
$ \curl -sSL https://get.rvm.io | bash -s stable
{% endhighlight %}

Once this is done you can verify everything is installed by checking the .rvm
folder.

{% highlight bash %}
$ ls ~/.rvm
...lots of stuff...
{% endhighlight %}

Hooray! It's installed. But it doesn't work. Well, that's because we ain't
done. You also need to add some stuff you the end -- and this is import --
**the end** of your startup scripts. If RVM finds that it is not at the top of
the $PATH environment variable it'll work but nag you like an old lady. Just
put it as the end.

I put them in .bashrc but you might put them in .bash_profile. Just make sure
they are the last thing to execute. Remember. Old lady.

{% highlight bash %}
[[-s "$HOME/.rvm/scripts/rvm"]] && source "$HOME/.rvm/scripts/rvm"
PATH=$PATH:$HOME/.rvm/bin
{% endhighlight %}

Once you do that, open a new terminal and install some rubies.

Enjoy!
