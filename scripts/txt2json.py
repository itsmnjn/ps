import os
import json
import re
from datetime import datetime


# Function to convert filename timestamp to ISO datetime string
def filename_to_iso(filename):
    match = re.search(r"(\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2})", filename)
    one = match.group(1)
    dt = datetime.strptime(one, "%Y-%m-%d_%H-%M-%S")
    return dt.isoformat()


# Directory containing the .txt files
directory = "/Users/itsmnjn/Developer/Projects/ps/txt"

# Create an empty list to store the note objects
notes = []

# Iterate through all the .txt files in the directory
for filename in os.listdir(directory):
    if filename.endswith(".txt") and filename.startswith("cleaned_"):
        # Read the content of the .txt file
        with open(os.path.join(directory, filename), "r", encoding="utf-8") as file:
            content = file.read()

        # Create a note object
        note = {"timestamp": filename_to_iso(filename), "content": content}

        # Append the note object to the list of notes
        notes.append(note)

# Output the list of notes as a JSON file
with open("notes.json", "w", encoding="utf-8") as output_file:
    json.dump(notes, output_file, ensure_ascii=False, indent=4)
