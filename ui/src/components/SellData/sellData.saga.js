import { takeLatest, put, call } from 'redux-saga/effects';
import {
  SELL_DATA,
  sellDataSuccess,
  sellDataFailure
} from './sellData.actions';
//import { API_URL} from '../../environment';
import MAM from 'mam.client.js';
import MerkleTree from 'mam.client.js';
import Encryption from 'mam.client.js';
import Crypto from 'crypto.iota.js';

function sellData(sd, data) {

  // const iota = new IOTA({
  //   provider: 'http://45.77.4.212:14265'
  // });
  console.log("SEED", sd);
  console.log("DATA", data);

  const seed = 'WLLXTOGEZXQHWAAMSLROOOIRQASUIBSVEBHDBAQGIFTJZYNMGUFMMCBTNZBWIOYJUNBWGGGLFRIXQAVHH';
  const message = "PAUL HANDY IS HANDY";
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
    message: "999999",
    //message: iota.utils.toTrytes(message),
    merkleTree: tree0,
    index: index,
    nextRoot: tree1.root.hash.toString(),
    channelKey: channelKey,
  });

  const depth = 4;
  const minWeightMagnitude = 15;

  console.log(mam);

// Send trytes
//   iota.api.sendTrytes(mam.trytes, depth, minWeightMagnitude, (err, tx) => {
//     if (err) {
//       throw err;
//     }
//     else {
//       console.log(tx);
//       return tx;
//     }
//   });

}


function* submitSellData(action) {
  try {
    console.log("SEED", action.seed);
    console.log("DATA", action.data);
    const response = yield call(sellData, action.seed, action.data);
    yield put(sellDataSuccess(response));
  }
  catch(err)
  {
    yield put(sellDataFailure(err));
  }
}

export default function* watchSellDataSubmit() {
  yield takeLatest(SELL_DATA, submitSellData);
}