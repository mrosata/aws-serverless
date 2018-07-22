#!/usr/bin/env node
/**
 * The concept of this configure/deconfigure solution is from aws-serverless-express starter example:
 *   https://github.com/awslabs/aws-serverless-express/blob/master/examples/basic-starter/scripts/configure.js
 * AWS installs minimist to parse command line parameters, this script just uses positioning of
 * parameters for simplicity (we only have 2 config params atm)
 */
const modifyFiles = require('./modify-files')

const args = process.argv.slice(2)

const bucketName = args[0] || ''
const lambdaFn = args[1] || 'ServerlessLambdaFunction'
const profile = args[2] || 'default'

if (!bucketName) {
  console.error(
    'You must supply a bucket name as parameter 1, \n'
    + 'ie: node ./scripts/configure "<bucketName>"'
  )
  process.exit(1)
}

/**
 * Replaces these variables for actual values. It's important that they
 * are stored in the package.json under '.config' as it allows us to
 * reverse this process.
 */
modifyFiles(['./template.yaml', './src/package.json', './Makefile'], [{
  regexp: /CONFIGURE_AWS_S3_BUCKET_NAME/g,
  replacement: bucketName
}, {
  regexp: /CONFIGURE_AWS_LAMBDA_FUNCTION_NAME/g,
  replacement: lambdaFn
}, {
  regexp: /CONFIGURE_AWS_PROFILE/g,
  replacement: profile
}])
