var goodEggs = require('./goodEggs.js').goodEggs;

var assertEqual = function(result, expected){
  if(Array.isArray(result)){
    report(result, expected, compareArray);
  }else{
    report(result, expected, compareString);
  }
};

var report = function(result, expected, cb){
  var consoleReport = result + " SHOULD EQUAL " + expected + "\n";
  if(cb(result, expected)){
    console.log("\n***SUCCESS***");
    console.log(consoleReport);
  }else{
    console.log("\n***FAILED***");
    console.log(consoleReport);
  }
};

var compareArray = function(resultArray, expected){
  if(Array.isArray(resultArray)){
    if(!Array.isArray(expected)){
      console.log("Expected must be an array");
      return;
    }
    for(var i=0; i<resultArray.length; i++){
      if(!compareString(resultArray[i], expected[i])){
        return false;
      };
    }
    return true;
  }
};

var compareString = function(resultString, expectedString){
  if(resultString === expectedString){
    return true;
  } else {
    return false;
  }
};

assertEqual(goodEggs.pigLatin("hello"), "ellohay");
assertEqual(goodEggs.pigLatin("hello world"), "ellohay orldway" );
assertEqual(goodEggs.pigLatin("Hello world"), "Ellohay orldway");
assertEqual(goodEggs.pigLatin("Hello Alon"), "Ellohay Alonay");
assertEqual(goodEggs.findEndingBlock("Brick's!"), "'s!");
assertEqual(goodEggs.findFirstBlock("Brick"), "Br");
assertEqual(goodEggs.pigLatin("Brick House"), "Ickbray Ousehay");
assertEqual(goodEggs.findPunctuation("R-i_c*k's"), ["-", "_", "*", "'"]);
assertEqual(goodEggs.pigLatin("Rick's house is great!"), "Ickray's ousehay isay eatgray!");
