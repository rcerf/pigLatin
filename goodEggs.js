var goodEggs = {};
var pigLatin = goodEggs.pigLatin = function(str){
  var stringArray = str.split(" ");
  var resultArray = stringArray.map(wordPigLatin);
  return resultArray.join(" ");
}

var wordPigLatin = goodEggs.wordPigLatin = function(str){
  // scrub string for punctuation
  var endingBlock = findEndingBlock(str);
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

var findEndingBlock = goodEggs.findEndingBlock = function(word){
  var endingBlock = /([^A-Za-z\s]{1})([A-Za-z]{0,1})/gi
  var resultArray = word.match(endingBlock);
  console.log("EndingBlock", resultArray);
  return resultArray ? resultArray.join('') : resultArray;
}

var findPunctuation = goodEggs.findPunctuation = function(word){
  var nonCharacReg = /[^a-zA-Z]/ig;
  return word.match(nonCharacReg);
}

var findFirstBlock = goodEggs.findFirstBlock = function(word){
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
var checkConsonant = goodEggs.checkConsonant = function(letter){
  var consoRegEx = /[bcdfghjklmnpqrstvwxyz]+/i;
  return consoRegex.test(letter);
}
var checkVowel = function(letter){
  var vowelRegex = /[aeiou]+/i;
  return vowelRegex.test(letter);
};

exports.goodEggs = goodEggs;
