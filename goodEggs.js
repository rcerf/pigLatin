var goodEggs = {};
var pigLatin = goodEggs.pigLatin = function(str){
  var stringArray = str.split(" ");
  var resultArray = stringArray.map(wordPigLatin);
  return resultArray.join(" ");
}

var wordPigLatin = goodEggs.wordPigLatin = function(str){
  // grab possesive or contraction endingblock
  var endingBlock = findEndingBlock(str) || "";
  var subString = str.slice(0, str.length - endingBlock.length);

  // scrub string for punctuation and endingblock
  var letterOnlyStr = subString.replace(/[^a-zA-Z]/g, "");

  // check to see if string starts with a vowel
  var firstLetter = letterOnlyStr[0];

  //if first letter is vowel, simple transform and return out
  if(checkVowel(firstLetter)){
    return subString.replace(/([a-zA-Z]+)/ig, replacer)
           + "ay"
           + endingBlock;
  }

  var firstBlock = findFirstBlock(letterOnlyStr);
  var secondBlock = letterOnlyStr[firstBlock.length] || "";
  var subSubString = letterOnlyStr.slice(firstBlock.length + secondBlock.length);

  //Manage capitalization rules
  if(firstLetter.match(/[A-Z]/g)){
    firstBlock = firstBlock.toLowerCase();
    secondBlock = secondBlock.toUpperCase();
  }

  var cleanString = secondBlock
                  + subSubString
                  + firstBlock;

  return subString.replace(/([a-zA-Z]+)/g, replacer)
         + "ay"
         + endingBlock;

  function replacer(match, p1, offset, string){
    var cleanSubString = cleanString ?
                         cleanString.slice(offset, offset + match.length) :
                         letterOnlyStr.slice(offset, offset + match.length);
    return cleanSubString;
  }
};

var findEndingBlock = goodEggs.findEndingBlock = function(word){
  var endingBlock = /([^A-Za-z\s]{1})([A-Za-z]{0,1})/gi
  var resultArray = word.match(endingBlock);
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
