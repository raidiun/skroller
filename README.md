skroller
========

Much like skrollr.js but using a single data-skroller attribute containing inline css

Syntax is:

```html
<[tag] class="skrollerSpecial" data-skroller="[scroll-level]:([css-style syntax]);[scroll-level]:([css-style syntax])..." >
```

Values in the css section after a scroll level must be a numerical value optionally followed by a valid CSS unit.*
 This unit must remain the same throughout the (Issue #1) else the transition gets messed up.
 Also, in current code, scroll levels must be specified in order (Should be an easy fix though by sorting
 skr.vals array).
 
*Exceptions:
    - Hex colour values (e.g. #1a2b3c)
    - rgba color values (e.g. rgba(123,231,134,0.5))
    
NB: Currently all colours are converted to rgba form on writing the style to the element

Must be initialised by calling skroller.init(), then call for updates: <body onscroll="skroller.update()">
Elements can be added after initialisation either by calling skroller.init() again or skroller.addElem()..........

~~At the moment the script crashed my page when I tried to do more than two scroll levels on a single element. This is
 being looked at.~~ Fixed
 Additionally, no minified code as of yet.

Current Bugs/Issues:
  - [ ] No mixed units for transitions
  - [ ] skroller will need re-init() on window resize
 
Future feature aims:
  - [ ] Transitions other than linear
  - [x] Not to crash on multiple (>2) levels
  - [ ] Non-explicit scroll-levels (e.g. at 50% scroll...) ***(Maybe, untested)
  - [ ] Do the onload and onscroll call bindings automatically
  - [ ] Find a less intensive way of doing the onscroll .update()
  - [ ] Minified version (When the main code is approaching anything like stability...)
  - [ ] Remove the requirement for a class, use a hasAttribute('data-skroller') style check
  - [ ] Support for more complex numerical types like transformX(x,x,x,x...) and rotateX(x)
