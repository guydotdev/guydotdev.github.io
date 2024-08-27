---
title: 'Fun With Windows'
date: 2011-02-03
---

OK. Just spent 3 hours of my life that I will never get back trying to
troubleshoot and issue with Windows 7 and USB devices that I was having.
Figured it out so I thought I would share the problem and solution.

# The Problem

Whenever I would plug a new USB device in, it would not be detected by Windows.
Instead I would get a driver not found error and no amount of troubleshooting
on Windows' part would help. This affected a new keyboard and mouse I purchased
(Logitech MK520) and an old headset that I had lying around. It was also
affecting my iPod but I didn't realize that until after the fact.

In the case of my mouse and keyboard I would see in Device Manager a device
names USB Receiver with an annoyed looking yellow icon resting upon it. No
amount of messing with the icon helped.

All very frustrating because the hardware would detect the new keyboard and
mouse. When I booted the system and accessed the BIOS menu the keyboard worked.
The mouse was listed as detected. Everything seemed fine.

# Troubleshooting

After much searching of the web in frustration. (Did I mention it was
frustrating) I finally found some people actually having the same problem. No
solutions, mind you, but the same problem. I determined from the gist of all
this posts that it was something to do with the USB drivers. Not the mouse
drivers or the keyboard drivers or the headset drivers but the core USB drivers
from Windows 7.

So I removed them all in Device Manager and rebooted so they could be
reinstalled. This worked -- briefly. When the drivers were gone the mouse
started working. But Windows quickly fixed that and reinstalled the drivers and
I was back to a non-functioning mouse and keyboard.

# The Solution

Finally I came across some forum posts suggesting that
[usb.inf](/downloads/usb.inf) and
[usb.pnf](/downloads/usb.pnf) should exist in Windows\inf
and if they didn't that would cause this issue. So, I Googled to find the files
and copied them in. Then I removed the annoyed USB Receiver driver and detected
new devices.

Voila! It works.

Hope this helps someone else.
