var pigLatin = function(str){
  var stringArray = str.split(" ");
  var resultArray = stringArray.map(wordPigLatin);
  return resultArray.join(" ");
}

var wordPigLatin = function(str){
  // scrub string for punctuation
  var punctuationArray = findPunctuation(str);
  var letterOnlyStr = str.replace(/[^a-zA-Z]/ig, "");
  var firstLetter = letterOnlyStr[0];

  var replacer = function(match){
    var offset = arguments[1];
    var replaceStr = newSubString || letterOnlyStr;
    var cleanString = replaceStr[offset];
    if(offset === arguments[2] + 1){
      console.log("RAN");
      cleanString + "ay";
    }
    console.log("replaceStr", replaceStr, "cleanString", cleanString, "match", match, "offset", offset, "arguments", arguments);
    return cleanString;
  };

  //if first letter is vowel, simple transform and return out
  if(checkVowel(firstLetter)){
    return str.replace(/[a-zA-Z]*/ig, replacer) + "ay";
  }

  var firstBlock = findFirstBlock(letterOnlyStr);
  var secondBlock = letterOnlyStr[firstBlock.length];

  //Manage capitalization rules
  if(firstLetter.match(/[A-Z]/g)){
    firstBlock = firstBlock.toLowerCase();
    secondBlock = secondBlock.toUpperCase();
  }

  var newSubString = secondBlock + letterOnlyStr.slice(firstBlock.length + secondBlock.length) + firstBlock + "ay";

  return str.replace(/[a-zA-Z]*/ig, replacer);
};

var findPunctuation = function(word){
  var nonCharacReg = /[^a-zA-Z]/ig;
  return word.match(nonCharacReg);
}

var addPunctuationConcat = function(punctuationObj, firstBlock, seconBlock, string){

}

var findFirstBlock = function(word){
  var letterArray = word.split("");
  var firstBlock = "";
  var location = 0;

  var  checkConsonant= function(letter){
    if(letter >= "A" && letter <= "Z" || letter >= "a" && letter <= "z"){
      if(!checkVowel(letter)){
        return true;
      }
    }
  };

  letterArray.forEach(function(letter, index){
    if(checkConsonant(letter) && index === location){
      location++;
      firstBlock += letter;
    };
  });

  return firstBlock;
}
var checkConsonant = function(letter){
  var consoRegEx = /[bcdfghjklmnpqrstvwxyz]+/i;
  return consoRegex.test(letter);
}
var checkVowel = function(letter){
  var vowelRegex = /[aeiou]+/i;
  return vowelRegex.test(letter);
}


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
    console.log("Success");
    console.log(consoleReport);
  }else{
    console.log("FAILED");
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

assertEqual(pigLatin("hello"), "ellohay");
assertEqual(pigLatin("hello world"), "ellohay orldway" );
assertEqual(pigLatin("Hello world"), "Ellohay orldway");
assertEqual(pigLatin("Hello Alon"), "Ellohay Alonay");
assertEqual(findFirstBlock("Brick"), "Br");
assertEqual(pigLatin("Brick House"), "Ickbray Ousehay");
assertEqual(findPunctuation("R-i_c*k's"), ["-", "_", "*", "'"]);
assertEqual(addPunctuationConcat({4: "'"}, "r", "I", "cks"), "Ickray's");
assertEqual(pigLatin("Rick's house is great!"), "Ickray's ousehay isay eatgray!");
