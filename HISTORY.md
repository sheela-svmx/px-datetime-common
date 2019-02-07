v3.2.6
==================
* Minor spell Check error.

v3.2.5
==================
* Fixed DateTime icon spacing issue when the rendering direction is "rtl" Right-To-Left.

v3.2.4
==================
* Fixed DateTime field spacing issue when default value MM/DD/YY on Edge and Firefox.

v3.2.3
==================
* Fixed regression in px-icon sizes.

v3.2.2
==================
* Updated both `px-datetime-entry` and `px-dateteime-entry-cell` to use `Math.ceil(length)` due to the inconsistency of rounding widths that include decimals between major browser platforms. ([article](https://cruft.io/posts/percentage-calculations-in-ie/) & [example, view in different browsers](http://jsfiddle.net/q5BQs/1271/))
* Added `1` to the calculated width of the `px-datetime-entry` since the input number was being cut off in multiple browsers (it was only visible properly in Chrome)
* Cleaned up multiple eslint / formatting errors throughout the `px-datetime-common` files
* Added minor contextual css that only applies to rendering of the `px-datetime-entry` component to "fix" the improper rendering of the icon within the `px-datetime-common` demo (icon is rendering full size)

v3.2.1
==================
* Removed id #dtEntry from px-datetime-entry-cell and replaced with class variable .datetime-entry-input.
* This ensures no duplicate non-unique id error that chrome console checks for.

v3.2.0
==================
* Added ability to hoist timezone dropdown

v3.1.7
==================
* change ordering of timezone dropdown

v3.1.6
==================
* fix null check in range-behavior

v3.1.5
==================
* fix null check in range-behavior

v3.1.4
==================
* the icons are now able to be tabbed to

v3.1.3
==================
* reflected showButtons prop to attribute for styling

v3.1.2
==================
* fix copy/paste error

v3.1.1
==================
* reduce icon-set imports

v3.1.0
==================
* added `spaceBetween` property in `px-datetime-buttons.html` to allow a different layout of the buttons

v3.0.1
==================
* fixed typo in `_localeChangedTemp` that mistakenly allowed `this._tempMomentObj` to equal null

v3.0.0
==================
* Renames all behaviors to explicitly use the PxDatetimeBehavior namespace
* Ensures that all behaviors are declared in a way that will attach them to the
  window even if executed in an IIFE or other non-global-level way when loaded
  by customer applications
* Small code cleanup

v2.0.6
==================
* added `sudo:required` to travis

v2.0.5
==================
* added `_validateMomentObj()` to validation

v2.0.4
==================
* cleaned up code and updated api docs

v2.0.3
==================
* various fixes around cells and validation

v2.0.2
==================
* fixed bugs around minDate and MaxDate

v2.0.1
==================
* removed _onEnter

v2.0.0
==================
* Removed `datetime` property
* Removed `range` property
* `momentObj` is new source of true
* Allows a blank/empty state
* Cell is no longer readonly
* Added validate for field

v1.1.2
==================
* Added validation error message for min and max

v1.1.1
==================
* Polymer 1.x/2.x hybrid element support

v1.1.0
==================
* Polymer 1.x/2.x hybrid element support

v1.0.6
==================
* fixed am/pm timezone bug

v1.0.5
==================
* Update documentation for presets

v1.0.4
==================
* support min and max as strings

v1.0.3
==================
* add min and max date support

v1.0.2
==================
* Fix comments for analyzer

v1.0.1
==================
* update readme, fix typos in documentation

v1.0.0
==================
* updated dependencies for design refresh
* added new icons
* load moment through px-moment-imports
* DELETED px-datetime-imports
* Updated to new demo style
* Updated documentation
* Added a simple demo
* Removed unused properties
* combined -predix and -sketch sass files

v0.8.0
==================
* Added localization for moment.js through Px.moment.changeLocale() and localize elements using app-localize-behavior

v0.7.12
==================
* bump dropdown dependency

v0.7.11
==================
* fix #8 - validation text color

v0.7.10
==================
* fix typos in documentation

v0.7.9
==================
* fixed css variable names for dropdown

v0.7.8
==================
* added button type to avoid issues in forms

v0.7.7
==================
* removed px-time-input & px-time-rangepicker css

v0.7.6
==================
* Fix observer listed as listener in px-datetime-range-common

v0.7.5
==================
* Update colors design to pick up new colors

v0.7.4
==================
* changing ghp.sh to account for Alpha releases

v0.7.3
==================
* Correct sass typo in v0.7.1

v0.7.2
==================
* Add theming variable for datetime entry field

v0.7.1
==================
* fixed am/pm timezone validation bug

v0.7.0
==================
* Updated dependencies

v0.6.17
==================
* changing browser in wct testing from safari 8 to safari 10 on elcapitan

v0.6.16
==================
* changing all devDeps to ^

v0.6.15
==================
* Update px-theme to 2.0.1 and update test fixtures

v0.6.14
==================
* updated px-datetime-entry-predix.scss dropdown css variables

v0.6.13
==================
* fixed validation timing bug by waiting for attached to fire ‘px-cell-validate'

v0.6.12
==================
* update dependencies for dropdown

v0.6.11
==================
* removing px-theme style call

v0.6.10
==================
* merging 'cell width issue' branch
* fixed fontSize returning 0px bug

v0.6.9
==================
* changing Gruntfile.js to gulpfile.js

v0.6.8
==================
* fixed test

v0.6.7
==================
* fixed error icon not showing up

v0.6.6
==================
* updated entry to use px-polymer-font-awesome

v0.6.5
==================
* Updated dependencies

v0.6.4
==================
* changed bower from px-moment to pxmoment, added px-polygit-imports-datetime for code pen

v0.5.7
==================
* Prevent range being changed when already being processed internally

v0.5.6
==================
* Fix timezone typo

v0.5.5
==================
* Fixed issue in validating future/past dates after UTC changed date

v0.5.4
==================
* Fixed shared behavior to use Px.moment instead of moment

v0.5.3
==================
* Make sure that we don't override moment if loaded already

v0.5.2
==================
* Removed bower resolution

v0.5.1
==================
* Fixed blockFutureDates blockPastDates validation bug

v0.5.0
==================
* Added block past dates

v0.4.4
==================
* Fixed css bug with error icon

v0.4.3
==================
* Keep local copy of moment.js

v0.4.2
==================
* added polymer behavior declaration

v0.4.1
==================
* add auto generation of gh pages

v0.4.0
==================
* Upgrade to Polymer 1.5.0

v0.3.2
==================
* Improve demo and provide default values for px-datetime-entry momentFormat and dateOrTime

v0.3.1
==================
* Upgrade moment

v0.3.0
==================
* rework with lot of changes toward first release

v0.2.1
==================
* Changed allowFutureDates to blockFutureDates

v0.2.0
==================
* Updated px-datetime-behavior. Added tests. Various fixes/improvements

v0.1.0
==================
* merged master with entry. Updated entry and entry-cell functionally

v0.0.3
==================
* added pull request test for travis and updated OSS Notice

v0.0.2
==================
* added functions to set range in px-datetime-range-behavior

v0.0.1
==================
* Initial release
