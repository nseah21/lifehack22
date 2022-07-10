import requests
import json

URL = "https://www.scamalert.sg/stories/GetStoryListAjax/"
payload = { 'page': 1,'sortBy': 'Latest'}

def main():
  post_request(URL, payload)

def post_request(url, payload):     
    try:           
        r = requests.post(url, data=payload)             
        if r.status_code == 200:                 
            resultString = r.json()['result']
            result = json.loads(resultString)
            print(result)
            return r
        else:
            print(r.status_code)
    except Exception as e:             
        print(e)


if __name__ == '__main__':
  main()