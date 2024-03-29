#!/usr/bin/env node

const glob = require('glob');
const fs = require('fs');
const color = require('colors');
const args = require('minimist')(process.argv.slice(2));
const importUtils = require('./import_utils');
const getTrans = importUtils.getTrans
const transToTxt = importUtils.transToTxt

const localesPath = `${args.locales || 'locales'}/*.po`;
const encoding = args.encoding;
let translations = {};

glob(localesPath, (err, files) => {
  files.map(function(file) {
    getTrans(file, translations, encoding)
  });

  const translationsFile = `${args.translations || 'src'}/translations.js`;
  const content = transToTxt(translations)
  var wstream = fs.createWriteStream(translationsFile);
  wstream.write(content);
  console.log(`\nDone! '${translationsFile}' generated.\n`.green);
});
