#!/usr/bin/env node
var glob = require('glob'),
    fs = require('fs'),
    colors = require('colors'),
    readline = require('readline'),
    optimist = require('optimist');

var args = optimist.argv;
var exts = args.fexts || 'js*'

if (exts.split(',').length > 1) {
  exts = `{${exts}}`
}

var src = args.source || 'src'

if (src.split(',').length > 1) {
  src = `@(${src.split(',').join('|')})`
}

var srcPath = `${src}/**/*.${exts}`;
var extractUtils = require('./extract_utils')
var pattern = extractUtils.pattern(args.pattern);
var getAllMatches = extractUtils.getAllMatches;
var potFileContent = extractUtils.potFileContent;
var groupByText = extractUtils.groupByText;

/*****************************************************************************/
/* Check if locale folder exists
/*****************************************************************************/
try {
  fs.accessSync(args.locales || 'locales');
} catch (e) {
  fs.mkdirSync(args.locales || 'locales');
}

glob(srcPath, function(err, files) {

  /***************************************************************************/
  /* Reading files and extracting translations
  /***************************************************************************/
	var filesMatches = {}
  files.map(function(file) {
    readline.createInterface({
      input: fs.createReadStream(file),
      output: process.stdout,
      terminal: false
    })

    console.log(`Parsing ${file}`.yellow);
    var fileContent = fs.readFileSync(file, 'utf-8');
    filesMatches[file] = getAllMatches(pattern, fileContent);
  });

  /***************************************************************************/
  /* Grouping by text
  /***************************************************************************/
  var texts = groupByText(filesMatches);

  /***************************************************************************/
  /* Creating template.pot
  /***************************************************************************/
  var potContent = potFileContent(texts);
  var wstream = fs.createWriteStream(`${args.locales || 'locales'}/template.pot`);
  wstream.write(potContent)
  console.log(`\nDone! '${args.locales || 'locales'}/template.pot' updated.\n`.green);

});
