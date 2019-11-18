// Global module
var myModule = (function() {
  // Module object
  var module = { privateVariable: "Hello World" }

  function privateMethod() {
    // ...
  }

  module.publicProperty = "Foobar";
  module.publicMethod = function() {
    console.log(this.privateVariable);
  };

  return module;
})();

console.log(myModule.publicProperty);
myModule.publicMethod();
