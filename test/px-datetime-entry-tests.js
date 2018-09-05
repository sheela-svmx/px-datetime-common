/**
 * @license
 * Copyright (c) 2018, General Electric
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * DATETIME-ENTRY-CELL
 */
suite('px-datetime-entry-cell', function () {

  let dateFixt, timeFixt, now;

  setup(function(done) {
    dateFixt = fixture('dateEntryDropdown');
    timeFixt = fixture('timeEntry');
    now = Px.moment();
    dateFixt.momentObj = now;
    timeFixt.momentObj = now;

    flush(()=>{
      done();
    });
  });


  test('the date cells have a value if momentObj is set', function (done) {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell');
    for (i = 0; i < cells.length; i++) {
      var cellInput = Polymer.dom(cells[i].root).querySelectorAll('.datetime-entry-input');
      assert.notEqual(cellInput[0].value, '');
    }
    done();
  });


  test('the time cells have a value if momentObj is set', function (done) {
    var cells = Polymer.dom(timeEntry.root).querySelectorAll('px-datetime-entry-cell');
    for (i = 0; i < cells.length; i++) {
      var cellInput = Polymer.dom(cells[i].root).querySelectorAll('.datetime-entry-input');
      assert.notEqual(cellInput[0].value, '');
    }
    done();
  });


  test('cell keyboard autocomplete on leaving', function (done) {
    flush(() => {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        firstInput = Polymer.dom(cells[0].root).querySelector('input');

      firstInput.focus();
      firstInput.value = "22";
      cells[0]._handleBlur();
      assert.equal(firstInput.value, 2022);
      done();
    });
  });


  // SHOULD WORK. I don't know how to get .focus() to work
  // test('auto move to next cell', function (done) {
  //   var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
  //       secondInput = Polymer.dom(cells[1].root).querySelector('input');
  //     secondInput.focus();
  //     // MockInteractions.focus(secondInput);
  //     flush(() => {
  //       async.until(
  //         function () {
  //           secondInput = Polymer.dom(cells[1].root).querySelector('input');
  //           return secondInput.value === "11";
  //         },
  //         function (callback) {
  //           MockInteractions.pressAndReleaseKeyOn(secondInput, 49, [], "1");
  //           setTimeout(callback, 1000);
  //         },
  //         function (err, n) {
  //             // check the active cell is the day cell
  //             done();
  //           }
  //         );
  //       });
  //     });


  test('move cells with right arrow', function (done) {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell');
        firstInput = Polymer.dom(cells[0].root).querySelector('input');

    //simulate focus on first cell....
    cells[0].focus();

    var listener = function (evt) {
      assert.equal(evt.detail.dir, 1);
      cells[0].removeEventListener('px-entry-cell-move', listener);
      done();
    };

    //pressing right arrow should move to the next cell.
    //Unfortunately our code relies on focus() which doesn't seem to
    //work in the testing environment. Instead listen to the event that will result
    //in the cell to be changed
    cells[0].addEventListener('px-entry-cell-move', listener);
    MockInteractions.pressAndReleaseKeyOn(firstInput, 39, [], "ArrowRight");
  });


  test('previous field when pressing left on first cell', function (done) {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell');

    //simulate focus on first cell....
    cells[0].focus();

    var listener = function (evt) {
      assert.equal(evt.detail.dateOrTime, "Date");
      dateFixt.removeEventListener('px-previous-field', listener);
      done();
    };
    //pressing left arrow on first cell should fire previous field event
    dateFixt.addEventListener('px-previous-field', listener);
    MockInteractions.pressAndReleaseKeyOn(cells[0], 37, [], "ArrowLeft");
  });


  test('NOT previous field when pressing left on last cell', function (done) {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell');

    //The test fails if it get in this function
    var listener = function (evt) {
      assert.isTrue(false);
      dateFixt.removeEventListener('px-previous-field', listener);
      done();
    };
    //pressing left arrow on first cell should fire previous field event
    dateFixt.addEventListener('px-previous-field', listener);
    MockInteractions.pressAndReleaseKeyOn(cells[1], 37, [], "ArrowLeft");

    setTimeout(function () {
      dateFixt.removeEventListener('px-previous-field', listener);
      done();
    }, 200);
  });


  test('next field when pressing right on last cell', function (done) {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        lastCell = cells[cells.length - 1];

    var listener = function (evt) {
      dateFixt.removeEventListener('px-next-field', listener);
      done();
    };

    //pressing right arrow on last cell should fire next field event
    dateFixt.addEventListener('px-next-field', listener);
    MockInteractions.pressAndReleaseKeyOn(lastCell, 39, [], 'ArrowRight');
  });


  test('NOT previous field when pressing left on last cell', function (done) {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        firstCell = cells[0];

    //The test fails if it get in this function
    var listener = function (evt) {
      assert.isTrue(false);
      dateFixt.removeEventListener('px-next-field', listener);
      done();
    };
    //pressing left arrow on first cell should fire previous field event
    dateFixt.addEventListener('px-next-field', listener);
    MockInteractions.pressAndReleaseKeyOn(firstCell, 39, [], 'ArrowRight');

    setTimeout(function () {
      dateFixt.removeEventListener('px-next-field', listener);
      done();
    }, 200);
  });


  test('move cells with left arrow', function (done) {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell');

    var listener = function (evt) {
      assert.equal(evt.detail.dir, -1);
      cells[0].removeEventListener('px-entry-cell-move', listener);
      done();
    };

    //pressing right arrow should move to the next cell.
    //Unfortunately our code relies on focus() which doesn't seem to
    //work in the testing environment. Instead listen to the event that will result
    //in the cell to be changed
    cells[0].addEventListener('px-entry-cell-move', listener);
    MockInteractions.pressAndReleaseKeyOn(cells[0], 37, [], "ArrowLeft");
  });


  test('click on date icon fires event', function (done) {
    var iconLabel = Polymer.dom(dateFixt.root).querySelector('#icon');

    var listener = function (evt) {
      assert.equal(evt.detail.dateOrTime, 'Date');
      done();
    };

    dateFixt.addEventListener('px-datetime-entry-icon-clicked', listener);
    iconLabel.click();
  });


  test('click on time icon fires event', function (done) {
    var iconLabel = Polymer.dom(timeFixt.root).querySelector('#icon');

    var listener = function (evt) {
      assert.equal(evt.detail.dateOrTime, 'Time');
      done();
    };

    timeFixt.addEventListener('px-datetime-entry-icon-clicked', listener);
    iconLabel.click();
  });

  test('AM/PM', function (done) {
    var cells = Polymer.dom(timeFixt.root).querySelectorAll('px-datetime-entry-cell'),
        lastCell = cells[cells.length - 1],
        lastInput = Polymer.dom(lastCell.root).querySelectorAll('.datetime-entry-input');

    flush(function () {
      MockInteractions.pressAndReleaseKeyOn(lastCell, 65, [], 'a');
      assert.equal(lastInput[0].value, 'AM', "AM 1st time");
      MockInteractions.pressAndReleaseKeyOn(lastCell, 80, [], 'p');
      assert.equal(lastInput[0].value, 'PM', "PM 1st time");
      MockInteractions.pressAndReleaseKeyOn(lastCell, 65, [], 'a');
      assert.equal(lastInput[0].value, 'AM', "AM 2nd time");
      MockInteractions.pressAndReleaseKeyOn(lastCell, 38, [], 'ArrowUp');
      assert.equal(lastInput[0].value, 'PM', "PM 2nd time");
      MockInteractions.pressAndReleaseKeyOn(lastCell,  40, [], 'ArrowDown');
      assert.equal(lastInput[0].value, 'AM', "AM 3rd time");
      done();
    });
  });
});// end of px-datetime-entry-cell


