import json
import re
import random

output = []

with open('productList.json') as json_data:
    d = json.load(json_data)
#print(d["products"][0]["id"]);
for x in d["products"]:
	data = {
		"id": str(x["id"]),
		"title": str(x["title"].encode('utf-8')),
		"price": float(x["variants"][0]["price"].encode('utf-8')),
		"inventory_count": random.randint(0, 10)}
	output.append(data)
json = json.dumps(output)
print( json)

