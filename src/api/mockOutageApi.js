import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const outages = [
  {
    id: "1800001",
    title: "Baker Caddesi Trafo Arizasi",
    begin: "04/02/2018 21:43",
    end: "04/02/2018 22:31"
  },
  {
    id: "1800002",
    title: "Sıraselviler SDK",
    begin: "05/02/2018 01:33",
    end: "05/02/2018 01.42"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (outage) => {
  return replaceAll(outage.title, ' ', '-');
};

class OutageApi {
  static getAllOutages() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], outages));
      }, delay);
    });
  }

  static saveOutage(outage) {
    outage = Object.assign({}, outage); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (outage.id) {
          const existingOutageIndex = outages.findIndex(a => a.id == outage.id);
          outages.splice(existingOutageIndex, 1, outage);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          outage.id = generateId(outage);
          outages.push(outage);
        }

        resolve(outage);
      }, delay);
    });
  }
}

export default OutageApi;
