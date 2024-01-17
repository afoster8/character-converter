/* Error Classes for passing informative strings to user */
export class WordNotFoundError extends Error {
  constructor(word) {
    super(`Word "${word}" not found in mapping.`);
    this.name = "WordNotFoundError";
    this.word = word;
  }
}

export class ConversionTableNotFoundError extends Error {
  constructor() {
    super("Conversion table not found, could not convert.");
    this.name = "ConversionTableNotFoundError";
  }
}

/* zhuyin tone should be at the end of the input, so find it at the end and return it, along 
  with the toneless stem */
export function stripZhuyinTone(zhuyin) {
  const validTones = ["ˉ", "ˊ", "ˇ", "ˋ", "˙"];

  if (typeof zhuyin === "string" && zhuyin.length > 0) {
    const tone = zhuyin.slice(-1);

    if (validTones.includes(tone)) {
      const toneIndex = validTones.indexOf(tone) + 1;
      const zhuyinWithoutTone = zhuyin.slice(0, -1);

      return {
        zhuyin: zhuyinWithoutTone,
        tone: toneIndex.toString()
      };

    } else {
      return {
        zhuyin: zhuyin,
        tone: "5"
      };
    }
  } else {
    throw new Error("Something went wrong with the parsing");
  }
}

/* zhuyin tone should be added back to the end of the syllable, so find number at the end 
  of the syllable and convert it to a zhuyin tone */
export function addZhuyinTone(zhuyin) {
  const validTones = ["ˉ", "ˊ", "ˇ", "ˋ", "˙"];
  const returnZhuyin = zhuyin.split("");
  console.log(zhuyin);

  if (typeof zhuyin === "string" && zhuyin.length > 0) {
    const tone = zhuyin.slice(-1);

    if (tone < 1 || tone > 5) {
      throw new Error(`${tone} is not a Mandarin tone.`);
    }

    const matchingChar = validTones[parseInt(tone) - 1]
    return returnZhuyin.join("").slice(0, -1) + matchingChar;

  } else {
    throw new Error("Something went wrong with the parsing.");
  }
}

/* It'll be much easier to match the IPA without the tone markings, so strip
  them before searching */
export function stripPinyinTone(pinyin) {
  const validTones = "āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ".split("")
  const replacement = ["a", "e", "i", "o", "u", "ü"]

  if (typeof pinyin === "string" && pinyin.length > 0) {
    var tone = ""
    var strippedPinyin = pinyin.split("");

    /* Iterate over the string and find the vowel with the tone marking
      If you find it, find its tone type by modding it
      Then find the un-marked equivalent in the plain vowel array
      by dividing by 4 */
    for (let i = 0; i < strippedPinyin.length && tone === ""; i++) {
      const currentChar = strippedPinyin[i];

      if (validTones.includes(currentChar)) {
        console.log(strippedPinyin);
        const matchingChar = validTones.indexOf(currentChar);
        const toneIndex = (matchingChar % 4) + 1;
        const replacementChar = replacement[Math.floor(matchingChar / 4)]
        strippedPinyin[i] = replacementChar;
        tone = String(toneIndex);

      } 
    }

    return {
      pinyin: strippedPinyin.join(""),
      tone: tone ? tone : String(5) // if we found a tone marking, keep it. otherwise, make it 5
    }

  } else {
    throw new Error("Something went wrong in the parsing.")
  }
}

/* We have to add the tone back to the pinyin using the number marking 
  Luckily there's only a few vowels in pinyin, so we can use that to index 
  through all of the tone options. */
export function addPinyinTone(pinyin) {
  const validTones = "āáǎàaēéěèeīíǐìiōóǒòoūúǔùuǖǘǚǜü".split("")
  const replacement = ["a", "e", "i", "o", "u", "ü"]

  if (typeof pinyin === "string" && pinyin.length > 0) {
    const tone = pinyin.slice(-1);

    if (tone < 1 || tone > 5) {
      throw new Error(`${tone} is not a Mandarin tone.`);
    } else if (isNaN(tone)) {
      return pinyin.slice(0, -1);
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
          const replacementChar = validTones[(matchingChar * 5 + parseInt(tone)) - 1]
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
      const replacementChar = validTones[(typeOfMedial * 5 + parseInt(tone)) - 1];
      returnPinyin[locationOfMedial] = replacementChar;
    }

    return returnPinyin.join("").slice(0, -1);

  } else {
    throw new Error("Something went wrong in the parsing.")
  }
}