/**
 * DATETIME-ENTRY
 */
suite('px-datetime-entry', function () {

  let dateFixt, dateExFixt, dateAbbTextFixt, now;

  setup(function(done) {
    dateFixt = fixture('dateEntryDropdown');
    now = Px.moment();
    dateFixt.momentObj = now;

    flush(()=>{
      done();
    });
  });


  test('dropdown mode uses a px-dropdown', function (done) {
    flush(function () {
      var dropdown = Polymer.dom(dateFixt.root).querySelector('px-dropdown'),
          text = Polymer.dom(dateFixt.root).querySelector('#timeZoneText');

      assert.isNotNull(dropdown);
      assert.isNull(text);
      assert.notEqual(dropdown.style.display, 'none');
      done();
    });
  });


  test('extended dropdown mode uses a px-dropdown', function (done) {
    dateExFixt = fixture('dateEntryExtDropdown');
    dateExFixt.momentObj = now;

    flush(function () {
      var dropdown = Polymer.dom(dateExFixt.root).querySelector('px-dropdown'),
          text = Polymer.dom(dateExFixt.root).querySelector('#timeZoneText');

      assert.isNotNull(dropdown);
      assert.isNull(text);
      assert.notEqual(dropdown.style.display, 'none');
      done();
    });
  });


  test('text mode uses a span', function (done) {
    timeFixt = fixture('timeEntry');
    timeFixt.momentObj = now;

    flush(function () {
      var text = Polymer.dom(timeFixt.root).querySelector('#timeZoneText'),
          dropdown = Polymer.dom(timeFixt.root).querySelector('px-dropdown');

      assert.isNotNull(text);
      assert.isNull(dropdown);
      assert.notEqual(text.style.display, 'none');
      done();
    });
  });


  test('abbreviatedText mode uses a span', function (done) {
    dateAbbTextFixt = fixture('dateEntryAbbText');
    dateAbbTextFixt.momentObj = now;

    flush(function () {
      var text = Polymer.dom(dateAbbTextFixt.root).querySelector('#timeZoneText'),
          dropdown = Polymer.dom(dateAbbTextFixt.root).querySelector('px-dropdown');

      assert.isNotNull(text);
      assert.isNull(dropdown);
      assert.notEqual(text.style.display, 'none');
      done();
    });
  });


  test('auto validation', function (done) {
    flush(() => {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          secondInput = Polymer.dom(cells[1].root).querySelector('input');

      var listener = function (evt) {
        assert.equal(evt.detail.element, dateFixt);
        done();
      };

      dateFixt.addEventListener('px-moment-invalid', listener);
      secondInput.value = "99";
      cells[1]._handleBlur();
    });
  });


  test('validation message Month', function (done) {
    flush(() => {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          secondInput = Polymer.dom(cells[1].root).querySelector('input');

      var listener = function (evt) {
        assert.equal(evt.detail.validationErrorMessage, "Month 99 is not valid");
        done();
      };

      dateFixt.addEventListener('px-validation-message', listener);
      secondInput.value = "99";
      cells[1]._handleBlur();
    });
  });


  test('validation message Day', function (done) {
    flush(() => {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          secondInput = Polymer.dom(cells[2].root).querySelector('input');

      var listener = function (evt) {
        assert.equal(evt.detail.validationErrorMessage, "Day 99 is not valid");
        done();
      };

      dateFixt.addEventListener('px-validation-message', listener);
      secondInput.value = "99";
      cells[2]._handleBlur();
    });
  });


  test('validation message Hour', function (done) {
    timeFixt = fixture('timeEntry');
    timeFixt.momentObj = now;

    flush(() => {
      var cells = Polymer.dom(timeFixt.root).querySelectorAll('px-datetime-entry-cell'),
          secondInput = Polymer.dom(cells[0].root).querySelector('input');

      var listener = function (evt) {
        assert.equal(evt.detail.validationErrorMessage, "Hour 99 is not valid");
        done();
      };

      timeFixt.addEventListener('px-validation-message', listener);
      secondInput.value = "99";
      cells[0]._handleBlur();
    });
  });


  test('validation message Minute', function (done) {
    timeFixt = fixture('timeEntry');
    timeFixt.momentObj = now;

    flush(() => {
      var cells = Polymer.dom(timeFixt.root).querySelectorAll('px-datetime-entry-cell'),
          secondInput = Polymer.dom(cells[1].root).querySelector('input');

      var listener = function (evt) {
        assert.equal(evt.detail.validationErrorMessage, "Minute 99 is not valid");
        done();
      };

      timeFixt.addEventListener('px-validation-message', listener);
      secondInput.value = "99";
      cells[1]._handleBlur();
    });
  });


  test('validation message Second', function (done) {
    timeFixt = fixture('timeEntry');
    timeFixt.momentObj = now;

    flush(() => {
      var cells = Polymer.dom(timeFixt.root).querySelectorAll('px-datetime-entry-cell'),
          secondInput = Polymer.dom(cells[2].root).querySelector('input');

      var listener = function (evt) {
        assert.equal(evt.detail.validationErrorMessage, "Second 99 is not valid");
        done();
      };

      timeFixt.addEventListener('px-validation-message', listener);
      secondInput.value = "99";
      cells[2]._handleBlur();
    });
  });


  test('_preserveTime', function () {
    var moment = Px.moment.tz(Px.moment("2016-04-03T00:00:00Z", Px.moment.ISO_8601), this.timeZone),
        moment2 = Px.moment.tz(Px.moment("2009-06-07T10:32:06Z", Px.moment.ISO_8601), this.timeZone);
        moment2.milliseconds('500');

    var result = dateFixt._preserveTime(moment2, moment);

    //both result and moment should have the time to preserve
    assert.equal(result.hour(), moment2.hours());
    assert.equal(result.minute(), moment2.minute());
    assert.equal(result.second(), moment2.second());
    assert.equal(result.milliseconds(), moment2.milliseconds());
    assert.equal(moment.hour(), moment2.hours());
    assert.equal(moment.minute(), moment2.minute());
    assert.equal(moment.second(), moment2.second());
    assert.equal(moment.milliseconds(), moment2.milliseconds());
  });


  test('changing time zone changes moment timezone', function () {
    dateFixt.timeZone = 'Pacific/Noumea';
    assert.equal(dateFixt.momentObj.tz(), 'Pacific/Noumea');
  });
});// end of px-datetime-entry



