# step 0

use your browser to open in a separate page the URLs

* `https://xkcd.now.sh/?comic=latest`
* `https://xkcd.now.sh/?comic=2583`
* `https://xkcd.now.sh/?comic=2582`

what does that content look like ?  
what can be the meaning of `num` and `img` fields ?

*hint*: numbers are sequential

# requirements

* use the usual naming scheme, i.e.
  * variables and functions in `lowercase` or `lowerCamelCase`
  * class names, if any, in `UpperCamelCase`
  * global constants in `UPPERCASE`
* as far as possible, your code should have the smallest possible footprint on
  the global namespace, i.e.
  * avoid declaring globals
  * as far as possible, confine them into functions; this is to avoid any
  possible conflict with other applications

# step 1

write a function `fetchIssue(num)` that

* fetches the URL  
  `https://xkcd.now.sh/?comic=`*`num`*
* decodes it contents
* displays the corresponding 'num' in the status area

## step 1b

check your work, by connecting the 'reset' button (↺) to `fetchIssue("latest")`

when else could/should we call this, to have the page start up more nicely ?

note that the status area **must display a number** (as opposed to
`latest`)

## step 1c

enhance the function so that the corresponding comics gets displayed in the `<img>` tag

# step 2

improve the display so that the image, as well as the status area, are centered
in the page and do not overlap each other

# step 3

for now we can only get the latest comic; we want to be able to move back and
forth using the 2 arrow buttons

change your code so that the application behaves that way; a suggested path to this end:

* change `fetchIssue` so that it returns the current `num` in addition to displaying it
* keep the current number in a state (a variable shared amongst all the
  functions)
* write `next()` and `previous()` functions and connect them to the buttons
* optionally, keep track of the latest number, and enable the 'next' button only
  when relevant

## step 3b (optional)

* keep track of the latest issue number, and disable the prev/next buttons when
  they will be ineffective
* display the issue date in addition to its number
* any improvement that you deem useful...

# step 4 (optional)

* refactor your code so that it becomes reusable

for example, you could write a class, that gets created from 5 css selectors, so
that the gist of `code.js` becomes (for example)

```
const xkcdBrower = XkcdBrowser(
    // how to find the 5 elements, from css selectors
    "#xkcd>img",
    "#num",
    "#previous",
    "#reset",
    "#next"
).start()
```

* add a second, independant, area in the page, that implements the same logic - possibly within a completely different layout
