import pandas as pd
import json 

def parse_file():
  columns = ["Japanese", "Traditional", "Simplified"]
  
  df = pd.read_csv("./sources/kanji_mapping_table.txt", sep="\t", \
                                header=None, names=columns, encoding = "utf-8")
  df.replace("*", pd.NA, inplace=True)
  
  df[["Traditional", "Simplified"]] = df[["Traditional", "Simplified"]].applymap\
                                      (lambda x: x.replace(",", ", ") if isinstance(x, str) else x)
  
  return df

def simplified_to_japanese(char, df):
    if isinstance(char, str):
        result = df.loc[df["Simplified"].str.contains(char, na=False), "Japanese"].values.tolist()
        return ", ".join(result)
    else:
        return ""

def traditional_to_japanese(char, df):
      if isinstance(char, str):
        result = df.loc[df["Traditional"].str.contains(char, na=False), "Japanese"].values.tolist()
        return ", ".join(result)
      else:
        return ""

def traditional_to_simplified(char, data):
  for entry in data:
    if char == entry["character"]:
      variants = entry.get("simplified_variant", [])
      return ", ".join(variants) if variants != [] else char
      
def simplified_to_traditional(char, data):
  for entry in data:
    if char == entry["character"]:
      variants = entry.get("traditional_variant", [])
      return ", ".join(variants)

def preprocess_column(column):
    split_values = column.str.split(",").explode()
    split_values = split_values.str.strip()
    unique_values = split_values.unique()
    unique_values = [value for value in unique_values if isinstance(value, str)]
    return pd.Series(unique_values)


# parse and save original file
parsed_data = parse_file()
parsed_data.to_json("../src/conversion/kanji_conversion.json", 
                    orient="split", force_ascii=False, index=False, indent=2)

# save kanji list off
parsed_data["Japanese"].to_csv("./character-lists/kanji_list.txt", index=False, header=False)

# process simplified and traditional lists
unique_simplified_values = preprocess_column(parsed_data["Simplified"]).tolist()
unique_traditional_values = preprocess_column(parsed_data["Traditional"]).tolist()
merged_list = list(set(unique_simplified_values + unique_traditional_values))

simplified_list = [char for char in merged_list if char not in unique_traditional_values]
traditional_list = [char for char in merged_list if char in unique_traditional_values]

with open("./character-lists/simplified_list.txt", 'w', encoding='utf-8') as file:
    for item in simplified_list:
        file.write("%s\n" % item)
        
with open("./character-lists/traditional_list.txt", 'w', encoding='utf-8') as file:
    for item in traditional_list:
        file.write("%s\n" % item)
        
        
        
# open the chinese json to map between simplified and traditional
with open("../src/conversion/hanzi_information.json", "r", encoding="utf-8") as file:
    data = json.load(file)
        
# create simplified-to-x mappings
simplified_conversion = {"columns": ["Simplified", "Japanese", "Traditional"], "data": []}
for item in simplified_list:
    matching_jpn = simplified_to_japanese(item, parsed_data)
    matching_trad = simplified_to_traditional(item, data)
    simplified_conversion["data"].append([item, matching_jpn, matching_trad])

with open("../src/conversion/simplified_conversion.json", "w", encoding="utf-8") as output_file:
  json.dump(simplified_conversion, output_file, ensure_ascii=False, indent=2)
  

# create traditional-to-x mappings
traditional_conversion = {"columns": ["Traditional", "Japanese", "Simplified"], "data": []}
for item in traditional_list:
    matching_jpn = traditional_to_japanese(item, parsed_data)
    matching_simp = traditional_to_simplified(item, data)
    traditional_conversion["data"].append([item, matching_jpn, matching_simp])

with open("../src/conversion/traditional_conversion.json", "w", encoding="utf-8") as output_file:
  json.dump(traditional_conversion, output_file, ensure_ascii=False, indent=2)