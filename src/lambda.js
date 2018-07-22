const axios = require('axios')
const url = 'http://checkip.amazonaws.com/'
let response


exports.handler = async (event, context, callback) => {
  try {
    const ret = await axios(url)
    console.log(ret)
    response = {
      'statusCode': 200,
      'body': JSON.stringify({
        message: 'hello world',
        location: ret.data.trim()
      })
    }
  }
  catch (err) {
    console.log(err)
    callback(err, null)
  }

  callback(null, response)
}