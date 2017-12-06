/**
 * DATETIME-ENTRY-CELL
 */
// suite('px-datetime-entry-cell', function () {

//   let dateFixt, timeFixt, now;

//   setup(function(done) {
//     dateFixt = fixture('dateEntryDropdown');
//     timeFixt = fixture('timeEntry');
//     now = Px.moment();
//     dateFixt.momentObj = now;
//     timeFixt.momentObj = now;

//     flush(()=>{
//       done();
//     });

//   });


//   //Would love to use MockInteractions but can't get it working for the life of me
//   test('cell keyboard autocomplete on leaving', function (done) {
//     flush(() => {
//       var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
//         firstInput = Polymer.dom(cells[0].root).querySelector('input');

//       firstInput.focus();
//       firstInput.value = "22";
//       cells[0]._handleBlur();
//       assert.equal(firstInput.value, 2022);
//       done();
//     });
//   });

//   // SHOULD WORK. I don't know how to get .focus to work
//   // test('auto move to next cell', function (done) {
//   //   var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
//   //       secondInput = Polymer.dom(cells[1].root).querySelector('input');
//   //     secondInput.focus();
//   //     // MockInteractions.focus(secondInput);
//   //     flush(() => {
//   //       async.until(
//   //         function () {
//   //           secondInput = Polymer.dom(cells[1].root).querySelector('input');
//   //           return secondInput.value === "11";
//   //         },
//   //         function (callback) {
//   //           MockInteractions.pressAndReleaseKeyOn(secondInput, 49, [], "1");
//   //           setTimeout(callback, 1000);
//   //         },
//   //         function (err, n) {
//   //             // check the active cell is the day cell
//   //             done();
//   //           }
//   //         );
//   //       });

//   //     });


//     test('move cells with right arrow', function (done) {
//       var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell');
//           firstInput = Polymer.dom(cells[0].root).querySelector('input');

//       //simulate focus on first cell....
//       cells[0].focus();

//       var listener = function (evt) {
//         assert.equal(evt.detail.dir, 1);
//         cells[0].removeEventListener('px-entry-cell-move', listener);
//         done();
//       };

//       //pressing right arrow should move to the next cell.
//       //Unfortunately our code relies on focus() which doesn't seem to
//       //work in the testing environment. Instead listen to the event that will result
//       //in the cell to be changed
//       cells[0].addEventListener('px-entry-cell-move', listener);
//       MockInteractions.pressAndReleaseKeyOn(firstInput, 39, [], "ArrowRight");
//     });


//     test('previous field when pressing left on first cell', function (done) {
//       var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell');

//       //simulate focus on first cell....
//       cells[0].focus();

//       var listener = function (evt) {
//         assert.equal(evt.detail.dateOrTime, "Date");
//         dateFixt.removeEventListener('px-previous-field', listener);
//         done();
//       };
//       //pressing left arrow on first cell should fire previous field event
//       dateFixt.addEventListener('px-previous-field', listener);
//       MockInteractions.pressAndReleaseKeyOn(cells[0], 37, [], "ArrowLeft");
//     });


//     test('NOT previous field when pressing left on last cell', function (done) {
//       var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell');

//       //simulate focus on first cell....
//       cells[1].focus();

//       //The test fails if it get in this function
//       var listener = function (evt) {
//         assert.isTrue(false);
//         dateFixt.removeEventListener('px-previous-field', listener);
//         done();
//       };
//       //pressing left arrow on first cell should fire previous field event
//       dateFixt.addEventListener('px-previous-field', listener);
//       MockInteractions.pressAndReleaseKeyOn(cells[1], 37, [], "ArrowLeft");

//       setTimeout(function () {
//         dateFixt.removeEventListener('px-previous-field', listener);
//         done();
//       }, 200);
//     });


//     test('next field when pressing right on last cell', function (done) {
//       var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
//           lastCell = cells[cells.length - 1];