/**
 * BUTTONS
 */
suite('buttons', function () {

  let buttons;

  setup(function (done) {
    buttons = fixture('buttons');
    flush(() => {
      done();
    });
  });

  test('show/hide cancel', function (done) {
    var internalButtons = Polymer.dom(buttons.root).querySelectorAll('button');

    //both shown
    assert.notEqual(internalButtons[0].style.display, 'none');
    assert.notEqual(internalButtons[1].style.display, 'none');

    buttons.hideSubmit = true;
    flush(function () {

      assert.notEqual(internalButtons[0].style.display, 'none');
      assert.equal(internalButtons[1].style.display, 'none');

      buttons.hideSubmit = false;
      buttons.hideCancel = true;
      flush(function () {
        assert.equal(internalButtons[0].style.display, 'none');
        assert.notEqual(internalButtons[1].style.display, 'none');

        buttons.hideCancel = false;
        done();
      });
    });
  });

  test('click apply fire event', function (done) {
    var internalButtons = Polymer.dom(buttons.root).querySelectorAll('button');

    var listener = function (evt) {
      buttons.removeEventListener('px-datetime-button-clicked', listener);
      assert.isTrue(evt.detail.action);
      done();
    };

    buttons.addEventListener('px-datetime-button-clicked', listener);
    internalButtons[1].click();
  });


  test('click cancel fire event', function (done) {
    var internalButtons = Polymer.dom(buttons.root).querySelectorAll('button');

    var listener = function (evt) {
      buttons.removeEventListener('px-datetime-button-clicked', listener);
      assert.isFalse(evt.detail.action);
      done();
    };

    buttons.addEventListener('px-datetime-button-clicked', listener);
    internalButtons[0].click();
  });


  test('disable submit button', function () {
    var internalButtons = Polymer.dom(buttons.root).querySelectorAll('button');

    buttons.isSubmitButtonValid = false;
    assert.isTrue(internalButtons[1].disabled);
  });
});// end of Buttons



