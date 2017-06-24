const path = require('path');
const IOTA = require('iota.lib.js');
const MAM = require('../lib/mam');
const MerkleTree = require('../lib/merkle');
const Encryption = require('../lib/encryption');
var Crypto = require('crypto.iota.js');

const iota = new IOTA({
    provider: 'http://45.77.4.212:14265'
  });

const mamController = {
  post: function(req, res) {
    //post mam message here
      const seed = 'WLLXTOGEZXQHWAAMSLROOOIRQASUIBSVEBHDBAQGIFTJZYNMGUFMMCBTNZBWIOYJUNBWGGGLFRIXQAVHH';
      //const seed = req.body.seed;
      const message = "PAUL HANDY IS HANDY";
      //const message = req.body.message;
      const channelKeyIndex = 3;
      const channelKey = Crypto.converter.trytes(Encryption.hash(Encryption.increment(Crypto.converter.trits(seed.slice()))));
      const start = 3;
      const count = 4;
      const security = 1;

      const tree0 = new MerkleTree(seed, start, count, security);
      const tree1 = new MerkleTree(seed, start + count, count, security);
      let index = 0;

      // Get the trytes of the MAM transactions
      const mam = new MAM.create({
          message: iota.utils.toTrytes(message),
          merkleTree: tree0,
          index: index,
          nextRoot: tree1.root.hash.toString(),
          channelKey: channelKey,
      });

      // Depth
      const depth = 4;

      // minWeighMagnitude
      const minWeightMagnitude = 15;

      console.log("Next Key: " + mam.nextKey);

      // Send trytes
      iota.api.sendTrytes(mam.trytes, depth, minWeightMagnitude, (err, tx) => {
        if (err)
          console.log(err);
        else
          console.log(tx);
      });
  },
  getMessage: function(req, res) {
      const seed = 'WLLXTOGEZXQHWAAMSLROOOIRQASUIBSVEBHDBAQGIFTJZYNMGUFMMCBTNZBWIOYJUNBWGGGLFRIXQAVHH';
      const channelKeyIndex = 3;
      //const seed = req.body.seed;

      //const channelKey = Crypto.converter.trytes(MAM.channelKey(Encryption.hash(Encryption.increment(Crypto.converter.trits(seed.slice()))), channelKeyIndex));
      const channelKey = Crypto.converter.trytes(Encryption.hash(Encryption.increment(Crypto.converter.trits(seed.slice()))));
      const start = 3;
      const count = 4;
      const security = 1;

      const tree0 = new MerkleTree(seed, start, count, security);

      console.log("channelKey: ", channelKey);

      const root = tree0.root.hash.toString();
      iota.api.sendCommand({
          command: "MAM.getMessage",
          channel: MAM.messageID(channelKey)
      }, function(e, result) {
          if(e == undefined) {
              result.ixi.map(mam => {
                  const output = MAM.parse({key: channelKey, message: mam.message, tag: mam.tag});
                  const asciiMessage = iota.utils.fromTrytes(output.message);
                  if (root === output.root) {
                      console.log("Public key match for " + root);
                  }
                  console.log("received: " + asciiMessage);
              });

          }
          else {
            console.log(e);
          }
      });
  }
}

module.exports = mamController;