//       //simulate focus on first cell....
//       lastCell.focus();

//       var listener = function (evt) {
//         dateFixt.removeEventListener('px-next-field', listener);
//         done();
//       };

//       //pressing right arrow on last cell should fire next field event
//       dateFixt.addEventListener('px-next-field', listener);
//       MockInteractions.pressAndReleaseKeyOn(lastCell, 39, [], 'ArrowRight');
//     });


//     test('NOT previous field when pressing left on last cell', function (done) {
//       var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
//           firstCell = cells[0];

//       //simulate focus on first cell....
//       firstCell.focus();

//       //The test fails if it get in this function
//       var listener = function (evt) {
//         assert.isTrue(false);
//         dateFixt.removeEventListener('px-next-field', listener);
//         done();
//       };
//       //pressing left arrow on first cell should fire previous field event
//       dateFixt.addEventListener('px-next-field', listener);
//       MockInteractions.pressAndReleaseKeyOn(firstCell, 39, [], 'ArrowRight');

//       setTimeout(function () {
//         dateFixt.removeEventListener('px-next-field', listener);
//         done();
//       }, 200);
//     });


//     test('move cells with left arrow', function (done) {
//       var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell');

//       //simulate focus on first cell....
//       cells[0].focus();

//       var listener = function (evt) {
//         assert.equal(evt.detail.dir, -1);
//         cells[0].removeEventListener('px-entry-cell-move', listener);
//         done();
//       };

//       //pressing right arrow should move to the next cell.
//       //Unfortunately our code relies on focus() which doesn't seem to
//       //work in the testing environment. Instead listen to the event that will result
//       //in the cell to be changed
//       cells[0].addEventListener('px-entry-cell-move', listener);
//       MockInteractions.pressAndReleaseKeyOn(cells[0], 37, [], "ArrowLeft");
//     });


//     test('click on date icon fires event', function (done) {
//       var iconLabel = Polymer.dom(dateFixt.root).querySelector('#icon');

//       var listener = function (evt) {
//         assert.equal(evt.detail.dateOrTime, 'Date');
//         done();
//       };

//       dateFixt.addEventListener('px-datetime-entry-icon-clicked', listener);
//       iconLabel.click();
//     });


//     test('click on time icon fires event', function (done) {
//       var iconLabel = Polymer.dom(timeFixt.root).querySelector('#icon');

//       var listener = function (evt) {
//         assert.equal(evt.detail.dateOrTime, 'Time');
//         done();
//       };

//       timeFixt.addEventListener('px-datetime-entry-icon-clicked', listener);
//       iconLabel.click();
//     });

//     test('AM/PM', function (done) {
//       var cells = Polymer.dom(timeFixt.root).querySelectorAll('px-datetime-entry-cell'),
//           lastCell = cells[cells.length - 1],
//           lastInput = Polymer.dom(lastCell.root).querySelectorAll('#dtEntry');

//       flush(function () {
//         MockInteractions.pressAndReleaseKeyOn(lastCell, 65, [], 'a');
//         assert.equal(lastInput[0].value, 'AM', "AM 1st time");
//         MockInteractions.pressAndReleaseKeyOn(lastCell, 80, [], 'p');
//         assert.equal(lastInput[0].value, 'PM', "PM 1st time");
//         MockInteractions.pressAndReleaseKeyOn(lastCell, 65, [], 'a');
//         assert.equal(lastInput[0].value, 'AM', "AM 2nd time");
//         MockInteractions.pressAndReleaseKeyOn(lastCell, 38, [], 'ArrowUp');
//         assert.equal(lastInput[0].value, 'PM', "PM 2nd time");
//         MockInteractions.pressAndReleaseKeyOn(lastCell,  40, [], 'ArrowDown');
//         assert.equal(lastInput[0].value, 'AM', "AM 3rd time");
//         done();
//       });
//     });
//   });// end of px-datetime-entry-cell


