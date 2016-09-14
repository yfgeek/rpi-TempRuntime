#!/usr/bin/python
import sys
import Adafruit_DHT
import time
import json,os

def jsonWrite(data,tdate):
    pathfile = "web/data/" + tdate +".json"
    if os.path.exists(pathfile):
      file =open(pathfile,"rb+")
      file.seek(-1,os.SEEK_END)
      file.truncate()
      file.write(",")
      json.dump(data,file)
      file.write("]") 
      file.close()
    else:
      file =open(pathfile,"w")
      file.write("[")
      json.dump(data,file)
      file.write("]") 
      file.close()

while True:
    sensor = Adafruit_DHT.DHT11
    humidity, temperature = Adafruit_DHT.read_retry(sensor, 26)
    if humidity is not None and temperature is not None:
        todaytime = time.strftime('%Y-%m-%d',time.localtime(time.time()))
        msg =  time.strftime('%Y-%m-%d %H:%M',time.localtime(time.time())) + '\n' + str(temperature) + ' C  ' + str(humidity) + '%'
        i = {"time":time.strftime('%H:%M',time.localtime(time.time())),"tmp":temperature,"hmt":humidity}
        jsonWrite(i,todaytime)
        print(msg)
    time.sleep(60)
