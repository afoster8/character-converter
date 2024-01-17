import { ConversionTableNotFoundError } from "./utils";

/* our logic works on hiragana, so it's best to neutralize katakana to hiragana */
function katakanaToHiragana(katakanaString) {
  return katakanaString.replace(/[\u30a1-\u30f6]/g, function (match) {
    const charCode = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(charCode);
  });
}

/* N is a final nasal that is held for a full mora and changes depending on environment. 
  Before fricatives, vowels, and semivowels, it changes into a nasalized vowel, etc etc, 
  according to the following mapping. */
function replaceN(input) {

  const replacementMap = {
    'p': 'm:',
    'b': 'm:',
    't': 'n:',
    'd': 'n:',
    'ɾ': 'n:',
    'k': 'ŋ:',
    'g': 'ŋ:',
    's': 'ɰ̃ː',
    'z': 'ɰ̃ː',
    'ɕ': 'ɰ̃ː',
    'ʑ': 'ɰ̃ː',
    'ç': 'ɰ̃ː',
    'ɸ': 'ɰ̃ː',
    'h': 'ɰ̃ː',
    'j': 'ɰ̃ː',
    'w': 'ɰ̃ː',
    'a': 'ɰ̃ː',
    'i': 'ɰ̃ː',
    'ɨ': 'ɰ̃ː',
    'ɯ': 'ɰ̃ː',
    'e': 'ɰ̃ː',
    'o': 'ɰ̃ː',
    'm': 'm::',
    'n': 'n::',
    'ɲ': 'ɲ::',
  };

  var inputArray = input.split("");

  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i] === 'N' && i + 1 < inputArray.length) {
      const nextChar = inputArray[i + 1];

      const replacement = replacementMap[nextChar];

      if (replacement) {
        inputArray[i] = replacement; // replace according to mapping
      } else {
        inputArray[i] = "ɴ:"; // otherwise, generic moraic nasal
      }

      /* if the following char is an m, n, or ɲ, we already replaced it, so we splice it away */
      if (nextChar === 'm' || nextChar === 'n' || nextChar === 'ɲ') {
        inputArray.splice(i + 1, 1);
      }
    }
  }

  return inputArray.join('');
}

/* Q is the gemination marker that tells us to hold the following consonant for a mora. 
  In IPA, this is marked with a : after the consonant. */
function replaceQ(input) {
  var inputArray = input.split('');

  for (let i = 0; i < inputArray.length; i++) {
    var currentChar = inputArray[i];

    if (currentChar === "Q" && i + 2 < inputArray.length) {
      inputArray.splice(i + 2, 0, ":"); // find following consonant
      inputArray.splice(i, 1); // get rid of Q
    }
  }

  return inputArray.join("");
}

export function convertToIpa(conversionObject) {

  if (!conversionObject) {
    throw new ConversionTableNotFoundError();
  }

  try {
    // Remove punctuation from the input string
    const punctuationRegex = /[　、。，．！？；：（）［］｛｝＜＞＝・「」『』【】〈〉《》〔〕＼／｜＿～＾＠＃＄％＆＊＾＾￥＊＋＝\-｀‘’“”／？！＠＆＃＊％＋＝゜]/g;
    const strippedInput = (document.getElementById("kana-input").value).replace(punctuationRegex, '');

    /* convert to hiragana if there's katakana in our input */
    const input = katakanaToHiragana(strippedInput);

    var result = "";
    var currentMatch = "";

    for (var i = 0; i < input.length; i++) {
      const check = currentMatch + input[i]; // make linter be quiet
      currentMatch += input[i];

      var match = conversionObject.find(entry => entry.hiragana === check);

      /* if we fail to match, then the character string we created is not a single syllable of Japanese 
        this means we went just one character too far, so we need to go back one character to have a 
        guaranteed-to-match syllable of Japanese */
      if (!match) {

        /* necessary for if the input was partially katakana and contains the elongation character */
        if (input[i] === "ー") {
          match = conversionObject.find(entry => entry.hiragana === check.slice(0, -1));

          if (match) {
            result += match.ipa + ":";
            currentMatch = "";
          }

          /* if the last character made our current syllable not match */
        } else if (currentMatch.length > 1) {
          match = conversionObject.find(entry => entry.hiragana === check.slice(0, -1));

          if (match) {
            result += match.ipa;
            currentMatch = "";
            i -= 1; // go back one character so we don't miss the one we spliced out
          }

        } else {
          throw new Error(`Parsing error on character ${currentMatch}.`);
        }
      }
    }

    /* Handle last character */
    if (currentMatch) {
      match = conversionObject.find(entry => entry.hiragana === currentMatch);

      if (match) {
        result += match.ipa;
      }
    }

    /* Handle N and Q -- they have their own rules */
    return replaceQ(replaceN(result));

  } catch (error) {
    console.log(error);
    throw error;
  }
};