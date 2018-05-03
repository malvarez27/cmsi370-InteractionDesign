**CMSI 370** Interaction Design, Fall 2017

# Assignment 1102

This assignment turns your attention to some _dynamic_ user interface code. Resources to help you with this include many of the links listed on the course website, assorted samples from the [bazaar](https://github.com/dondi/bazaar) repository, and the starter files that are included with your GitHub Classroom repositories for this assignment, once you have set yourself up.

## Background Reading
For this assignment, you will want to be acquainted with one or more of the web development resources listed in the course website, particularly the [Mozilla Developer Network](https://developer.mozilla.org) site, the specifications that can be found with the [W3C](https://www.w3.org/TR/html5/), the [jQuery website](http://jquery.com), and [Bootstrap documentation](http://getbootstrap.com).

Textbook reading is centered on the menus, forms, and dialogs interaction style, which would be Shneiderman/Plaisant Chapter 6.

The JavaScript textbook will be of help, particularly Chapter 6, Section 7.5, and Sections 8.2.3, 8.3, 8.4.1, 8.5, and 8.7. For the best exposure, read Chapters 6, 7, and 8 in full.

## Best Practices and Automated Feedback
The sample code that comes with your GitHub Classroom repository is fully configured for code style review ([ESLint](http://eslint.org)), unit tests ([Jasmine](http://jasmine.github.io) and [Karma](https://karma-runner.github.io)), and code coverage ([Istanbul](https://github.com/gotwarlost/istanbul)). These will be walked through in class, and will be run automatically whenever you push to GitHub. If you want to run these on your own machine, you will need [Node.js](https://nodejs.org).

### Automated Feedback Setup
In order to connect your repository to our automated code review and feedback system, once you are up and running please send your repository’s URL to [Thomas O’Brien](https://github.com/obrienthomas13). Create a GitHub issue on your repository and mention him in it (`@obrienthomas13`). Once he has you hooked up, the system will provide feedback on code formatting and quality whenever you commit a new version to GitHub. _Points will be deducted if issues here linger in the final submission._

## For Submission: A Front End to an Existing Web Service API
The title pretty much says it: put together a front end for a pre-existing web service API. Many such APIs are freely and publicly available, although many do require some degree of signup. The [Programmable Web](http://www.programmableweb.com) blog, especially its [API Directory](http://www.programmableweb.com/category/all/apis), is a good starting point for your “API shopping.” For this assignment, you are to:

- Choose a web service API (selected examples have been and will be shown in class)
- Design and implement a simple front end that invokes the API’s services

Specific functionality will vary depending on the API, of course, but for proper scale, we are looking for the implementation of _at least three (3)_ non-trivial web service functions.

A “home-grown” option is available in the form of the LMU Diabolical web service that was developed by the CMSI 486 class of fall, 2012, with support from a Google education grant. The service and some documentation are located at [http://lmu-diabolical.appspot.com](http://lmu-diabolical.appspot.com).

If you choose this as your back-end service, your front end should implement the following:

- _Display a list of current characters_
- _Spawn/create a new character_
- _View a character_
- _Modify a character_
- _Delete a character_ (make sure the user does not delete one by accident)

For other web service APIs, it is highly recommended that you check with me first on the three or more operations for which you plan to supply a front end. Better safe than sorry.

Finally, we do want a good user interface, but don’t worry about fancy graphics—we know that those require a different skill set. Instead, look to make good choices in user interface elements, layout, and behaviors. Some visuals are sufficiently easy with Bootstrap and maybe some custom CSS; you are not obligated to go beyond that.

### How to Turn it In
Commit your front end files such that your repository becomes the root location of a web server. Place unit tests and fixtures in the _test_ subdirectory, as seen in the supplied starter code. To evaluate your work, we will run a simple HTTP server from a local copy of that directory and use your application from a web browser. As such, you will need to set things up so that your selected web service API can be invoked under that configuration—for security reasons, such setup might not be trivial, but by and large it is doable.

## Specific Point Allocations
Programming assignments are scored according to outcomes _3a_, _3b_, and _4a_ to _4f_ in the [syllabus](http://dondi.lmu.build/fall2017/cmsi370/cmsi370-fall2017-syllabus.pdf). For this particular assignment, graded categories are as follows:

| Category | Points | Outcomes |
| -------- | -----: | -------- |
| Web Service Functions (at least 3, points mostly evenly divided) | 50 | _3a_, _3b_, _4a_, _4b_, _4d_ |
| Web App Layout | 30 | _3a_, _3b_, _4a_, _4b_, _4d_ |
| Test Suite and Coverage | 20 | _4a_ |
| Linting | deduction only | _4c_ |
| Version Control | deduction only | _4e_ |
| Punctuality | deduction only | _4f_ |
| **Total** | **100** |

The last three graded categories are “deduction only,” meaning that you will only get points taken off if there are significant issues with those categories. Such issues include but are not limited to: lingering linting errors as of the final commit (_4c_), insufficiently granular or unmessaged commits (_4e_), and late commits (_4f_).
