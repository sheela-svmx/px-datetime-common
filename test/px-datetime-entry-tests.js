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

    test('cell selection', function(done) {
      var cells = Polymer.dom(date1.root).querySelectorAll('px-datetime-entry-cell'),
          firstInput = Polymer.dom(cells[0].root).querySelector('input');

      var clicked = function(event) {

        assert.isTrue(date1.isSelected);
        assert.isTrue(cells[0].isSelected);
        assert.isFalse(cells[1].isSelected);
        done();
      }

      //hook event handler on first cell
      firstInput.addEventListener('click', clicked);
      firstInput.click();
    });

  });
};
