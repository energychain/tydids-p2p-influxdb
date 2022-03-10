# tydids-p2p-influxdb

<a href="https://stromdao.de/" target="_blank" title="STROMDAO - Digital Energy Infrastructure"><img src="./static/stromdao.png" align="right" height="85px" hspace="30px" vspace="30px"></a>

**[TyDIDs](https://tydids.com) based P2P Data Identity collector for InfluxDB.**

[![npm](https://img.shields.io/npm/dt/tydids-p2p-influxdb.svg)](https://www.npmjs.com/package/tydids-p2p-influxdb)
[![npm](https://img.shields.io/npm/v/tydids-p2p-influxdb.svg)](https://www.npmjs.com/package/tydids-p2p-influxdb)
[![CO2Offset](https://api.corrently.io/v2.0/ghgmanage/statusimg?host=tydids-p2p-influxdb&svg=1)](https://co2offset.io/badge.html?host=tydids-p2p-influxdb)
[![Join the chat at https://gitter.im/stromdao/tydids-p2p](https://badges.gitter.im/stromdao/tydids-p2p.svg)](https://gitter.im/stromdao/tydids-p2p?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Imagine a dataset that is available somewhere in the world might be accessed everywhere. How? You just need to know its address!
- Decide who is allowed to see this dataset.
- Forget about protocols, p2p, request-responds, polling for changes.
- Set a value in your dataset with one line of code
- Subscribe to changes with another single line of code

## This is TyDIDs.

```
npm install -g tydids-p2p-influxdb

tydids-p2p-influxdb -h

Usage: tydids-influxdb

Options:
  -priv --privateKey <key>
  -w --writeTydidsJSON
  -n --influxHost <hostname>
  -p --presentation [address]
  -P --influxPort <port>
  -d --influxDatabase <name>
  -m --influxMeasurement <name>
  --createPrivateKey
  -h, --help                     display help for command
```
