const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const app = express()
const router = express.Router()


router.use(compression())
router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(awsServerlessExpressMiddleware.eventContext())


app.get('/', (req, res) => {
  res.json(req.apiGateway.event)
})

router.get('/hello', (req, res) => {
  res.json({
    body: {
      message: 'Hello World'
    }
  })
})

router.get('/goodbye', (req, res) => {
  res.json({
    message: 'Goodbye Cool World'
  })
})

app.use('/', router)

module.exports = app
