import scrapy
import requests
import json
import csv
import re

name_regex = r"(Name: ){1}(.*)"
contact_regex = r"(Contact: ){1}(.*)" 
class StoriesSpider(scrapy.Spider):
    name = 'stories'
    allowed_domains = ['scamalert.sg']

    def start_requests(self):
        current_page = 1
        urls = post_request(current_page)

        while urls is not None:
            for url in urls:
                yield scrapy.Request(url=url, callback=self.parse)
            current_page += 1
            urls = post_request(current_page)

    def parse(self, response):
        page = response.url.split("/")[-1]
        filename = 'results.csv'
        with open(filename, 'a') as f:
            # create the csv writer
            writer = csv.writer(f)

            name = response.selector.xpath("/html/body/main/div[2]/div/div[2]/div/div/p/text()").get()
            contact = response.selector.xpath("/html/body/main/div[2]/div/div[2]/div/div/p/text()[2]").get()
            story = response.selector.xpath("/html/body/main/div[2]/div/div[1]/div[1]/text()").get()

            name_result = re.search(name_regex, name).groups(2)[1].strip()
            contact_result = re.search(contact_regex, contact).groups(2)[1].strip()
            story_result = story.strip()
            # write a row to the csv file
            row = [name_result, contact_result, story_result]
            writer.writerow(row)

        self.log(f'Saved file {filename}')


def post_request(page):     
    url = "https://www.scamalert.sg/stories/GetStoryListAjax/"
    payload = { 'page': page,'sortBy': 'Latest'}

    try:           
        r = requests.post(url, data=payload)             
        if r.status_code == 200:                 
            resultString = r.json()['result']
            result = json.loads(resultString)
            urls = list(map(mapper, result['StoryList']))
            return urls
        else:
            print(r.status_code)
    except Exception as e:             
        print(e)

def mapper(story):
    return 'https://scamalert.sg' + story['Url']
