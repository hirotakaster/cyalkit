var Cyalkit = require('./index');
Cyalkit.startScanning();
Cyalkit.on("discover", function(cyalkite) {
  console.dir(cyalkite);
});
