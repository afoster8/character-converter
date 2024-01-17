import csv
import json

input_file_path = "./japanese_ipa.txt"
output_json_path = "../../src/conversion/japanese_ipa_conversion.json"

data = []
with open(input_file_path, "r", encoding="utf-8") as file:
    reader = csv.reader(file, delimiter=",")
    next(reader)
    for row in reader:
        data.append({
            "hiragana": row[0],
            "katakana": row[1],
            "hepburn": row[2],
            "kunrei": row[3],
            "ipa": row[4]
        })

with open(output_json_path, "w", encoding="utf-8") as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=2)
    
    
input_file_path = "./chinese_ipa.txt"
output_json_path = "../../src/conversion/chinese_ipa_conversion.json"

data = []

with open(input_file_path, "r", encoding="utf-8") as file:
    reader = csv.reader(file, delimiter=",")
    next(reader)
    for row in reader:
        data.append({
            "pinyin": row[0],
            "zhuyin": row[2],
            "ipa": row[1]
        })

with open(output_json_path, "w", encoding="utf-8") as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=2)

