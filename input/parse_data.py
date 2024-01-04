import pandas as pd
import json 

def parse_file():
  columns = ["Japanese", "Traditional", "Simplified"]
  
  df = pd.read_csv("./sources/kanji_mapping_table.txt", sep="\t", header=None, names=columns, encoding = "utf-8")
  df.replace("*", pd.NA, inplace=True)
  
  return df

def simplified_search(search, df):
    if isinstance(search, str):
        return df.loc[df["Simplified"].str.contains(search, na=False), "Japanese"].values.tolist()
    else:
        return []

def traditional_search(search, df):
      if isinstance(search, str):
        return df.loc[df["Traditional"].str.contains(search, na=False), "Japanese"].values.tolist()
      else:
        return []

def traditional_to_simplified(traditional_character, data):
  for entry in data:
    if traditional_character == entry["character"]:
      variants = entry.get("simplified_variant", [])
      return ", ".join(variants)
  return ""
      
def simplified_to_traditional(simplified_character, data):
  for entry in data:
    if simplified_character == entry["character"]:
      variants = entry.get("traditional_variant", [])
      return ", ".join(variants)
  return ""

def preprocess_column(column):
    split_values = column.str.split(",").explode()
    split_values = split_values.str.strip()
    unique_values = split_values.unique()
    unique_values = [value for value in unique_values if isinstance(value, str)]
    return pd.Series(unique_values)


# parse and save original file
parsed_data = parse_file()
parsed_data.to_csv("./sources/conversion_table.csv", index=False, header=True) # for easy viewing 
parsed_data.to_json("../src/conversion_table.json", orient="split", force_ascii=False, index=False)

# save kanji list off
parsed_data["Japanese"].to_csv("./character-lists/kanji_list.txt", index=False, header=False)

# save simplified hanzi list 
unique_simplified_values = preprocess_column(parsed_data["Simplified"])
unique_simplified_values.to_csv("./character-lists/simplified_list.txt", index=False, header=False)

# save traditional character list 
unique_traditional_values = preprocess_column(parsed_data["Traditional"]);
unique_traditional_values.to_csv("./character-lists/traditional_list.txt", index=False, header=False)



# create simplified-to-japanese mapping
simp_to_japn_results = {}
for item in unique_simplified_values:
    matching_items = simplified_search(item, parsed_data)
    simp_to_japn_results[item] = matching_items
    
with open("../src/conversion/simplified_to_japanese.json", "w", encoding="utf-8") as output_file:
  json.dump(simp_to_japn_results, output_file, ensure_ascii=False, indent=2)
  
  

# create traditional-to-japanese mapping
trad_to_japn_results = {}
for item in unique_traditional_values:
    matching_items = traditional_search(item, parsed_data)
    trad_to_japn_results[item] = matching_items
    
with open("../src/conversion/traditional_to_japanese.json", "w", encoding="utf-8") as output_file:
  json.dump(trad_to_japn_results, output_file, ensure_ascii=False, indent=2)

with open("../src/conversion/chinese.json", "r", encoding="utf-8") as file:
    data = json.load(file)
    
# create traditional to simplified mapping
trad_to_simp_results = {}
for item in unique_traditional_values: 
  matching_items = traditional_to_simplified(item, data)
  trad_to_simp_results[item] = matching_items
  
with open("../src/conversion/traditional_to_simplified.json", "w", encoding="utf-8") as output_file:
  json.dump(trad_to_simp_results, output_file, ensure_ascii=False, indent=2)


# create simplified to traditional mapping
simp_to_trad_results = {}
for item in unique_simplified_values: 
  matching_items = simplified_to_traditional(item, data)
  simp_to_trad_results[item] = matching_items  

with open("../src/conversion/simplified_to_traditional.json", "w", encoding="utf-8") as output_file:
  json.dump(simp_to_trad_results, output_file, ensure_ascii=False, indent=2)