/**
 * PRESETS
 */
suite('presets', function () {

  let presets, now;

  setup(function (done) {
    presets = fixture('presets');
    now = Px.moment();
    presets.presetRanges = [
      {
        "displayText": "Today",
        "startDateTime": now,
        "endDateTime": now
      },
      {
        "displayText": "Yesterday",
        "startDateTime": now.clone().subtract(1, 'day'),
        "endDateTime": now.clone().subtract(1, 'day')
      },
      {
        "displayText": "Last 7 Days",
        "startDateTime": now.clone().subtract(7, 'days'),
        "endDateTime": now
      },
      {
        "displayText": "This Month",
        "startDateTime": now.clone().startOf('month'),
        "endDateTime": now.clone().endOf('month')
      },
      {
        "displayText": "Last Month",
        "startDateTime": now.clone().subtract(1, 'months').startOf('month'),
        "endDateTime": now.clone().subtract(1, 'months').endOf('month')
      }
    ];
    flush(() => {
      done();
    });
  });


  test('click presets fire event', function (done) {
    var presetLinks = Polymer.dom(presets.root).querySelectorAll('span');

    presets.addEventListener('px-preset-selected', function (evt) {

      assert.equal(evt.detail.displayText, 'Last Month');
      assert.isTrue(evt.detail.endDateTime.isValid());
      assert.isTrue(evt.detail.startDateTime.isValid());
      assert.isTrue(presetLinks[presetLinks.length - 1].classList.contains('actionable--select'));

      done();
    });

    assert.isFalse(presetLinks[presetLinks.length - 1].classList.contains('actionable--select'));
    presetLinks[presetLinks.length - 1].click();
  });
});//end of presets



/**
 * PX-DATETIME-ENTRY-CELL EMPTY
 */
