#!/usr/bin/env node
const fs = require('fs')

module.exports = function modifyFiles (files, replacements) {

  files.forEach((file) => {
    if (!file || !fs.readFileSync(file, 'utf8')) {
      console.error(`File ${file} is required`)
      process.exit(1)
    }
  })

  files.forEach((file) => {
    let fileContentModified = fs.readFileSync(file, 'utf8')

    replacements.forEach((v) => {
      fileContentModified = fileContentModified.replace(v.regexp, v.replacement)
    })

    fs.writeFileSync(file, fileContentModified, 'utf8')
  })
}