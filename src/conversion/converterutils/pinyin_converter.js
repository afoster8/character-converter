import diacritics from "diacritics";

/* Error Classes for passing informative strings to user */
class WordNotFoundError extends Error {
  constructor(word) {
    super(`Word "${word}" not found in mapping.`);
    this.name = "WordNotFoundError";
    this.word = word;
  }
}

class ConversionTableNotFoundError extends Error {
  constructor() {
    super("Conversion table not found, could not convert.");
    this.name = "ConversionTableNotFoundError";
  }
}

/* It'll be much easier to match the IPA without the tone markings, so strip
  them before searching */
function stripPinyinTone(pinyin) {
  const validTones = "āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ".split("")
  const replacement = ["a", "e", "i", "o", "u", "ü"]

  if (typeof pinyin === "string" && pinyin.length > 0) {
    var tones = ""
    var strippedPinyin = pinyin.split("");

    /* Iterate over the string and find the vowel with the tone marking
      If you find it, find its tone type by modding it
      Then find the un-marked equivalent in the plain vowel array
      by dividing by 4 */
    for (let i = 0; i < strippedPinyin.length; i++) {
      const currentChar = strippedPinyin[i];

      if (validTones.includes(currentChar)) {
        const matchingChar = validTones.indexOf(currentChar);
        const toneIndex = (matchingChar % 4) + 1;
        const replacementChar = replacement[Math.floor(matchingChar / 4)]
        strippedPinyin[i] = replacementChar;
        tones = tones + String(toneIndex);

        /* otherwise there's no tone marking, so it's fifth tone */
      } else if (replacement.includes(currentChar)) {
        tones = tones + String(5);
      }
    }
  
    return {
      pinyin: strippedPinyin.join(""),
      tones: tones
    }

  } else {
    throw new Error("Something went wrong in the parsing.")
  }
}

/* We have to add the tone back to the pinyin using the number marking 
  Luckily there's only a few vowels in pinyin, so we can use that to index 
  through all of the tone options. */
function addPinyinTone(pinyin) {
  const validTones = "āáǎàaēéěèeīíǐìiōóǒòoūúǔùuǖǘǚǜü".split("")
  const replacement = ["a", "e", "i", "o", "u", "ü"]

  if (typeof pinyin === "string" && pinyin.length > 0) {
    const tone = pinyin.slice(-1);

    if (tone < 1 || tone > 5) {
      throw new Error(`${tone} is not a Mandarin tone.`);
    } else if (isNaN(tone)) {
      return pinyin.slice(0,-1);
    }

    var returnPinyin = pinyin.split("");

    /* for tracking where the medials are -- tone marks can only go on medial vowels 
      if there's no better alternative */
    var keepLooking = true;
    var typeOfMedial;
    var locationOfMedial;

    /* iterate over the string and try to find the best place to put the tone 
      it has to be on a vowel, so check against the list of vowels above*/
    for (let i = 0; i < returnPinyin.length; i++) {
      const currentChar = returnPinyin[i];

      if (replacement.includes(currentChar) && keepLooking) {

        /* pick the first vowel and move on if it's not a medial */
        if (!(["i", "u", "ü"].includes(currentChar))) {
          const matchingChar = replacement.indexOf(currentChar);
          const replacementChar = validTones[(matchingChar*5 + parseInt(tone)) - 1]
          returnPinyin[i] = replacementChar;
          keepLooking = false;

        } else {
          /* otherwise mark the location and type of medial for later checking */
          typeOfMedial = replacement.indexOf(currentChar);
          locationOfMedial = i;
        }
      }
    }

    /* if we never found a better location for the tone marking, add the tone to the medial */
    if (keepLooking) {
      const replacementChar = validTones[(typeOfMedial*5 + parseInt(tone)) - 1];
      returnPinyin[locationOfMedial] = replacementChar;
    }
  
    return returnPinyin.join("").slice(0, -1);

  } else {
    throw new Error("Something went wrong in the parsing.")
  }
}


export function convertToIpa(conversionObject) {
  if (!conversionObject) {
    throw new ConversionTableNotFoundError();
  }

  try {
    const input = document.getElementById("pinyin-input").value;
    const inputWords = input.trim().split(/\s+/);

    if (inputWords) {
      const matchingWords = [];

      inputWords.forEach((word) => {
        const { pinyin, tones } = stripPinyinTone(word); //strip tone marking before searching
        var match = conversionObject.find(entry => entry.pinyin === pinyin)

        if (match) {
          matchingWords.push(match.ipa + tones); // add tone to end of string
        } else {
          throw new WordNotFoundError(word)
        }
      });

      return matchingWords.join(" ");

    } else {
      throw new Error("No input found.");
    }

  } catch (error) {
    throw error;
  }
};


export function convertToPinyin(conversionObject) {

  if (!conversionObject) {
    throw new ConversionTableNotFoundError();
  }

  try {
    const input = document.getElementById("ipa-input").value;
    const inputWords = input.trim().split(/\s+/);

    if (inputWords) {
      const matchingWords = [];

      inputWords.forEach((word) => {
        const tone = word.slice(-1);        
        const tonelessIpa = word.replace(/\d/g, "");
        const match = conversionObject.find(entry => diacritics.remove(entry.ipa) === diacritics.remove(tonelessIpa))

        if (match) {
          matchingWords.push(addPinyinTone(match.pinyin + tone));
        } else {
          throw new WordNotFoundError(word)
        }
      });

      return matchingWords.join(" ");

    } else {
      throw new Error("No input found");
    }

  } catch (error) {
    throw error;
  }
};
