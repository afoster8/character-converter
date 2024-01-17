import { ConversionTableNotFoundError, WordNotFoundError, stripPinyinTone, 
          addPinyinTone, stripZhuyinTone, addZhuyinTone } from "./utils";

export function convertToZhuyin(conversionObject) {
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
          matchingWords.push(addZhuyinTone(match.zhuyin + tone)); // add tone to end of string
        } else {
          throw new WordNotFoundError(word)
        }
      });

      return matchingWords.join(" ");

    } else {
      throw new Error("No input found.");
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
    const input = document.getElementById("zhuyin-input").value;
    const inputWords = input.trim().split(/\s+/);

    if (inputWords) {
      const matchingWords = [];

      inputWords.forEach((word) => {
        const { zhuyin, tone } = stripZhuyinTone(word); //strip tone marking before searching
        var match = conversionObject.find(entry => entry.zhuyin === zhuyin)

        if (match) {
          matchingWords.push(addPinyinTone(match.pinyin + tone)); // add tone to end of string
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
