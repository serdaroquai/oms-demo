import { hash } from "../api/cryptoUtil";
const neonjs = require('@cityofzion/neon-js');
const Neon = neonjs.default;

const config = {
    name: 'PrivateNet',
    extra: {
        neoscan: 'http://localhost:4000/api/main_net'
    }
}

class NeoApi {
    static getOutage(outage) {

        return new Promise((resolve, reject) => {

            const sb = Neon.create.scriptBuilder();
            sb.emitAppCall('cc1ab58241a20d15c02775ab517fc6570bd63cff', 'query', [Neon.u.str2hexstring(outage.id)]);

            neonjs.api.neoscan.getRPCEndpoint('http://localhost:4000/api/main_net').then(end => {
                neonjs.rpc.Query.invokeScript(sb.str).execute(end).then(response => {
                    const resultArr = response.result.stack;
                    const resultHash = Neon.u.hexstring2str(resultArr[0].value);
                    if (resultHash !== '') {
                        resolve(resultHash);
                    } else {
                        reject("No Value found on chain");
                    }
                });
            }).catch(error => {
                reject(error);
            });
        }).catch(error => {
            throw (error);
        });
    }

    static saveOutage(outage) {
        return new Promise((resolve, reject) => {
            const privateNet = new neonjs.rpc.Network(config);
            Neon.add.network(privateNet);
            const outageHash = hash(outage);

            const config2 = {
                net: 'PrivateNet',
                script: Neon.create.script({
                    scriptHash: 'cc1ab58241a20d15c02775ab517fc6570bd63cff',
                    operation: 'register',
                    args: [Neon.u.str2hexstring(outage.id),Neon.u.str2hexstring(outageHash)]
                }),
                address: 'AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y',
                privateKey: 'KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr',
                gas: 0
            };

            Neon.doInvoke(config2).then(res => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
}

export default NeoApi;


// import { hash } from "../api/cryptoUtil";
// import Neon, {rpc} from "@cityofzion/neon-js";


// const config = {
//     name: 'PrivateNet',
//     extra: {
//         neoscan: 'http://localhost:4000/api/main_net'
//     }
// };

// class NeoApi {
//     static getOutage(outage) {

//         return new Promise((resolve, reject) => {
//             debugger;
//             const outageId = outage.id;

//             const sb = Neon.create.scriptBuilder();

//             sb.emitAppCall('cc1ab58241a20d15c02775ab517fc6570bd63cff', 'query', [Neon.u.str2hexstring(outageId)]);

//             rpc.
//             neoscan.getRPCEndpoint('http://localhost:4000/api/main_net').then(end => {
//                 debugger;
//                 Neon.
//                 Neon.neonjs.rpc.Query.invokeScript(sb.str).execute(end).then(response => {
//                     debugger;
//                     const resultArr = response.result.stack;
//                     // console.log(resultArr);
//                     // console.log(Neon.u.hexstring2str(resultArr[0].value));
//                     resolve(resultArr[0].value);
//                 }).catch(error => {
//                     debugger;
//                     reject(error);
//                 });
//             }).catch(error => {
//                 debugger;
//                 reject(error);
//             });
//         });
//     }

//     static saveOutage(outage) {

//         return new Promise((resolve, reject) => {
//             debugger;
//             const privateNet = new rpc.Network(config);
//             Neon.add.network(privateNet);
//             const outageHash = hash(outage);

//             const config2 = {
//                 net: 'PrivateNet',
//                 script: Neon.create.script({
//                     scriptHash: 'cc1ab58241a20d15c02775ab517fc6570bd63cff',
//                     operation: 'register',
//                     args: [Neon.u.str2hexstring(outage.id), Neon.u.str2hexstring(outageHash)]
//                 }),
//                 address: 'AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y',
//                 privateKey: 'KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr',
//                 gas: 0
//             };

//             Neon.doInvoke(config2).then(res => {
//                 debugger;
//                 resolve();
//             }).catch(error => {
//                 debugger;
//                 reject(error);
//             });
//         });
//     }
// }

// export default NeoApi;





// export function getOutageNeo(outage) {

//     return new Promise((resolve, reject) => {
//         const outageId = outage.id;

//         const sb = Neon.create.scriptBuilder();

//         sb.emitAppCall('cc1ab58241a20d15c02775ab517fc6570bd63cff', 'query', [Neon.u.str2hexstring(outageId)]);

//         neonjs.api.neoscan.getRPCEndpoint('http://localhost:4000/api/main_net').then(end => {
//             neonjs.rpc.Query.invokeScript(sb.str).execute(end).then(response => {

//                 const resultArr = response.result.stack;
//                 // console.log(resultArr);
//                 // console.log(Neon.u.hexstring2str(resultArr[0].value));
//                 resolve(resultArr[0].value);
//             }).catch(error => {
//                 reject(error);
//             });
//         }).catch(error => {
//             reject(error);
//         });
//     });
// }

// export function saveOutageOnChain(outage) {

//     return new Promise((resolve, reject) => {
//         const privateNet = new rpc.Network(config);
//         Neon.add.network(privateNet);
//         const outageHash = hash(outage);

//         const config2 = {
//             net: 'PrivateNet',
//             script: Neon.create.script({
//                 scriptHash: 'cc1ab58241a20d15c02775ab517fc6570bd63cff',
//                 operation: 'register',
//                 args: [Neon.u.str2hexstring(outage.id), Neon.u.str2hexstring(outageHash)]
//             }),
//             address: 'AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y',
//             privateKey: 'KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr',
//             gas: 0
//         };

//         Neon.doInvoke(config2).then(res => {
//             debugger;
//             resolve();
//         }).catch(error => {
//             debugger;
//             reject(error);
//         });
//     });
// }