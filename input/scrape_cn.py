import json 

# unihan data, downloaded directly 
with open("./sources/unihan.json", "r", encoding="utf-8") as file:
  data = json.load(file)

# read the lists we made from the mappings so we only use characters from that list
with open("./character-lists/simplified_list.txt", "r", encoding="utf-8") as file:
    simp_list = [line.strip() for line in file]

with open("./character-lists/traditional_list.txt", "r", encoding="utf-8") as file:
    trad_list = [line.strip() for line in file]

# only unique characters
merged_list = list(set(simp_list + trad_list))

# we only want some of the given fields
keys_to_keep = {
    "char": "character",
    "kTotalStrokes": "strokes",
    "kDefinition": "meanings",
    "kMandarin": "readings_man",
    "kCantonese": "readings_can",
    "kSimplifiedVariant": "simplified_variant",
    "kTraditionalVariant": "traditional_variant"
}

# direct viewing of characters for testing purposes
def convert_unicode_string_to_char(unicode_array):
  for item in unicode_array:
    code_point = int(item[2:], 16)  
    character = chr(code_point)
    return character

# filter data to only show the fields we want, and only if it's in our merged list
filtered_data = [
    {keys_to_keep[key]: convert_unicode_string_to_char(item[key]) if key.endswith("Variant") 
                    else item[key] for key in keys_to_keep if key in item}
    for item in data
    if item["char"] in merged_list
]

with open("../src/conversion/chinese.json", "w", encoding="utf-8") as output_file:
    json.dump(filtered_data, output_file, indent=2, ensure_ascii=False)
  