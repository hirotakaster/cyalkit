# cyalkit
beacon tool for <a href="http://japan.cypress.com/documentation/development-kitsboards/cyalkit-e03-solar-powered-ble-sensor-5-pack" target="_blank">CYALKIT-E03 Solar-Powered BLE Sensor Beacon</a>. 

# install 
```
npm install cyalkit
```

# sample source
```
var Cyalkit = require("cyalkit");
Cyalkit.startScanning();
Cyalkit.on("discover", function(cyalkit) {
  console.dir(cyalkit);
});

## console output
#{ uuid: '0005000100001000800000805f9b0131',
#  major: 1,
#  measuredPower: -61,
#  rssi: -39,
#  temperature: 104,
#  humidity: 81,
#  rawdata: '4c0002150005000100001000800000805f9b013100015168' }  
```

# how to calculate the temperature and humidity.
```
temperature[C] = 175.72 x (temperature x 256) / 65536 – 46.85
humidity[%]    = 125 x (humidity x 256) / 65536 – 6
```
