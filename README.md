#介绍
这是一个树莓派实时监测的项目，可在web上显示实时的温度及湿度变化情况。

#依赖
* Adafruit_DHT
* Adafruit_CharLCD
* Nginx/Apache (请自行提前安装)

###安装依赖
```bash
sudo apt-get update
sudo apt-get install build-essential python-dev python-smbus python-pip
git clone https://github.com/adafruit/Adafruit_Python_DHT.git
cd Adafruit_Python_DHT
sudo python setup.py install
sudo pip install RPi.GPIO
git clone https://github.com/adafruit/Adafruit_Python_CharLCD
cd Adafruit_Python_CharLCD
sudo python setup.py install
```
#安装
```bash
cd /var/www/html
git clone  https://github.com/yfgeek/rpi-TempRuntime.git
```
#运行
```bash
cd /var/www/html/rpi-TempRuntime
python LCD.py
```
#截图
![](http://blog.yfgeek.com/content/images/2016/08/WechatIMG10.jpeg)