// /**
//  * DATETIME-ENTRY
//  */
// suite('px-datetime-entry', function () {

//   let dateFixt, dateExFixt, timeFixt, timeAbbTextFixt, now;

//   setup(function(done) {
//     now = Px.moment();

//     flush(()=>{
//       done();
//     });

//   });


//   test('dropdown mode uses a px-dropdown', function (done) {
//     dateFixt = fixture('dateEntryDropdown');
//     dateFixt.momentObj = now;

//     flush(function () {
//       var dropdown = Polymer.dom(dateFixt.root).querySelector('px-dropdown'),
//           text = Polymer.dom(dateFixt.root).querySelector('#timeZoneText');

//       assert.isNotNull(dropdown);
//       assert.isNull(text);
//       assert.notEqual(dropdown.style.display, 'none');
//       done();
//     });
//   });

//   test('extended dropdown mode uses a px-dropdown', function (done) {
//     dateExFixt = fixture('dateEntryExtDropdown');
//     dateExFixt.momentObj = now;

//     flush(function () {
//       var dropdown = Polymer.dom(dateExFixt.root).querySelector('px-dropdown'),
//           text = Polymer.dom(dateExFixt.root).querySelector('#timeZoneText');

//       assert.isNotNull(dropdown);
//       assert.isNull(text);
//       assert.notEqual(dropdown.style.display, 'none');
//       done();
//     });
//   });

//   test('text mode uses a span', function (done) {
//     timeFixt = fixture('timeEntry');
//     timeFixt.momentObj = now;

//     flush(function () {
//       var text = Polymer.dom(timeFixt.root).querySelector('#timeZoneText'),
//           dropdown = Polymer.dom(timeFixt.root).querySelector('px-dropdown');

//       assert.isNotNull(text);
//       assert.isNull(dropdown);
//       assert.notEqual(text.style.display, 'none');
//       done();
//     });
//   });

//   test('text mode uses a span', function (done) {
//     timeAbbTextFixt = fixture('timeEntryAbbText');
//     timeAbbTextFixt.momentObj = now;

//     flush(function () {
//       var text = Polymer.dom(timeAbbTextFixt.root).querySelector('#timeZoneText'),
//           dropdown = Polymer.dom(timeAbbTextFixt.root).querySelector('px-dropdown');

//       assert.isNotNull(text);
//       assert.isNull(dropdown);
//       assert.notEqual(text.style.display, 'none');
//       done();
//     });
//   });


//   test('auto validation', function (done) {
//     dateFixt = fixture('dateEntryDropdown');
//     dateFixt.momentObj = now;

//     flush(() => {
//       var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
//           secondInput = Polymer.dom(cells[1].root).querySelector('input');

//       secondInput.value = "99";
//       cells[1]._handleBlur();

//       //wait for validation to kick in
//       setTimeout(function () {
//         cells[1];
//         assert.isFalse(dateFixt.isValid);
//         done();
//       }, 500);
//     });
//   });


//   test('enter fires event', function (done) {
//     dateFixt = fixture('dateEntryDropdown');
//     dateFixt.momentObj = now;

//     flush(() => {
//       var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
//           secondInput = Polymer.dom(cells[1].root).querySelector('input');

//       secondInput.value = "0";

//       var listener = function (evt) {
//         assert.equal(evt.detail.dir, 1);
//         cells[1].removeEventListener('px-entry-cell-move', listener);
//         done();
//       };

//       cells[1].addEventListener('px-entry-cell-move', listener);
//       MockInteractions.pressAndReleaseKeyOn(cells[1], 13, [], 'Enter');
//     });

//   });


//   test('Block future dates', function (done) {
//     dateExFixt = fixture('dateEntryExtDropdown');
//     dateExFixt.momentObj = now;

//     flush(() => {
//       var cells = Polymer.dom(dateExFixt.root).querySelectorAll('px-datetime-entry-cell'),
//           firstInput = Polymer.dom(cells[0].root).querySelector('input');

