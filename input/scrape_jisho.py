from jisho_api.kanji import Kanji 
import json
import time

# make a character class for easy testing/printing
class Character:
    def __init__(self, kanji, strokes, 
                 meanings, readings_on, readings_kun):
        self.kanji = kanji
        self.strokes = strokes
        self.meanings = meanings
        self.readings_on = readings_on
        self.readings_kun = readings_kun

    def display(self):
        print(self.kanji)
        print("Strokes: " + self.strokes)
        print("Meanings: " + str(self.meanings))
        print("On Readings: " + str(self.readings_on))
        print("Kun Readings: " + str(self.readings_kun))

    def to_json(self):
        obj = {
            "character": self.kanji,
            "strokes": self.strokes,
            "meanings": self.meanings,
            "reading_on": self.readings_on,
            "reading_kun": self.readings_kun,
        }

        return json.dumps(obj, ensure_ascii=False)

# meat of the API request 
def request_kanji_info(character):
    try:
        kanji_r = Kanji.request(character).data # courtesy of jisho_api
        return Character(kanji_r.kanji, str(kanji_r.strokes), kanji_r.main_meanings, 
                         kanji_r.main_readings.on, kanji_r.main_readings.kun)
    except Exception as e:
        print(f'Error fetching information for character "{character}": {str(e)}')
        return None

# the list we will be feeding in
with open("./character-list/kanji_list.txt", "r", encoding="utf-8") as file:
    character_list = [line.strip() for line in file]

result_json = []

# Only uncomment if you're very sure!
print("Uncomment code if you're very sure about pinging sweet little Jisho 6000 times.")

# for i, character in enumerate(character_list, start=1):
#     kanji_info = request_kanji_info(character)
    
#     if kanji_info:
#         result_json.append(json.loads(kanji_info.to_json()))

#     if i % 10 == 0:
#         print(f"Processed {i} characters out of {len(character_list)}.")

#     # Introduce a small delay to avoid API rate limits
#     time.sleep(0.5)
        
# with open("../src/conversion/kanji_info.json", "w", encoding="utf-8") as output_file:
#     json.dump(result_json, output_file, ensure_ascii=False, indent=2)