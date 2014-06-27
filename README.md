skroller
========

Much like skrollr.js but using a single data-skroller attribute containing inline css

Syntax is:

```html
<[tag] class="skrollerSpecial" data-skroller="[scroll-level]:([css-style syntax]);[scroll-level]:([css-style syntax])..." >
```

Must be initialised by calling skroller.init(), then call for updates: <body onscroll="skroller.update()">
Elements can be added after initialisation either by calling skroller.init() again or skroller.addElem()..........

At the moment the script crashed my page when I tried to do more than two scroll levels on a single element. This is
 being looked at. Additionally, no minified code as of yet.

Current Bugs/Issues:
  - [ ] Non-mixed units for a transition
  - [ ] skroller will need re-init() on window resize
 
Future feature aims:
  - [ ] Transitions other than linear
  - [x] Not to crash on multiple (>2) levels
  - [ ] Non-explicit scroll-levels (e.g. at 50% scroll...) ***(Maybe, untested)
  - [ ] Do the onload and onscroll call bindings automatically
  - [ ] Find a less intensive way of doing the onscroll .update()
  - [ ] Minified version (When the main code is approaching anything like stability...)
