#!/usr/bin/env node
var glob = require("glob"),
    fs = require("fs"),
    color = require("colors"),
    readline = require("readline"),
    optimist = require("optimist");

var args = optimist.argv;
var srcPath = `${args.source || "src"}/**/*.js*`;
var extractUtils = require("./extract_utils")
var pattern = extractUtils.pattern;
var getAllMatches = extractUtils.getAllMatches;
var texts = {};


/*****************************************************************************/
/* Check if locale folder exists
/*****************************************************************************/
try {
  fs.accessSync(args.locales || "locales");
} catch(e) {
  fs.mkdirSync(args.locales || "locales");
}


glob(srcPath, function(err, files) {

  /***************************************************************************/
  /* Reading files and extracting translations
  /***************************************************************************/
  files.map(function(file) {
    var rd = readline.createInterface({
      input: fs.createReadStream(file),
      outpu: process.stdout,
      terminal: false
    })

    console.log(`Parsing ${file}`.yellow);
    var fileContent = fs.readFileSync(file, "utf-8");
    var matches = getAllMatches(pattern, fileContent);

    for (var i=0;i<matches.length;i++) {
      var text = matches[i];
      if(texts[text] === undefined) {
        texts[text] = [file];
      } else {
        texts[text].push(file)
      }
    }

  });

  /***************************************************************************/
  /* Creating template.pot
  /***************************************************************************/
  var wstream = fs.createWriteStream(`${args.locales || "locales"}/template.pot`);
  wstream.write(`msgid ""\nmsgstr ""\n"Content-Type: text/plain; charset=UTF-8"\n"Content-Transfer-Encoding: 8bit"\n\n`);
  for(text in texts) {

    var files = texts[text];
    files.map(function(file) {
      wstream.write(`#. ${file}\n`);
    });
    wstream.write(`msgid "${text}"\nmsgstr ""\n\n`);
  }

  console.log(`\nDone! '${args.locales || "locales"}/template.pot' updated.\n`.green);

});