//       firstInput.value = "18";
//       cells[0]._handleBlur();

//       //wait for validation to kick in
//       setTimeout(function () {
//         assert.isFalse(dateExFixt.isValid);
//         done();
//       }, 200);
//     });
//   });

//   test('block dates before min', function (done) {
//     dateFixt = fixture('dateEntryDropdown');
//     dateFixt.momentObj = now;
//     dateFixt.set('min', dateFixt.momentObj.clone().subtract(1, 'day'));

//     flush(() => {
//       var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
//           firstInput = Polymer.dom(cells[0].root).querySelector('input');

//       firstInput.value = "16";
//       cells[0]._handleBlur();

//       //wait for validation to kick in
//       setTimeout(function () {
//         assert.isFalse(dateFixt.isValid);
//         done();
//       }, 200);
//     });

//   });

//   test('block dates after max', function (done) {
//     dateFixt = fixture('dateEntryDropdown');
//     dateFixt.momentObj = now;

//     dateFixt.set('max', dateFixt.momentObj.clone().add(1, 'day'));

//     flush(() => {
//       var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
//           firstInput = Polymer.dom(cells[0].root).querySelector('input');

//       firstInput.value = "18";
//       cells[0]._handleBlur();

//       //wait for validation to kick in
//       setTimeout(function () {
//         assert.isFalse(dateFixt.isValid);
//         done();
//       }, 200);
//     });
//   });


//   test('_preserveTime', function () {
//     dateFixt = fixture('dateEntryDropdown');
//     dateFixt.momentObj = now;

//     var moment = Px.moment.tz(Px.moment("2016-04-03T00:00:00Z", Px.moment.ISO_8601), this.timeZone),
//         moment2 = Px.moment.tz(Px.moment("2009-06-07T10:32:06Z", Px.moment.ISO_8601), this.timeZone);
//         moment2.milliseconds('500');

//     var result = dateFixt._preserveTime(moment2, moment);

//     //both result and moment should have the time to preserve
//     assert.equal(result.hour(), moment2.hours());
//     assert.equal(result.minute(), moment2.minute());
//     assert.equal(result.second(), moment2.second());
//     assert.equal(result.milliseconds(), moment2.milliseconds());
//     assert.equal(moment.hour(), moment2.hours());
//     assert.equal(moment.minute(), moment2.minute());
//     assert.equal(moment.second(), moment2.second());
//     assert.equal(moment.milliseconds(), moment2.milliseconds());
//   });


//   test('changing time zone changes moment timezone', function () {
//     dateFixt = fixture('dateEntryDropdown');
//     dateFixt.momentObj = now;

//     dateFixt.timeZone = 'Pacific/Noumea';
//     assert.equal(dateFixt.momentObj.tz(), 'Pacific/Noumea');
//   });

// });// end of px-datetime-entry



/**
 * BUTTONS
 */
// suite('buttons', function () {

//   let buttons;

//   setup(function (done) {
//     buttons = fixture('buttons');
//     flush(() => {
//       done();
//     });
//   });

//   test('show/hide cancel', function (done) {
//     var internalButtons = Polymer.dom(buttons.root).querySelectorAll('button');

//     //both shown
//     assert.notEqual(internalButtons[0].style.display, 'none');
//     assert.notEqual(internalButtons[1].style.display, 'none');

//     buttons.hideSubmit = true;
//     flush(function () {

//       assert.notEqual(internalButtons[0].style.display, 'none');
//       assert.equal(internalButtons[1].style.display, 'none');

//       buttons.hideSubmit = false;
//       buttons.hideCancel = true;
//       flush(function () {
//         assert.equal(internalButtons[0].style.display, 'none');
//         assert.notEqual(internalButtons[1].style.display, 'none');

//         buttons.hideCancel = false;
//         done();
//       });
//     });
//   });

