import delay from './delay';
import { hash  } from "../api/cryptoUtil";

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

const hashes = {};

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}


class NeoApi {
  static getOutage(outage) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(hashes[outage.id]);
      }, delay);
    });
  }

  static saveOutage(outage) {
    const outageId = outage.id;
    const hashValue = hash(outage);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        
        hashes[outageId]=hashValue;
        resolve(outage);

      }, delay);
    });
  }
}

export default NeoApi;
