#!/usr/bin/python
import sys
import Adafruit_DHT
import Adafruit_CharLCD as LCD
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

# Raspberry Pi pin configuration:
lcd_rs        = 14  # Note this might need to be changed to 21 for older revision Pi's.
lcd_en        = 15
lcd_d4        = 17
lcd_d5        = 18
lcd_d6        = 27
lcd_d7        = 22
lcd_backlight = 4

lcd_columns = 16
lcd_rows    = 2


# Initialize the LCD using the pins above.
lcd = LCD.Adafruit_CharLCD(lcd_rs, lcd_en, lcd_d4, lcd_d5, lcd_d6, lcd_d7,lcd_columns, lcd_rows, lcd_backlight)
while True:
    sensor = Adafruit_DHT.DHT22
    humidity, temperature = Adafruit_DHT.read_retry(sensor, 26)
    if humidity is not None and temperature is not None:
        lcd.clear()
        todaytime = time.strftime('%Y-%m-%d',time.localtime(time.time()))
        msg =  time.strftime('%Y-%m-%d %H:%M',time.localtime(time.time())) + '\n' + str(format(temperature,".1f")) + ' C  ' + str(format(humidity,".1f")) + '%'
        i = {"time":time.strftime('%H:%M',time.localtime(time.time())),"tmp":format(temperature,".1f"),"hmt":format(humidity,".1f")}
        jsonWrite(i,todaytime)
        lcd.message(msg)
        print(msg)
    time.sleep(60)