//   test('click apply fire event', function (done) {
//     var internalButtons = Polymer.dom(buttons.root).querySelectorAll('button');

//     var listener = function (evt) {
//       buttons.removeEventListener('px-datetime-button-clicked', listener);
//       assert.isTrue(evt.detail.action);
//       done();
//     };

//     buttons.addEventListener('px-datetime-button-clicked', listener);

//     internalButtons[1].click();
//   });

//   test('click cancel fire event', function (done) {
//     var internalButtons = Polymer.dom(buttons.root).querySelectorAll('button');

//     var listener = function (evt) {
//       buttons.removeEventListener('px-datetime-button-clicked', listener);
//       assert.isFalse(evt.detail.action);
//       done();
//     };

//     buttons.addEventListener('px-datetime-button-clicked', listener);

//     internalButtons[0].click();
//   });

//   test('disable submit button', function () {
//     var internalButtons = Polymer.dom(buttons.root).querySelectorAll('button');

//     buttons.isSubmitButtonValid = false;
//     assert.isTrue(internalButtons[1].disabled);
//   });
// });// end of Buttons



/**
 * PRESETS
 */
// suite('presets', function () {

//   let presets, now;

//   setup(function (done) {
//     presets = fixture('presets');
//     now = Px.moment();
//     presets.presetRanges = [
//       {
//         "displayText": "Today",
//         "startDateTime": now,
//         "endDateTime": now
//       },
//       {
//         "displayText": "Yesterday",
//         "startDateTime": now.clone().subtract(1, 'day'),
//         "endDateTime": now.clone().subtract(1, 'day')
//       },
//       {
//         "displayText": "Last 7 Days",
//         "startDateTime": now.clone().subtract(7, 'days'),
//         "endDateTime": now
//       },
//       {
//         "displayText": "This Month",
//         "startDateTime": now.clone().startOf('month'),
//         "endDateTime": now.clone().endOf('month')
//       },
//       {
//         "displayText": "Last Month",
//         "startDateTime": now.clone().subtract(1, 'months').startOf('month'),
//         "endDateTime": now.clone().subtract(1, 'months').endOf('month')
//       }
//     ];
//     flush(() => {
//       done();
//     });
//   });

//   test('click presets fire event', function (done) {
//     var presetLinks = Polymer.dom(presets.root).querySelectorAll('span');

//     presets.addEventListener('px-preset-selected', function (evt) {

//       assert.equal(evt.detail.displayText, 'Last Month');
//       assert.isTrue(evt.detail.endDateTime.isValid());
//       assert.isTrue(evt.detail.startDateTime.isValid());
//       assert.isTrue(presetLinks[presetLinks.length - 1].classList.contains('actionable--select'));

//       done();
//     });

//     assert.isFalse(presetLinks[presetLinks.length - 1].classList.contains('actionable--select'));
//     presetLinks[presetLinks.length - 1].click();
//   });
// });//end of presets


suite('px-datetime-entry-cell empty', function () {

  let dateFixt;

    setup(function(done) {
      dateFixt = fixture('dateEntryDropdown');

      flush(()=>{
        done();
      });

    });


  test('arrowUp on YY formatted cell', function (done) {
    dateFixt.momentFormat = "YY";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('#dtEntry');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');

    expect(theInput[0].value)
      .to.eventuallyEqual('0', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on YY formatted cell', function (done) {
    dateFixt.momentFormat = "YY";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('#dtEntry');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');

    expect(theInput[0].value)
      .to.eventuallyEqual('99', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on YYYY formatted cell', function (done) {
    dateFixt.momentFormat = "YYYY";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('#dtEntry');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');

    expect(theInput[0].value)
      .to.eventuallyEqual('00', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on YYYY formatted cell', function (done) {
    dateFixt.momentFormat = "YYYY";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('#dtEntry');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');

    expect(theInput[0].value)
      .to.eventuallyEqual('9999', {within: 1000, every: 100}, done);
    });
  });


});
