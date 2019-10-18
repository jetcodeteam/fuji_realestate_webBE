import os
import json

def create_ward_list_json(dir_path):
    result = []
    for file_name in os.listdir(dir_path):
        ward_dict = {}
        ward_ls = []
        if file_name.endswith('.json') and not file_name.startswith('ward_lists.json'):
            with open(file_name, 'r') as f:
                content = json.load(f)
            for key, value in content.items():
                ward_ls.append(value)
            ward_ls.sort(key=lambda x: x['name'])
            ward_dict['_id'] =  int(file_name.strip('.json'))
            ward_dict['wardList'] = ward_ls
            result.append(ward_dict)
    with open('ward_lists.json', 'w+', encoding="utf8") as f:
        json.dump(result, f, ensure_ascii=False)

create_ward_list_json('.')