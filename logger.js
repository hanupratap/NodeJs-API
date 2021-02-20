var url = 'http://mylogger.io/log'; // mock service

function log(message){
    // Send HTTP Req
    console.log(message)
}

module.exports.log = log;