# RUN THIS PYTHON CODE AS A DAEMON:
# while true; do python daemon.py; done

import os
import json
import time

print(f"[{time.time()}] Daemon up and running")
while True:
    with open("map.json", "r+") as f:
        data = json.load(f)
    if data != os.listdir("Media"):
        print("Updating file map...")
        with open("map.json", "w+") as f:
            json.dump(os.listdir("Media"), f)
    time.sleep(10)