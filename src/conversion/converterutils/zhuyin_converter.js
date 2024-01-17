import diacritics from "diacritics";
import { ConversionTableNotFoundError, WordNotFoundError, stripZhuyinTone, addZhuyinTone } from "./utils";

export function convertToIpa(conversionObject) {
  if (!conversionObject) {
    throw new ConversionTableNotFoundError();
  }

  try {
    const input = document.getElementById("zhuyin-input").value;
    const inputWords = input.trim().split(/\s+/);

    if (inputWords) {
      const matchingWords = [];

      inputWords.forEach((word) => {
        const { zhuyin, tone } = stripZhuyinTone(word); // strip tone before searching 
        const match = conversionObject.find(entry => entry.zhuyin === zhuyin)

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

        /* remove diacritics and tone for easier searching */
        const tonelessIpa = word.replace(/\d/g, "");
        const match = conversionObject.find(entry => diacritics.remove(entry.ipa) === diacritics.remove(tonelessIpa))

        if (match) {
          matchingWords.push(addZhuyinTone(match.zhuyin + tone)); // add tone back
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
