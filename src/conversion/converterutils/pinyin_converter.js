import diacritics from "diacritics";
import { ConversionTableNotFoundError, WordNotFoundError, stripPinyinTone, addPinyinTone } from "./utils";

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
        const { pinyin, tone } = stripPinyinTone(word); //strip tone marking before searching
        var match = conversionObject.find(entry => entry.pinyin === pinyin)

        if (match) {
          matchingWords.push(match.ipa + tone); // add tone to end of string
        } else {
          throw new WordNotFoundError(word)
        }
      });

      return matchingWords.join(" ");

    } else {
      throw new Error("No input found");
    }

  } catch (error) {
    console.log(error);
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
        const tone = word.slice(-1); // save tone for later

        /* remove diacritics and tone for easier searching */
        const tonelessIpa = word.replace(/\d/g, "");
        const match = conversionObject.find(entry => diacritics.remove(entry.ipa) === diacritics.remove(tonelessIpa))

        if (match) {
          matchingWords.push(addPinyinTone(match.pinyin + tone)); // add tone back to match
        } else {
          throw new WordNotFoundError(word)
        }
      });

      return matchingWords.join(" ");

    } else {
      throw new Error("No input found");
    }

  } catch (error) {
    console.log(error);
    throw error;
  }
};
