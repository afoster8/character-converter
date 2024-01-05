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

export function convertToIpa(conversionObject) {
  if (!conversionObject) {
    throw new ConversionTableNotFoundError();
  }

  try {
    const input = document.getElementById("kana-input").value;
    const inputWords = input.trim().split(/\s+/);

    if (inputWords) {
      const matchingWords = [];

      inputWords.forEach((word) => {
        const match = conversionObject.get(word)
        console.log(match);

        if (match) {
          matchingWords.push(match);
        } else {
          throw new WordNotFoundError(word)
        }
      });

      console.log(matchingWords);
      return matchingWords.join(" ");

    } else {
      throw new Error("No input found");
    }

  } catch (error) {
    throw error;
  }
};


export function convertToKana(conversionObject) {

  if (!conversionObject) {
    throw new ConversionTableNotFoundError();
  }

  try {
    const input = document.getElementById("ipa-input").value;
    const inputWords = input.trim().split(/\s+/);

    if (inputWords) {
      const matchingWords = [];

      inputWords.forEach((word) => {
        const match = conversionObject.get(word)

        if (match) {
          matchingWords.push(match);
        } else {
          throw new WordNotFoundError(word)
        }
      });

      console.log(matchingWords);
      return matchingWords.join(" ");

    } else {
      throw new Error("No input found");
    }

  } catch (error) {
    console.log(error);
    throw error;
  }
};
