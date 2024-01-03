module.exports = function generateMatches(conversionObject) {

  if (!conversionObject) {
    console.log("CSV data not loaded yet.");
    return;
  }

  const inputKanji = document.getElementById("input-kanji").value;

  try {
    const result = conversionObject.data;
    const matchingRow = result.find(row => row[0] === inputKanji);

    if (matchingRow) {
      const simplified = matchingRow[1] ? matchingRow[1] : "n/a";
      const traditional = matchingRow[2] ? matchingRow[2] : "n/a";
      return { inputKanji, simplified, traditional };
    }

  } catch (error) {
    console.log(error);
  }
};

