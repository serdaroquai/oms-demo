import crypto from 'crypto';
// import { neonjs } from "@cityofzion/neon-js";

export function hash(outage) {
    return crypto.createHmac('sha256', JSON.stringify(outage)).digest('hex');
}

// export function query(outageId) {
//     const Neon = neonjs.default;
//     const sb = Neon.create.scriptBuilder()

//     sb.emitAppCall('cc1ab58241a20d15c02775ab517fc6570bd63cff', 'query', [Neon.u.str2hexstring(outageId)]);
    
//     neonjs.api.neoscan.getRPCEndpoint('http://localhost:4000/api/main_net').then(end => {
//         neonjs.rpc.Query.invokeScript(sb.str).execute(end).then(response => {
            
//             const resultArr = response.result.stack;
//             console.log(resultArr)
//             console.log(Neon.u.hexstring2str(resultArr[0].value))
//         })
//     })
// }
