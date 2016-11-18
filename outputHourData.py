#!/usr/bin/python
import sys
import time
import json
import os
import string

def jsonRead(path,topath,name):
    pathfile = path + '/' + name
    topathfile = topath + '/' + name
    if os.path.exists(pathfile):
        file =open(pathfile,"r")
        data = json.loads(file.read().decode('utf-8'))
        i = 1
        jsonWrite(data[0],topathfile)
        for v in data:
            i = i + 1
            if(i%60==0):
                jsonWrite(v,topathfile)
        file.close()
    else:
        print 'unable to open ' + pathfile + 'file'
def jsonWrite(data,pathfile):
    if os.path.exists(pathfile):
      file =open(pathfile,"rb+")
      file.seek(-1,os.SEEK_END)
      file.truncate()
      file.write(",")
      json.dump(data,file)
      file.write("]")
      file.close()
      print 'succes: '+ pathfile
    else:
      file =open(pathfile,"w")
      file.write("[")
      json.dump(data,file)
      file.write("]")
      file.close()

dir = 'web/data/min'
dist = 'web/data/hour'
files = os.listdir(dir)

for root, dirs, files in os.walk(dir):
    for name in files:
        jsonRead(dir,dist,name)
