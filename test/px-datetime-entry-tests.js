// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {
  // Place any setup steps like variable declaration and initialization here

  var date1 = document.getElementById('dateEntry'),
      date2 = document.getElementById('dateEntry2'),
      date3 = document.getElementById('dateEntry3'),
      date4 = document.getElementById('dateEntry4'),
      date5 = document.getElementById('dateEntry5'),
      time1 = document.getElementById('timeEntry'),
      time2 = document.getElementById('timeEntry2'),
      now = moment();

      date1.momentObj = now;
      date2.momentObj = now.clone();
      date3.momentObj = now.clone();
      date4.momentObj = now.clone();
      date5.momentObj = now.clone();
      time1.momentObj = now.clone();
      time2.momentObj = now.clone();

  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('Custom Automation Tests for px-datetime-entry', function() {

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

      //entering 2 characters + arrow right should autocomplete + move to the next cell.
      //Unfortunately our code relies on focus() which doesn't seem to
      //work in the testing environment. Instead listen to the event that will result
      //in the cell to be changed
      cells[0].addEventListener('px-entry-cell-move', function(evt) {

        //fake the moving ourselves.............
        cells[0]._handleBlur();
debugger;
        //make sure autocomplete happened
        assert.equal(cells[0].dtWorkingCopy, 2022);
        assert.equal(firstInput.value, 2022);
        done();
      })
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

      //entering 4 characters should move to the next cell.
      //Unfortunately our code relies on focus() which doesn't seem to
      //work in the testing environment. Instead listen to the event that will result
      //in the cell to be changed
      cells[0].addEventListener('px-entry-cell-move', function(evt) {

        //fake the moving ourselves.............
        cells[0]._handleBlur();
debugger;
        //make sure autocomplete happened
        assert.equal(cells[0].dtWorkingCopy, 2222);
        assert.equal(firstInput.value, 2222);
        done();
      })
      fireKeyboardEvent(cells[0], '2');
    });
  });
};

function fireKeyboardEvent(elem, key){
  var evt = new CustomEvent('keydown',{detail:{'key':key,'keyIdentifier':key}});
   elem.dispatchEvent(evt);
}
