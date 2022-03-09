const TyDIDs = require("tydids-p2p");
const Influx = require('influx')

const TydidsP2PInflux = {
  ethers:TyDIDs.ethers,
  run:async function(tydidsconfig,influxconfig) {
    const influx = new Influx.InfluxDB(influxconfig);
    const ssi = await TyDIDs.ssi(tydidsconfig.privateKey,true);
    if((typeof tydidsconfig.measurement == 'undefined') || (tydidsconfig.measurement == null)) {
      tydidsconfig.measurement = ssi.identity.address;
    }
    if(typeof tydidsconfig.resubscribe == 'undefined') tydidsconfig.resubscribe = 60000;
    const wrapWrite = async function(data) {
      let iData = {};

      const mangelObject = function(obj,mstr) {
        for (const [key, value] of Object.entries(obj)) {
          if(typeof value !== 'object') {
            iData[mstr+key] = value;
          } else {
            mangelObject(value,mstr+'_'+key);
          }
        }
        return obj;
      }


      mangelObject(data,'');

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

    const _subscribe = async function() {
      ssi.emitter.on('payload:ethr:6226:'+tydidsconfig.presentation,function(data) {
          wrapWrite(data);
      });
      ssi.retrievePresentation(tydidsconfig.presentation);
    }

    setInterval(_subscribe,tydidsconfig.resubscribe);

    let presentation = await ssi.retrievePresentation(tydidsconfig.presentation);


    wrapWrite(presentation);
    _subscribe();
  }
}

module.exports=TydidsP2PInflux
