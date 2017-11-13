suite('Interaction px-datetime-entry', function () {

  let date1, date2, time1, now, fireKeyboardEvent;

  setup(function(done) {
    date1 = fixture('dateEntry');
    date2 = fixture('dateEntry2');
    time1 = fixture('timeEntry');
    now = Px.moment();

    date1.momentObj = now;
    date2.momentObj = now.clone();
    time1.momentObj = now.clone();

    fireKeyboardEvent = function(elem, key) {
      var evt = new CustomEvent('keydown', { detail: { 'key': key, 'keyIdentifier': key } });
      elem.dispatchEvent(evt);
    };

    flush(()=>{
      done();
    });

  });


  test('cell selection', function () {
    var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell');

    //simulate focus on first cell.........
    cells[0]._handleFocus();

    assert.isTrue(date1.isSelected);
    assert.isTrue(cells[0].isSelected);
    assert.isFalse(cells[1].isSelected);
  });

  test('cell keyboard up and down', function () {
    var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell'),
        currentYear = parseInt(cells[0].dtWorkingCopy);

    fireKeyboardEvent(cells[0], 'ArrowUp');
    assert.equal(currentYear + 1, parseInt(cells[0].dtWorkingCopy));
    fireKeyboardEvent(cells[0], 'ArrowDown');
    assert.equal(currentYear, parseInt(cells[0].dtWorkingCopy));
  });

  test('cell keyboard autocomplete onleaving', function (done) {
    var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell'),
      firstInput = Polymer.dom(cells[0].root).querySelector('input'),
      currentYear = parseInt(cells[0].dtWorkingCopy);

    fireKeyboardEvent(cells[0], '2');
    fireKeyboardEvent(cells[0], '2');

    var listener = function (evt) {

      //fake the moving ourselves.............
      cells[0]._handleBlur();

      //make sure autocomplete happened
      assert.equal(cells[0].dtWorkingCopy, 2022);
      assert.equal(firstInput.value, 2022);
      cells[0].removeEventListener('px-entry-cell-move', listener);
      done();
    };
    //entering 2 characters + arrow right should autocomplete + move to the next cell.
    //Unfortunately our code relies on focus() which doesn't seem to
    //work in the testing environment. Instead listen to the event that will result
    //in the cell to be changed
    cells[0].addEventListener('px-entry-cell-move', listener);
    fireKeyboardEvent(cells[0], 'ArrowRight');
  });

  test('auto move to next cell', function (done) {
    var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell'),
      firstInput = Polymer.dom(cells[0].root).querySelector('input'),
      currentYear = parseInt(cells[0].dtWorkingCopy);


    //simulate focus on first cell..............................................
    cells[0]._handleFocus();
    fireKeyboardEvent(cells[0], '2');
    fireKeyboardEvent(cells[0], '2');
    fireKeyboardEvent(cells[0], '2');

    var listener = function (evt) {

      //fake the moving ourselves.............
      cells[0]._handleBlur();
      //make sure autocomplete happened
      assert.equal(cells[0].dtWorkingCopy, 2222);
      assert.equal(firstInput.value, 2222);
      cells[0].removeEventListener('px-entry-cell-move', listener);
      done();
    };

    //entering 4 characters should move to the next cell.
    //Unfortunately our code relies on focus() which doesn't seem to
    //work in the testing environment. Instead listen to the event that will result
    //in the cell to be changed
    cells[0].addEventListener('px-entry-cell-move', listener);
    fireKeyboardEvent(cells[0], '2');
  });

  test('move cells with right arrow', function (done) {
    var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell');

    //simulate focus on first cell....
    cells[0]._handleFocus();

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
    fireKeyboardEvent(cells[0], 'ArrowRight');
  });

  test('previous field when pressing left on first cell', function (done) {
    var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell');

    //simulate focus on first cell....
    cells[0]._handleFocus();

    var listener = function (evt) {

      date1.removeEventListener('px-previous-field', listener);
      done();
    };

    //pressing left arrow on first cell should fire previous field event
    date1.addEventListener('px-previous-field', listener);
    fireKeyboardEvent(cells[0], 'ArrowLeft');
  });

  test('NOT previous field when pressing left on last cell', function (done) {
    var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell');

    //simulate focus on first cell....
    cells[cells.length - 1]._handleFocus();

    var listener = function (evt) {

      date1.removeEventListener('px-previous-field', listener);
      assert.isTrue(false);
      done();
    };

    //pressing left arrow on first cell should fire previous field event
    date1.addEventListener('px-previous-field', listener);
    fireKeyboardEvent(cells[cells.length - 1], 'ArrowLeft');

    setTimeout(function () {
      date1.removeEventListener('px-previous-field', listener);
      done();
    }, 200);
  });


  test('next field when pressing right on last cell', function (done) {
    var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell');

    //simulate focus on first cell....
    cells[cells.length - 1]._handleFocus();

    var listener = function (evt) {

      date1.removeEventListener('px-next-field', listener);
      done();
    };

    //pressing right arrow on last cell should fire next field event
    date1.addEventListener('px-next-field', listener);
    fireKeyboardEvent(cells[cells.length - 1], 'ArrowRight');
  });

  test('NOT next field when pressing right on first cell', function (done) {
    var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell');

    //simulate focus on first cell....
    cells[0]._handleFocus();

    var listener = function (evt) {

      assert.isTrue(false);
      date1.removeEventListener('px-next-field', listener);
      done();
    };

    //pressing right arrow on first cell should not fire next field event
    date1.addEventListener('px-next-field', listener);
    fireKeyboardEvent(cells[0], 'ArrowRight');

    setTimeout(function () {
      date1.removeEventListener('px-next-field', listener);
      done();
    }, 200);
  });

  test('move cells with left arrow', function (done) {
    var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell');

    //simulate focus on first cell....
    cells[0]._handleFocus();

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
    fireKeyboardEvent(cells[0], 'ArrowLeft');
  });

  test('click on date icon fires event', function (done) {
    var iconLabel = Polymer.dom(date1.root).querySelector('#wrapper > div > div');

    var listener = function (evt) {
      assert.equal(evt.detail.dateOrTime, 'Date');
      done();
    };

    //pressing right arrow should move to the next cell.
    //Unfortunately our code relies on focus() which doesn't seem to
    //work in the testing environment. Instead listen to the event that will result
    //in the cell to be changed
    date1.addEventListener('px-datetime-entry-icon-clicked', listener);
    iconLabel.click();
  });

  test('click on time icon fires event', function (done) {
    var iconLabel = Polymer.dom(time1.root).querySelector('#wrapper > div > div');

    var listener = function (evt) {
      assert.equal(evt.detail.dateOrTime, 'Time');
      done();
    };

    //pressing right arrow should move to the next cell.
    //Unfortunately our code relies on focus() which doesn't seem to
    //work in the testing environment. Instead listen to the event that will result
    //in the cell to be changed
    time1.addEventListener('px-datetime-entry-icon-clicked', listener);
    iconLabel.click();
  });

  test('AM/PM', function () {
    var cells = Polymer.dom(time1.root).querySelectorAll('px-datetime-entry-cell');

    //focus last cell
    cells[cells.length - 1]._handleFocus();

    fireKeyboardEvent(cells[cells.length - 1], 'a');
    assert.equal(cells[cells.length - 1].dtWorkingCopy, 'AM');
    fireKeyboardEvent(cells[cells.length - 1], 'p');
    assert.equal(cells[cells.length - 1].dtWorkingCopy, 'PM');
    fireKeyboardEvent(cells[cells.length - 1], 'a');
    assert.equal(cells[cells.length - 1].dtWorkingCopy, 'AM');
    fireKeyboardEvent(cells[cells.length - 1], 'up');
    assert.equal(cells[cells.length - 1].dtWorkingCopy, 'PM');
    fireKeyboardEvent(cells[cells.length - 1], 'down');
    assert.equal(cells[cells.length - 1].dtWorkingCopy, 'AM');
  });

  test('dropdown mode uses a px-dropdown', function (done) {
    date2.showTimeZone = 'dropdown';

    flush(function () {
      var dropdown = Polymer.dom(date2.root).querySelector('px-dropdown'),
        text = Polymer.dom(date2.root).querySelector('#timeZoneText');

      assert.isNotNull(dropdown);
      assert.isNull(text);
      assert.notEqual(dropdown.style.display, 'none');
      done();
    });
  });

  test('extended dropdown mode uses a px-dropdown', function (done) {
    date2.showTimeZone = 'extendedDropdown';

    flush(function () {
      var text = Polymer.dom(date2.root).querySelector('#timeZoneText'),
        dropdown = Polymer.dom(date2.root).querySelector('px-dropdown');
      assert.isNotNull(dropdown);
      assert.isNull(text);
      assert.notEqual(dropdown.style.display, 'none');
      done();
    });
  });

  test('text mode uses a span', function (done) {
    date2.showTimeZone = 'text';

    flush(function () {
      var text = Polymer.dom(date2.root).querySelector('#timeZoneText'),
        dropdown = Polymer.dom(date2.root).querySelector('px-dropdown');
      assert.isNotNull(text);
      assert.equal(dropdown.style.display, 'none');
      assert.notEqual(text.style.display, 'none');
      done();
    });
  });

  test('abbreviated text mode uses a span', function (done) {
    date2.showTimeZone = 'abbreviatedText';

    flush(function () {
      var text = Polymer.dom(date2.root).querySelector('#timeZoneText'),
        dropdown = Polymer.dom(date2.root).querySelector('px-dropdown');
      assert.isNotNull(text);
      assert.equal(dropdown.style.display, 'none');
      assert.notEqual(text.style.display, 'none');
      done();
    });
  });

  test('auto validation', function (done) {
    var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell');

    //simulate focus on second cell....
    cells[1]._handleBlur();
    cells[1]._handleFocus();

    //change value to 99
    fireKeyboardEvent(cells[1], '9');
    fireKeyboardEvent(cells[1], '9');

    //wait for validation to kick in
    setTimeout(function () {

      assert.isFalse(date1.isValid);
      done();
    }, 200);
  });

  test('validation on enter', function (done) {
    var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell');

    //simulate focus on second cell....
    cells[1]._handleFocus();

    //change value to 02
    fireKeyboardEvent(cells[1], '0');
    fireKeyboardEvent(cells[1], '3');

    //wait for validation to kick in
    setTimeout(function () {
      assert.isTrue(date1.isValid);
      //simulate focus on second cell....
      cells[1]._handleFocus();
      //press 0 then enter => autocomplete to 0 and date invalidated
      fireKeyboardEvent(cells[1], '0');
      fireKeyboardEvent(cells[1], 'Enter');
      assert.equal(cells[1].dtWorkingCopy, 0);

      //wait for validation to kick in
      setTimeout(function () {

        assert.isFalse(date1.isValid);

        //reset it to something valid
        fireKeyboardEvent(cells[1], '1');
        fireKeyboardEvent(cells[1], 'Enter');

        done();
      }, 200);
    }, 200);
  });

  test('block future dates', function (done) {
    date2.momentObj = date2.momentObj.clone().add(1, 'month');

    //wait for validation to kick in
    setTimeout(function () {
      assert.isFalse(date2.isValid);
      done();
    }, 200);
  });

  test('block dates before min', function (done) {
    date1.set('min', date1.momentObj.clone().subtract(1, 'day'));
    date1.momentObj = date1.momentObj.clone().subtract(1, 'month');

    //wait for validation to kick in
    setTimeout(function () {
      assert.isFalse(date1.isValid);
      done();
    }, 200);
  });

  test('block dates after max', function (done) {
    date1.set('max', date1.momentObj.clone().add(1, 'day'));
    date1.momentObj = date1.momentObj.clone().add(1, 'month');

    //wait for validation to kick in
    setTimeout(function () {
      assert.isFalse(date1.isValid);
      done();
    }, 200);
  });

  test('_convertISOtoMoment', function () {
    var moment = date1._convertISOtoMoment("2009-06-07T00:00:00Z");
    assert.isTrue(moment.isValid());
  });

  test('_preserveTime', function () {
    var moment = date1._convertISOtoMoment("2016-04-03T00:00:00Z"),
      moment2 = date1._convertISOtoMoment("2009-06-07T10:32:06Z");
    moment2.milliseconds('500');

    var result = date1._preserveTime(moment2, moment);

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
    date1.timeZone = 'Pacific/Noumea';
    assert.equal(date1.momentObj.tz(), 'Pacific/Noumea');
  });

});

suite('buttons', function () {

  let buttons;

  setup(function(done) {
    buttons = fixture('buttons');
    flush(()=>{
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
});

suite('presets', function (done) {

  let presets, now;

  setup(function(done) {
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
    flush(()=>{
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
});
