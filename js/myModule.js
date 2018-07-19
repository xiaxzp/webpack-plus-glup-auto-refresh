
;(function(window, factory) {
  //amd
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') { //umd commonjs
    module.exports = factory();
  } else {
    window.myModulefunction = factory();
  }
})(this, function() {
    //import styles from './greeter.css';//导入
    const styles = require('./greeter.css');
    var doc = document, win = window;
  var myModulefunction = function()
  {
    console.log('myModuleLoaded');
  }
  myModulefunction.gettype = function () {
    return console.log(typeof myModulefunction);
  }
  myModulefunction.generateDiv = function(){
    var greet = document.createElement('div');
    greet.className = styles.root;
    greet.innerText = "Hi there and greetings!Aa";
    return greet;
  }
  return myModulefunction;
});
