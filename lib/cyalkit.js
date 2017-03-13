var events = require('events');
var util = require('util');
var noble = require('noble');

var CYALKITE__UUID         = "0005000100001000800000805f9b0131";
var MANUFACTURER_DATA_LENGTH = 25;
var COMPANY_ID               = 0x004c;
var DEVICE_TYPE              = 0x02;
var DATA_LENGHT              = 0x15;

var Cyalkit = function() {
  noble.on('discover', this.onDiscover.bind(this));
};
util.inherits(Cyalkit, events.EventEmitter);

Cyalkit.prototype.startScanning = function() {
  if (noble.state === 'poweredOn') {
    noble.startScanning([], true);
  } else {
    noble.on('stateChange', function() {
      noble.startScanning([], true);
    });
  }
};

Cyalkit.prototype.stopScanning = function() {
  noble.stopScanning();
};

Cyalkit.prototype.onDiscover = function(peripheral) {
  var rawdata = peripheral.advertisement.manufacturerData;

  if (rawdata &&
      MANUFACTURER_DATA_LENGTH <= rawdata.length &&
      COMPANY_ID === rawdata.readUInt16LE(0) &&
      DEVICE_TYPE === rawdata.readUInt8(2) &&
      DATA_LENGHT === rawdata.readUInt8(3)) {

    var uuid = rawdata.slice(4, 20).toString('hex');
    if (CYALKITE__UUID.indexOf(uuid) == 0) {
      cyalkit = {};
      cyalkit.uuid = uuid;
      cyalkit.major = rawdata.readUInt16BE(20);
      cyalkit.measuredPower = rawdata.readInt8(24)
      cyalkit.rssi = peripheral.rssi;
      cyalkit.temperature = rawdata.readUInt8(23);
      cyalkit.humidity = rawdata.readUInt8(22);
      cyalkit.rawdata = rawdata.slice(0, rawdata.length - 1).toString('hex')

      this.emit('discover', cyalkit);
    }
  }
};

module.exports = Cyalkit;
