const path = require('path');
const IOTA = require('iota.lib.js');
const mam_client = require('mam.client.js');
const MAM = mam_client.MAM;
const MerkleTree = mam_client.Merkle;
const Encryption = mam_client.Encryption;
var Crypto = require('crypto.iota.js');

const iota = new IOTA({
    provider: 'http://45.77.4.212:14265'
  });

const mamController = {
  post: function(req, res) {
      const seed = req.body.seed || 'WLLXTOGEZXQHWAAMSLROOOIRQASUIBSVEBHDBAQGIFTJZYNMGUFMMCBTNZBWIOYJUNBWGGGLFRIXQAVHH';
      const message = req.body.message || (new Date()).toString();

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
        if (err) {
          console.log(err);
          res.status(500).json({seed: seed, message: message, error: err, success: false});
        }
        else {
          console.log(JSON.stringify({seed: seed, message: message, tx: tx, success: true}), null, 2);
          res.status(200).json({seed: seed, message: message, tx: tx, success: true});
        }
      });
  },
  getMessage: function(req, res) {
      const seed = req.body.seed || 'WLLXTOGEZXQHWAAMSLROOOIRQASUIBSVEBHDBAQGIFTJZYNMGUFMMCBTNZBWIOYJUNBWGGGLFRIXQAVHH';
      const channelKeyIndex = 3;
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
            const rtn = {seed: seed, messages: [], success: true}
              result.ixi.map(mam => {
                  const output = MAM.parse({key: channelKey, message: mam.message, tag: mam.tag});
                  const asciiMessage = iota.utils.fromTrytes(output.message);
                  if (root === output.root) {
                      console.log("Public key match for " + root);
                  }
                  rtn.messages.push(asciiMessage);
                  console.log("received: " + asciiMessage);
              });
            console.log(JSON.stringify(rtn, null, 2));
            res.status(200).json(rtn);
          }
          else {
            console.log(JSON.stringify({error: e, success: false}, null, 2));
            res.status(500).json({error: e, success: false});
          }
      });
  }
}

module.exports = mamController;
