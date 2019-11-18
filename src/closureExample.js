var testAPI = function () {
 
  var counter = 0;

  var add4 = function(value) {
    console.log("The mystery is " + (value + 4))
  }
 
  return {
 
    increaseCounter: function (value) {
      console.log( "counter: " + (counter + value) );
      return counter += value;
    },
 
    resetCounter: function () {
      console.log( "counter value prior to reset: " + counter );
      counter = 0;
    },

    performMystery: function (value) {
      add4(value)
    }
  };
 
}

var testModule = testAPI();

// Usage:
 
// Increment our counter
testModule.increaseCounter(3);
testModule.increaseCounter(2);
testModule.increaseCounter(4);
testModule.performMystery(4);


// Check the counter value and reset
// Outputs: counter value prior to reset: 1
testModule.resetCounter();

console.log(testModule.counter);