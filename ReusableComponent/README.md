**CMSI 370** Interaction Design, Fall 2017

# Assignment 1215
We conclude your exposure to direct manipulation implementation with a different type of product—instead of a full application, this time you are asked to build a _reusable component_ that uses direct manipulation.

## Background Reading
The readings from [Assignment 1130](https://github.com/lmu-cmsi370-fall2017/assignments/blob/master/direct-manipulation.md) apply here also.

## For Submission

### Direct Manipulation Widget
We wrap up our programming work by going back to the basics: design and implement a reusable direct maniuplation widget for use in web browsers in general, and for your custom front end in particular. To emphasize reusability, implement your widget as a [jQuery plugin](https://learn.jquery.com/plugins/). As a reusable plugin, your widget must maintain a per-widget _model_ for storing the specific data/state of that instance of the widget. Further, you are to provide a _notification mechanism_ (either in the form of a callback or a genuine browser event) that informs users of your widget of relevant events, e.g., such as when the widget’s model value changes.

The point here is to see how low-level event handling (e.g., mouse/keyboard/touch activity) translate into higher-level ones (e.g., selection or change events). If [Assignment 1130](https://github.com/lmu-cmsi370-fall2017/assignments/blob/master/direct-manipulation.md) involved direct manipulation “in the large,” this one exercises direct manipulation “in the small.” Some ideas:

- A selection knob or slider
- A rolling or scrolling item selector
- An entry field that accepts text/numbers with drag-and-drop character tiles
- A “here-to-there” drag-and-drop area
- A directional pad (“d-pad”) control

If you have a widget idea that is not in this list, check with me to see if it will work.

You may use jQuery but Bootstrap use must be limited to _CSS only_—no Bootstrap JavaScript components allowed, whether in code or triggered by `data` attributes. To be more precise, aside from jQuery, _all other external JavaScript_ must be cleared by me first, and most definitely _all direct manipulation event-handling must be your own code_ and not handled by third-party libraries. For example, despite its name, the use of _jQuery UI_ is expressly prohibited.

The supplied repository includes three examples of reusable components _in general_, all with callback mechanisms, but _only the swivel control_ fulfills the direct-manipulation, no-Bootstrap-JavaScript specifications of this assignment.

### How to Turn it In
Commit your code in two places. Within _this_ repository, provide:

1. The reusable code for the widget (typically CSS and JavaScript)
1. The unit test suite for the widget (see the supplied sample code for examples)
1. A standalone demonstration page that shows an instance of your widget in action (see the supplied demonstration gallery page for examples)

Under your repository for the web front end assignment:

1. Commit the reusable code again (simulating the scenario where you might have downloaded someone’s widget code for use with your front end), and
1. Integrate your widget into the user interface that you have already built.

## Specific Point Allocations
Programming assignments are scored according to outcomes _3a_, _3b_, and _4a_ to _4f_ in the [syllabus](http://dondi.lmu.build/fall2017/cmsi370/cmsi370-fall2017-syllabus.pdf). For this particular assignment, graded categories are as follows:

| Category | Points | Outcomes |
| -------- | -----: | -------- |
| Direct manipulation implementation | 20 | _3a_, _3b_, _4a_, _4b_, _4d_ |
| Notification mechanism (callback/event) | 20 | _3a_, _3b_, _4a_, _4b_, _4d_ |
| Plugin model implementation | 20 | _3a_, _3b_, _4a_, _4b_, _4d_ |
| Web front end integration | 20 | _3a_, _3b_, _4a_, _4b_, _4d_ |
| Inappropriate third-party library use | deduction only | _4a_ |
| Test Suite and Coverage | 20 | _4a_ |
| Linting | deduction only | _4c_ |
| Version Control | deduction only | _4e_ |
| Punctuality | deduction only | _4f_ |
| **Total** | **100** |

“Deduction only” categories mean that you will only get points taken off if there are significant issues with those categories (or, in the case of third-party library use, the very presence of inappropriate third-party library code). Such issues include but are not limited to: lingering linting errors as of the final commit (_4c_), insufficiently granular or unmessaged commits (_4e_), and late commits (_4f_).
