const createLighthouse = require('lighthouse-lambda')
const url = "https://careers.unbounce.com"
console.log("Let's go...", url)
 
exports.handler = function (event, context, callback) {
  Promise.resolve()
    .then(() => createLighthouse(url, { logLevel: 'debug'}))
    .then(({ chrome, start, createReport }) => {
      return start()
        .then((results) => {
          console.log("results", Object.keys(results))
          console.log("results", Object.keys(results.audits))
          // for( const audit of ['dom-size',
          //                     'first-interactive',
          //                     'first-meaningful-paint',
          //                     'network-requests',
          //                     'speed-index-metric',
          //                     'total-byte-weight',
          //                     'user-timings']) {
          //   console.log(audit, results.audits[audit])  
          // }
          // console.log(results.audits)
          return chrome.kill().then(() => callback(null))
        })
    })
    .catch(callback)
}