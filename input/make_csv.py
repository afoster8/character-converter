import pandas as pd

def parse_file():
  columns = ['Japanese', 'P.R.China', 'Taiwan']
  
  df = pd.read_csv("./kanji_mapping_table.txt", sep="\t", header=None, names=columns, encoding = "utf-8")
  df.replace("*", pd.NA, inplace=True)
  
  return df

parsed_data = parse_file()

parsed_data.to_csv("./conversion_table.csv", index=False, header=True)
parsed_data.to_json("../src/conversion_table.json", orient="split", force_ascii=False, index=False)
