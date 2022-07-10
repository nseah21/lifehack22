import json
import csv
import re

filename = 'cleaner.csv'
with open(filename, 'r') as f:
    table = { 'reports': dict()}
    datareader = csv.reader(f)
    
    for row in datareader:
        n = len(row)
        if n > 0:
            contact = row[0]
        else:
            contact = ""
        if n > 1:
            story = row[1]
        else:
            story = ""

        if contact in table['reports']:
            table['reports'][contact]['count'] += 1
            table['reports'][contact]['info'].append(story)
          
        else:
            table['reports'][contact] = { 'count': 1, 'info': [story], 'tags': [] }

    result = json.dumps(table)
    with open('results.json', 'w') as new:
        new.write(result)