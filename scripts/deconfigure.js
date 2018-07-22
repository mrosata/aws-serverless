#!/usr/bin/env node
/**
 * This reverses the work done in ./configure.js
 */
const modifyFiles = require('./modify-files')
const config = require('../src/package.json').config

modifyFiles(['./template.yaml', './src/package.json', './Makefile'], [{
  regexp: new RegExp(config.region, 'g'),
  replacement: 'CONFIGURE_AWS_PROFILE'
},  {
  regexp: new RegExp(config.lambda_function, 'g'),
  replacement: 'CONFIGURE_AWS_LAMBDA_FUNCTION_NAME'
}, {
  regexp: new RegExp(config.s3BucketName, 'g'),
  replacement: 'CONFIGURE_AWS_S3_BUCKET_NAME'
}])
