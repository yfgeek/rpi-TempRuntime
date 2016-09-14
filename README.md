#介绍
这是一个树莓派实时监测的项目，需要参考上文，可在web上显示实时的温度及湿度变化情况。

![](http://blog.yfgeek.com/content/images/github/1version.jpg)

#原料
* 树莓派3B
* DHT11
* LCD1602
* 2K电阻（也可以是电位器）
* 子-母 和 母-母 杜邦线
* 电气绝缘胶带
* 剪刀

#接线
我们一共要完成两个任务：

* 1.连接LCD1602
* 2.连接DHT11

树莓派3B的GPIO图如下：

![](http://blog.yfgeek.com/content/images/2016/08/GPIO.png)
## 2K 电阻如何连接到电路
简单粗暴的方法就是把电阻两头连接到两个子-母杜邦线上，然后用绝缘胶布缠上，非常方便美观。

##LCD1602 接线方案

LCD 与 树莓派相连 方案图，2K电阻是我自行设计，如果有电位器最好放置电位器：
![](http://blog.yfgeek.com/content/images/2016/08/LCD1602--.jpg)

树莓派的USB端口朝下，电源线位置朝上方向摆放。
右端一共有40个引脚，每个引脚的PIN位置如上。
```
VSS，接地，RPi PIN 6

VDD，接5V电源，PRi PIN 2

VO，液晶对比度调节，接1K 电阻，另一端相连接地，PIN 9

RS，寄存器选择，接GPIO 14，RPi PIN 8

RW，读写选择，接地，表示写模式，PRi PIN 6

E，使能信号，接GPIO 15，RPi PIN 10

D0，数据位0，4位工作模式下不用，不接

D1，数据位1，4位工作模式下不用，不接

D2，数据位2，4位工作模式下不用，不接

D3，数据位3，4位工作模式下不用，不接

D4，数据位4，接GPIO 17，RPi PIN 11

D5，数据位5，接GPIO 18，RPi PIN 12

D6，数据位6，接GPIO 27，RPi PIN 13

D7，数据位7，接GPIO 22，RPi PIN 15

A，液晶屏背光+，接5V，RPi PIN 4

K，液晶屏背光-，接地，RPi PIN 39
```

**连接好后，务必要仔细检查是否连接正确，以防开机烧坏GPIO甚至树莓派。**

建议在关机情况下接线，如果在开机情况下接线，VDD请最后连接。

##LCD1602 开机测试
接通电源线，默认情况下，如果连接正确：

* 肯定没有爆炸
* 会出现如下图的效果，证明你已经接线成功了

![](http://blog.yfgeek.com/content/images/2016/08/1.jpg)

##DHT11 接线方案
接线简单，主要是把数据传输到GPIO26上
```
DHT11有3个脚,VCC,DATA,GND

VCC,接 3.3V,PIN 01

DATA,接 GPIO26,PIN 37

GND,接地,PIN 09
```

##DHT22 接线方案
接线需要并联一个10K电阻
```
DHT22有3个脚,VCC,DATA,GND

VCC,接 3.3V,PIN 01

DATA,接 GPIO26,PIN 37

GND,接地,PIN 09

其中DATA和VCC之间用10k电阻相连

```
![](http://codemany.com/uploads/rpi-dht22.png)

#依赖
* Adafruit_DHT
* Adafruit_CharLCD
* Nginx/Apache (请自行提前安装)

###安装依赖
```bash
sudo apt-get update
sudo apt-get install python-dev python-rpi.gpio
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
#结果

![](http://blog.yfgeek.com/content/images/github/1version.jpg)

![](http://blog.yfgeek.com/content/images/github/1lcd.jpg)
