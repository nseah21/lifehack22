import csv
import re

sgRegex = r'(\+?65)?( *)((6|8|9)\d{7})'

filename = 'results.csv'
newfile = 'clean.csv'
with open(filename, 'r') as f:
    # create the csv writer
    with open(newfile, 'a') as new:
        writer = csv.writer(new)
        datareader = csv.reader(f)
        
        for row in datareader:
            name = row[0]
            contact = row[1]
            story = row[2]

            result = re.search(sgRegex, contact)
            if not bool(result):
              writer.writerow([name, contact, story])
            else:
              contact = '+65' + result.group(3)
              writer.writerow([name, contact, story])



