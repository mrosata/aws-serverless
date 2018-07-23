const awsServerlessExpress = require('aws-serverless-express')
const app = require('./app')


exports.handler = (event, context) =>
  awsServerlessExpress.proxy(
    awsServerlessExpress.createServer(app), event, context
  )

if (process.env.TEST) {
  app.listen(3000)
}