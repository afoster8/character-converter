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

function stripZhuyinTone(zhuyin) {
  const validTones = ["ˉ", "ˊ", "ˇ", "ˋ", "˙"];

  if (typeof zhuyin === "string" && zhuyin.length > 0) {
    const tone = zhuyin.slice(-1);

    if (validTones.includes(tone)) {
      const toneIndex = validTones.indexOf(tone) + 1;
      const zhuyinWithoutTone = zhuyin.slice(0,-1);

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

function addZhuyinTone(zhuyin) {
  const validTones = ["ˉ", "ˊ", "ˇ", "ˋ", "˙"];
  const returnZhuyin = zhuyin.split("");

  if (typeof zhuyin === "string" && zhuyin.length > 0) {
    const tone = zhuyin.slice(-1);

    if (tone < 1 || tone > 5) {
      throw new Error(`${tone} is not a Mandarin tone.`);
    }

    const matchingChar = validTones[parseInt(tone) - 1]
    return returnZhuyin.join("").slice(0,-1) + matchingChar;

  } else {
    throw new Error("Something went wrong with the parsing.");
  }
}

export function convertToIpa(conversionObject) {
  if (!conversionObject) {
    throw new ConversionTableNotFoundError();
  }

  try {
    const input = document.getElementById("input-zhuyin").value;
    const inputWords = input.trim().split(/\s+/);

    if (inputWords) {
      const matchingWords = [];

      inputWords.forEach((word) => {
        const { zhuyin, tone } = stripZhuyinTone(word);
        const match = conversionObject.find(entry => entry.zhuyin === zhuyin)

        if (match) {
          matchingWords.push(match.ipa + tone);

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


export function convertToZhuyin(conversionObject) {
  if (!conversionObject) {
    throw new ConversionTableNotFoundError();
  }

  try {
    const input = document.getElementById("input-ipa").value;
    const inputWords = input.trim().split(/\s+/);

    if (inputWords) {
      const matchingWords = [];

      inputWords.forEach((word) => {
        const tone = word.slice(-1);        
        const tonelessIpa = word.replace(/\d/g, "");
        const match = conversionObject.find(entry => diacritics.remove(entry.ipa) === diacritics.remove(tonelessIpa))

        if (match) {
          matchingWords.push(addZhuyinTone(match.zhuyin + tone));
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
