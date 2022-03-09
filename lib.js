const TyDIDs = require("tydids-p2p");
const Influx = require('influx')

const TydidsP2PInflux = {
  run:async function(tydidsconfig,influxconfig) {
    const influx = new Influx.InfluxDB(influxconfig);
    const ssi = await TyDIDs.ssi(tydidsconfig.privateKey,true);
    if((typeof tydidsconfig.measurement == 'undefined') || (tydidsconfig.measurement == null)) {
      tydidsconfig.measurement = ssi.identity.address;
    }

    const wrapWrite = async function(data) {
      let iData = {};

      const mangelObject = function(obj,mstr) {
        for (const [key, value] of Object.entries(obj)) {
          if(typeof value !== 'object') {
            iData[mstr+key] = value;
          } else {
            mstr += key;            
            mangelObject(value,mstr);
          }
        }
        return obj;
      }
      mangelObject(data,'');

      console.log(iData);

      influx.writePoints([
        {
          measurement: tydidsconfig.measurement,
          tags: { tydids: ssi.identity.address },
          fields: iData
        }
      ]).catch(err => {
        console.error(`Error saving data to InfluxDB! ${err.stack}`)
      })
    }

    let presentation = await ssi.retrievePresentation(tydidsconfig.presentation);

    ssi.emitter.on('payload:ethr:6226:'+tydidsconfig.presentation,function(data) {
        wrapWrite(data);
    });

    wrapWrite(presentation);

  }
}

module.exports=TydidsP2PInflux