suite('px-datetime-entry-cell empty', function () {

  let dateFixt;

    setup(function(done) {
      dateFixt = fixture('dateEntryDropdown');
      timeFixt = fixture('timeEntry');

      flush(()=>{
        done();
      });
    });


  test('the date cells are empty if momentObj is not set', function (done) {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell');
    for (i = 0; i < cells.length; i++) {
      var cellInput = Polymer.dom(cells[i].root).querySelectorAll('.datetime-entry-input');
      assert.equal(cellInput[0].value, '');
    }
    done();
  });


  test('the time cells are empty if momentObj is not set', function (done) {
    var cells = Polymer.dom(timeEntry.root).querySelectorAll('px-datetime-entry-cell');
    for (i = 0; i < cells.length; i++) {
      var cellInput = Polymer.dom(cells[i].root).querySelectorAll('.datetime-entry-input');
      assert.equal(cellInput[0].value, '');
    }
    done();
  });


  test('arrowUp on M formatted cell', function (done) {
    dateFixt.momentFormat = "M";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');

    expect(theInput[0].value)
      .to.eventuallyEqual('1', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on M formatted cell', function (done) {
    dateFixt.momentFormat = "M";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');

    expect(theInput[0].value)
      .to.eventuallyEqual('12', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on MM formatted cell', function (done) {
    dateFixt.momentFormat = "MM";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
    expect(theInput[0].value).to.eventuallyEqual('1', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on MM formatted cell', function (done) {
    dateFixt.momentFormat = "MM";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');
    expect(theInput[0].value).to.eventuallyEqual('12', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on D formatted cell', function (done) {
    dateFixt.momentFormat = "D";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
    expect(theInput[0].value).to.eventuallyEqual('1', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on D formatted cell', function (done) {
    dateFixt.momentFormat = "D";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');
    expect(theInput[0].value).to.eventuallyEqual('31', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on DD formatted cell', function (done) {
    dateFixt.momentFormat = "DD";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
    expect(theInput[0].value).to.eventuallyEqual('1', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on DD formatted cell', function (done) {
    dateFixt.momentFormat = "DD";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');
    expect(theInput[0].value).to.eventuallyEqual('31', {within: 1000, every: 100}, done);
    });
  });


  //BUG NEEDS FIXING
  // test('arrowUp on YYYY formatted cell', function (done) {
  //   dateFixt.momentFormat = "YYYY";

  //   flush(function () {
  //   var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
  //       theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

  //   MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
  //   expect(theInput[0].value).to.eventuallyEqual('00', {within: 1000, every: 100}, done);
  //   });
  // });
  test('arrowDown on YYYY formatted cell', function (done) {
    dateFixt.momentFormat = "YYYY";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');
    expect(theInput[0].value).to.eventuallyEqual('9999', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on YY formatted cell', function (done) {
    dateFixt.momentFormat = "YY";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
    expect(theInput[0].value).to.eventuallyEqual('0', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on YY formatted cell', function (done) {
    dateFixt.momentFormat = "YY";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');
    expect(theInput[0].value).to.eventuallyEqual('99', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on H formatted cell', function (done) {
    dateFixt.momentFormat = "H";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
    expect(theInput[0].value).to.eventuallyEqual('0', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on H formatted cell', function (done) {
    dateFixt.momentFormat = "H";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');
    expect(theInput[0].value).to.eventuallyEqual('23', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on HH formatted cell', function (done) {
    dateFixt.momentFormat = "HH";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
    expect(theInput[0].value).to.eventuallyEqual('0', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on HH formatted cell', function (done) {
    dateFixt.momentFormat = "HH";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');
    expect(theInput[0].value).to.eventuallyEqual('23', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on h formatted cell', function (done) {
    dateFixt.momentFormat = "h";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
    expect(theInput[0].value).to.eventuallyEqual('1', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on h formatted cell', function (done) {
    dateFixt.momentFormat = "h";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');
    expect(theInput[0].value).to.eventuallyEqual('12', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on "00" h formatted cell', function (done) {
    dateFixt.momentFormat = "h";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    theInput[0].value = "00";
    cells[0]._handleBlur();
    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');
    expect(theInput[0].value).to.eventuallyEqual('12', {within: 1000, every: 100}, done);
    });
  });

  test('arrowUp on hh formatted cell', function (done) {
    dateFixt.momentFormat = "hh";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
    expect(theInput[0].value).to.eventuallyEqual('1', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on hh formatted cell', function (done) {
    dateFixt.momentFormat = "hh";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');
    expect(theInput[0].value).to.eventuallyEqual('12', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on "00" hh formatted cell', function (done) {
    dateFixt.momentFormat = "hh";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    theInput[0].value = "00";
    cells[0]._handleBlur();
    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');
    expect(theInput[0].value).to.eventuallyEqual('12', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on k formatted cell', function (done) {
    dateFixt.momentFormat = "k";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');

    expect(theInput[0].value).to.eventuallyEqual('1', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on k formatted cell', function (done) {
    dateFixt.momentFormat = "k";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');

    expect(theInput[0].value).to.eventuallyEqual('24', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on "0" k formatted cell', function (done) {
    dateFixt.momentFormat = "k";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');
    theInput[0].value = "0";
    cells[0]._handleBlur();
    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');
    expect(theInput[0].value).to.eventuallyEqual('24', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on kk formatted cell', function (done) {
    dateFixt.momentFormat = "kk";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
    expect(theInput[0].value).to.eventuallyEqual('1', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on kk formatted cell', function (done) {
    dateFixt.momentFormat = "kk";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown')
    expect(theInput[0].value).to.eventuallyEqual('24', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on "00" kk formatted cell', function (done) {
    dateFixt.momentFormat = "kk";

    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "00";
      cells[0]._handleBlur();
      MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('24', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on m formatted cell', function (done) {
    dateFixt.momentFormat = "m";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');

    expect(theInput[0].value)
      .to.eventuallyEqual('0', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on m formatted cell', function (done) {
    dateFixt.momentFormat = "m";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');

    expect(theInput[0].value)
      .to.eventuallyEqual('59', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on mm formatted cell', function (done) {
    dateFixt.momentFormat = "mm";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');

    expect(theInput[0].value)
      .to.eventuallyEqual('0', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on mm formatted cell', function (done) {
    dateFixt.momentFormat = "mm";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');

    expect(theInput[0].value)
      .to.eventuallyEqual('59', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on s formatted cell', function (done) {
    dateFixt.momentFormat = "s";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');

    expect(theInput[0].value)
      .to.eventuallyEqual('0', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on s formatted cell', function (done) {
    dateFixt.momentFormat = "s";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');

    expect(theInput[0].value)
      .to.eventuallyEqual('59', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on ss formatted cell', function (done) {
    dateFixt.momentFormat = "ss";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');

    expect(theInput[0].value)
      .to.eventuallyEqual('0', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on ss formatted cell', function (done) {
    dateFixt.momentFormat = "ss";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');

    expect(theInput[0].value)
      .to.eventuallyEqual('59', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on S formatted cell', function (done) {
    dateFixt.momentFormat = "S";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');

    expect(theInput[0].value)
      .to.eventuallyEqual('0', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on S formatted cell', function (done) {
    dateFixt.momentFormat = "S";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');

    expect(theInput[0].value)
      .to.eventuallyEqual('9', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on SS formatted cell', function (done) {
    dateFixt.momentFormat = "SS";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');

    expect(theInput[0].value)
      .to.eventuallyEqual('0', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on SS formatted cell', function (done) {
    dateFixt.momentFormat = "SS";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');

    expect(theInput[0].value)
      .to.eventuallyEqual('99', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on SSS formatted cell', function (done) {
    dateFixt.momentFormat = "SSS";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');

    expect(theInput[0].value)
      .to.eventuallyEqual('0', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on SSS formatted cell', function (done) {
    dateFixt.momentFormat = "SSS";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 40, [], 'ArrowDown');

    expect(theInput[0].value)
      .to.eventuallyEqual('999', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on X formatted cell', function (done) {
    dateFixt.momentFormat = "X";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');

    expect(theInput[0].value)
      .to.eventuallyEqual('0', {within: 1000, every: 100}, done);
    });
  });

  test('arrowUp on x formatted cell', function (done) {
    dateFixt.momentFormat = "x";

    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

    MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');

    expect(theInput[0].value)
      .to.eventuallyEqual('0', {within: 1000, every: 100}, done);
    });
  });
});



/**
 * PX-DATETIME-ENTRY-CELL EMPTY
 */
suite('px-datetime-entry-cell invalid', function () {

  let dateFixt;

    setup(function(done) {
      dateFixt = fixture('dateEntryDropdown');
      now = Px.moment();
      dateFixt.momentObj = now;

      flush(()=>{
        var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
            theMonthInput = Polymer.dom(cells[1].root).querySelectorAll('.datetime-entry-input');

        theMonthInput[0].value = "99";
        cells[1]._handleBlur();
        done();
      });
    });


  test('arrowUp on invalid M formatted cell', function (done) {
    dateFixt.momentFormat = "M";
    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
      expect(theInput[0].value).to.eventuallyEqual('1', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on invalid M formatted cell', function (done) {
    dateFixt.momentFormat = "M";
    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('12', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on "00" M formatted cell', function (done) {
    dateFixt.momentFormat = "M";
    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "00";
      cells[0]._handleBlur();

      assert.equal(theInput[0].value, "00");
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('12', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on invalid MM formatted cell', function (done) {
    dateFixt.momentFormat = "MM";
    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
      expect(theInput[0].value).to.eventuallyEqual('1', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on invalid MM formatted cell', function (done) {
    dateFixt.momentFormat = "MM";
    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('12', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on "00" MM formatted cell', function (done) {
    dateFixt.momentFormat = "MM";
    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "00";
      cells[0]._handleBlur();

      assert.equal(theInput[0].value, "00");
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('12', {within: 1000, every: 100}, done);
    });
  });


  //BUG NEEDS FIXING
  // test('arrowUp on invalid YYYY formatted cell', function (done) {
  //   dateFixt.momentFormat = "YYYY/MM";
  //   flush(function () {
  //   var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
  //       theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

  //     theInput[0].value = "99";
  //     cells[0]._handleBlur();

  //     assert.isFalse(dateFixt.isValid);
  //     MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
  //     expect(theInput[0].value).to.eventuallyEqual('00', {within: 1000, every: 100}, done);
  //   });
  // });
  test('arrowDown on invalid YYYY formatted cell', function (done) {
    dateFixt.momentFormat = "YYYY/MM";
    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "00";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('1999', {within: 1000, every: 100}, done);
    });
  });



  test('arrowUp on invalid YY formatted cell', function (done) {
    dateFixt.momentFormat = "YY/MM";
    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
      expect(theInput[0].value).to.eventuallyEqual('0', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on invalid YY formatted cell', function (done) {
    dateFixt.momentFormat = "YY/MM";
    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "00";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('99', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on invalid H formatted cell', function (done) {
    dateFixt.momentFormat = "H";
    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
      expect(theInput[0].value).to.eventuallyEqual('0', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on invalid H formatted cell', function (done) {
    dateFixt.momentFormat = "H";
    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('23', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on invalid HH formatted cell', function (done) {
    dateFixt.momentFormat = "HH";
    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
      expect(theInput[0].value).to.eventuallyEqual('0', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on invalid HH formatted cell', function (done) {
    dateFixt.momentFormat = "HH";
    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('23', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on invalid h formatted cell', function (done) {
    dateFixt.momentFormat = "h";
    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
      expect(theInput[0].value).to.eventuallyEqual('1', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on invalid h formatted cell', function (done) {
    dateFixt.momentFormat = "h";
    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('12', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on "00" h formatted cell', function (done) {
    dateFixt.momentFormat = "h/MM";
    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "00";
      cells[0]._handleBlur();

      assert.equal(theInput[0].value, "00");
      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('12', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on invalid hh formatted cell', function (done) {
    dateFixt.momentFormat = "hh";
    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
      expect(theInput[0].value).to.eventuallyEqual('1', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on invalid hh formatted cell', function (done) {
    dateFixt.momentFormat = "hh";
    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('12', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on "00" hh formatted cell', function (done) {
    dateFixt.momentFormat = "hh/MM";
    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "00";
      cells[0]._handleBlur();

      assert.equal(theInput[0].value, "00");
      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('12', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on invalid k formatted cell', function (done) {
    dateFixt.momentFormat = "k";
    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
      expect(theInput[0].value).to.eventuallyEqual('1', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on invalid k formatted cell', function (done) {
    dateFixt.momentFormat = "k";
    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('24', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on "00" k formatted cell', function (done) {
    dateFixt.momentFormat = "k/MM";
    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "00";
      cells[0]._handleBlur();

      assert.equal(theInput[0].value, "00");
      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('24', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on invalid kk formatted cell', function (done) {
    dateFixt.momentFormat = "kk";
    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
      expect(theInput[0].value).to.eventuallyEqual('1', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on invalid kk formatted cell', function (done) {
    dateFixt.momentFormat = "kk";
    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('24', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on "00" kk formatted cell', function (done) {
    dateFixt.momentFormat = "kk/MM";
    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "00";
      cells[0]._handleBlur();

      assert.equal(theInput[0].value, "00");
      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('24', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on invalid m formatted cell', function (done) {
    dateFixt.momentFormat = "m";
    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
      expect(theInput[0].value).to.eventuallyEqual('0', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on invalid m formatted cell', function (done) {
    dateFixt.momentFormat = "m";
    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('59', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on invalid mm formatted cell', function (done) {
    dateFixt.momentFormat = "mm";
    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
      expect(theInput[0].value).to.eventuallyEqual('0', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on invalid mm formatted cell', function (done) {
    dateFixt.momentFormat = "mm";
    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('59', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on invalid s formatted cell', function (done) {
    dateFixt.momentFormat = "s";
    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
      expect(theInput[0].value).to.eventuallyEqual('0', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on invalid s formatted cell', function (done) {
    dateFixt.momentFormat = "s";
    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('59', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on invalid ss formatted cell', function (done) {
    dateFixt.momentFormat = "ss";
    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
      expect(theInput[0].value).to.eventuallyEqual('0', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on invalid ss formatted cell', function (done) {
    dateFixt.momentFormat = "ss";
    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('59', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on invalid S formatted cell', function (done) {
    dateFixt.momentFormat = "S/MM";
    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
      expect(theInput[0].value).to.eventuallyEqual('0', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on invalid S formatted cell', function (done) {
    dateFixt.momentFormat = "S/MM";
    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "00";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('9', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on invalid SS formatted cell', function (done) {
    dateFixt.momentFormat = "SS/MM";
    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "99";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
      expect(theInput[0].value).to.eventuallyEqual('0', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on invalid SS formatted cell', function (done) {
    dateFixt.momentFormat = "SS/MM";
    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "00";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('99', {within: 1000, every: 100}, done);
    });
  });


  test('arrowUp on invalid SSS formatted cell', function (done) {
    dateFixt.momentFormat = "SSS/MM";
    flush(function () {
    var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "999";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowUp');
      expect(theInput[0].value).to.eventuallyEqual('0', {within: 1000, every: 100}, done);
    });
  });
  test('arrowDown on invalid SSS formatted cell', function (done) {
    dateFixt.momentFormat = "SSS/MM";
    flush(function () {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          theInput = Polymer.dom(cells[0].root).querySelectorAll('.datetime-entry-input');

      theInput[0].value = "000";
      cells[0]._handleBlur();

      assert.isFalse(dateFixt.isValid);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 38, [], 'ArrowDown');
      expect(theInput[0].value).to.eventuallyEqual('999', {within: 1000, every: 100}, done);
    });
  });
});


/**
 * DATETIME-ENTRY EMPTY
 */
suite('px-datetime-entry empty', function () {

  let dateFixt;

  setup(function (done) {
    dateFixt = fixture('dateEntryDropdown');
    timeFixt = fixture('timeEntry');

    flush(() => {
      done();
    });
  });


  test('dropdown mode uses a px-dropdown in empty state', function (done) {
    flush(function () {
      var dropdown = Polymer.dom(dateFixt.root).querySelector('px-dropdown'),
        text = Polymer.dom(dateFixt.root).querySelector('#timeZoneText');

      assert.isNotNull(dropdown);
      assert.isNull(text);
      assert.notEqual(dropdown.style.display, 'none');
      done();
    });
  });


  test('extended dropdown mode uses a px-dropdown in empty state', function (done) {
    dateExFixt = fixture('dateEntryExtDropdown');

    flush(function () {
      var dropdown = Polymer.dom(dateExFixt.root).querySelector('px-dropdown'),
        text = Polymer.dom(dateExFixt.root).querySelector('#timeZoneText');

      assert.isNotNull(dropdown);
      assert.isNull(text);
      assert.notEqual(dropdown.style.display, 'none');
      done();
    });
  });


  test('text mode uses a span in empty state', function (done) {
    timeFixt = fixture('timeEntry');

    flush(function () {
      var text = Polymer.dom(timeFixt.root).querySelector('#timeZoneText'),
        dropdown = Polymer.dom(timeFixt.root).querySelector('px-dropdown');

      assert.isNotNull(text);
      assert.isNull(dropdown);
      assert.notEqual(text.style.display, 'none');
      done();
    });
  });


  test('abbreviatedText mode uses a span in empty state', function (done) {
    dateAbbTextFixt = fixture('dateEntryAbbText');

    flush(function () {
      var text = Polymer.dom(dateAbbTextFixt.root).querySelector('#timeZoneText'),
        dropdown = Polymer.dom(dateAbbTextFixt.root).querySelector('px-dropdown');

      assert.isNotNull(text);
      assert.isNull(dropdown);
      assert.notEqual(text.style.display, 'none');
      done();
    });
  });
});
