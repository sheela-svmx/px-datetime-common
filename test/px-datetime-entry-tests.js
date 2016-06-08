// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {
  // Place any setup steps like variable declaration and initialization here

  var date1 = document.getElementById('dateEntry'),
      date2 = document.getElementById('dateEntry2'),
      time1 = document.getElementById('timeEntry'),
      now = moment();

      date1.momentObj = now;
      date2.momentObj = now.clone();
      time1.momentObj = now.clone();


  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('Interaction px-datetime-entry', function() {

    test('cell selection', function() {
      var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell');

      //simulate focus on first cell..............................................
      cells[0]._handleFocus();

      assert.isTrue(date1.isSelected);
      assert.isTrue(cells[0].isSelected);
      assert.isFalse(cells[1].isSelected);

    });

    test('cell keyboard up and down', function() {
      var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell'),
          currentYear = parseInt(cells[0].dtWorkingCopy);

      fireKeyboardEvent(cells[0], 'ArrowUp');
      assert.equal(currentYear + 1, parseInt(cells[0].dtWorkingCopy))
      fireKeyboardEvent(cells[0], 'ArrowDown');
      assert.equal(currentYear , parseInt(cells[0].dtWorkingCopy))
    });

    test('cell keyboard autocomplete onleaving', function(done) {
      var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell'),
          firstInput = Polymer.dom(cells[0].root).querySelector('input'),
          currentYear = parseInt(cells[0].dtWorkingCopy);

      fireKeyboardEvent(cells[0], '2');
      fireKeyboardEvent(cells[0], '2');

      var listener = function(evt) {

        //fake the moving ourselves.............
        cells[0]._handleBlur();

        //make sure autocomplete happened
        assert.equal(cells[0].dtWorkingCopy, 2022);
        assert.equal(firstInput.value, 2022);
        cells[0].removeEventListener('px-entry-cell-move', listener);
        done();
      }
      //entering 2 characters + arrow right should autocomplete + move to the next cell.
      //Unfortunately our code relies on focus() which doesn't seem to
      //work in the testing environment. Instead listen to the event that will result
      //in the cell to be changed
      cells[0].addEventListener('px-entry-cell-move', listener);
      fireKeyboardEvent(cells[0], 'ArrowRight');
    });

    test('auto move to next cell', function(done) {
      var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell'),
          firstInput = Polymer.dom(cells[0].root).querySelector('input'),
          currentYear = parseInt(cells[0].dtWorkingCopy);


      //simulate focus on first cell..............................................
      cells[0]._handleFocus();
      fireKeyboardEvent(cells[0], '2');
      fireKeyboardEvent(cells[0], '2');
      fireKeyboardEvent(cells[0], '2');

      var listener = function(evt) {

        //fake the moving ourselves.............
        cells[0]._handleBlur();
        //make sure autocomplete happened
        assert.equal(cells[0].dtWorkingCopy, 2222);
        assert.equal(firstInput.value, 2222);
        cells[0].removeEventListener('px-entry-cell-move', listener)
        done();
      };

      //entering 4 characters should move to the next cell.
      //Unfortunately our code relies on focus() which doesn't seem to
      //work in the testing environment. Instead listen to the event that will result
      //in the cell to be changed
      cells[0].addEventListener('px-entry-cell-move', listener);
      fireKeyboardEvent(cells[0], '2');
    });

    test('move cells with right arrow', function(done) {
      var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell');

      //simulate focus on first cell....
      cells[0]._handleFocus();

      var listener = function(evt) {

        assert.equal(evt.detail.dir, 1);
        cells[0].removeEventListener('px-entry-cell-move', listener)
        done();
      };

      //pressing right arrow should move to the next cell.
      //Unfortunately our code relies on focus() which doesn't seem to
      //work in the testing environment. Instead listen to the event that will result
      //in the cell to be changed
      cells[0].addEventListener('px-entry-cell-move', listener);
      fireKeyboardEvent(cells[0], 'ArrowRight');
    });

    test('previous field when pressing left on first cell', function(done) {
      var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell');

      //simulate focus on first cell....
      cells[0]._handleFocus();

      var listener = function(evt) {

        date1.removeEventListener('px-previous-field', listener)
        done();
      };

      //pressing left arrow on first cell should fire previous field event
      date1.addEventListener('px-previous-field', listener);
      fireKeyboardEvent(cells[0], 'ArrowLeft');
    });

    test('NOT previous field when pressing left on last cell', function(done) {
      var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell');

      //simulate focus on first cell....
      cells[cells.length-1]._handleFocus();

      var listener = function(evt) {

        date1.removeEventListener('px-previous-field', listener);
        assert.isTrue(false);
        done();
      };

      //pressing left arrow on first cell should fire previous field event
      date1.addEventListener('px-previous-field', listener);
      fireKeyboardEvent(cells[cells.length-1], 'ArrowLeft');

      setTimeout(function() {
        date1.removeEventListener('px-previous-field', listener)
        done();
      }, 200);
    });


    test('next field when pressing right on last cell', function(done) {
      var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell');

      //simulate focus on first cell....
      cells[cells.length - 1]._handleFocus();

      var listener = function(evt) {

        date1.removeEventListener('px-next-field', listener)
        done();
      };

      //pressing right arrow on last cell should fire next field event
      date1.addEventListener('px-next-field', listener);
      fireKeyboardEvent(cells[cells.length - 1], 'ArrowRight');
    });

    test('NOT next field when pressing right on first cell', function(done) {
      var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell');

      //simulate focus on first cell....
      cells[0]._handleFocus();

      var listener = function(evt) {

        assert.isTrue(false);
        date1.removeEventListener('px-next-field', listener)
        done();
      };

      //pressing right arrow on first cell should not fire next field event
      date1.addEventListener('px-next-field', listener);
      fireKeyboardEvent(cells[0], 'ArrowRight');

      setTimeout(function() {
        date1.removeEventListener('px-next-field', listener)
        done();
      }, 200);
    });

    test('move cells with left arrow', function(done) {
      var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell');

      //simulate focus on first cell....
      cells[0]._handleFocus();

      var listener = function(evt) {

        assert.equal(evt.detail.dir, -1);
        cells[0].removeEventListener('px-entry-cell-move', listener)
        done();
      };

      //pressing right arrow should move to the next cell.
      //Unfortunately our code relies on focus() which doesn't seem to
      //work in the testing environment. Instead listen to the event that will result
      //in the cell to be changed
      cells[0].addEventListener('px-entry-cell-move', listener);
      fireKeyboardEvent(cells[0], 'ArrowLeft');
    });

    test('click on date icon fires event', function(done) {
      var iconLabel = Polymer.dom(date1.root).querySelector('#wrapper > div > label');

      var listener = function(evt) {
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

    test('click on time icon fires event', function(done) {
      var iconLabel = Polymer.dom(time1.root).querySelector('#wrapper > div > label');

      var listener = function(evt) {
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

    test('AM/PM', function() {
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
  });

  suite('Validation', function() {

    test('auto validation', function(done) {
      var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell');

      //simulate focus on second cell....
      cells[1]._handleBlur();
      cells[1]._handleFocus();

      //change value to 99
      fireKeyboardEvent(cells[1], '9');
      fireKeyboardEvent(cells[1], '9');

      //wait for validation to kick in
      setTimeout(function() {

        assert.isFalse(date1.isValid);
        done();
      }, 200);
    });

    test('validation on enter', function(done) {
      var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell');

      //simulate focus on second cell....
      cells[1]._handleFocus();

      //change value to 02
      fireKeyboardEvent(cells[1], '0');
      fireKeyboardEvent(cells[1], '2');

      //wait for validation to kick in
      setTimeout(function() {

        assert.isTrue(date1.isValid);

        //simulate focus on second cell....
        cells[1]._handleFocus();
        //press 0 then enter => autocomplete to 0 and date invalidated
        fireKeyboardEvent(cells[1], '0');
        fireKeyboardEvent(cells[1], 'Enter');
        assert.equal(cells[1].dtWorkingCopy, 00);

        //wait for validation to kick in
        setTimeout(function() {

          assert.isFalse(date1.isValid);

          //reset it to somwhting valid
          fireKeyboardEvent(cells[1], '1');
          fireKeyboardEvent(cells[1], 'Enter');

          done();
        }, 200);
      }, 200);
    });

    test('dont allow future dates if not explicitely asked', function(done) {
      date2.momentObj = date2.momentObj.clone().add(1, 'month');

      //wait for validation to kick in
      setTimeout(function() {
        assert.isFalse(date2.isValid);
        done();
      }, 200);
    });
  });
};

function fireKeyboardEvent(elem, key){
  var evt = new CustomEvent('keydown',{detail:{'key':key,'keyIdentifier':key}});
   elem.dispatchEvent(evt);
}
