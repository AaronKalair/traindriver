const Hs100Api = require('hs100-api');
const http = require('http');
const EventEmitter = require('events').EventEmitter;;

const trainEvents = new EventEmitter();
const client = new Hs100Api.Client();
let _plug = null;

function switchPlug(on) {
    if(_plug) {
        _plug.setPowerState(on);
    }
}

function pollServer() {
    var request = require('request');
    request('http://localhost:5000/trainStatus', function (error, response, body) {
        body = JSON.parse(body);
        trainEvents.emit('trainStatus', body.powerOn);
    });
}

trainEvents.on('trainStatus', (powerStatus) => {
    switchPlug(powerStatus);
});

client.startDiscovery().on('plug-new', (plug) => {
    var data = plug.getInfo().then((data) => {;
        if (data.sysInfo.alias === 'Train') {
            _plug = plug
        }
    })
});

setInterval(pollServer, 3000);
