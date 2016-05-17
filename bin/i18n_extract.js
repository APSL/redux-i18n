#!/usr/bin/env node
var glob = require("glob"),
    fs = require("fs"),
    color = require("colors"),
    readline = require("readline");

var srcPath = "src/**/*.js*";
var pattern = /context.t\((?:\"(.+?)\")(?:,.+)?\)/g;
var texts = {};

/*****************************************************************************/
/* Check if locale folder exists
/*****************************************************************************/
try {
  fs.accessSync("locales");
} catch(e) {
  fs.mkdirSync("locales");
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

    while ((m = pattern.exec(fileContent)) !== null) {
      if (m.index === pattern.lastIndex) {
          pattern.lastIndex++;
      }

      var text = m[1];
      if(texts[text] === undefined) {
        texts[text] = [file]
      } else {
        texts[text].push(file)
      }

    }

  });

  /***************************************************************************/
  /* Creating template.pot
  /***************************************************************************/
  var wstream = fs.createWriteStream("locales/template.pot");
  wstream.write(`msgid ""\nmsgstr ""\n"Content-Type: text/plain; charset=UTF-8"\n"Content-Transfer-Encoding: 8bit"\n\n`);
  for(text in texts) {

    var files = texts[text];
    files.map(function(file) {
      wstream.write(`#. ${file}\n`);
    });
    wstream.write(`msgid "${text}"\nmsgstr ""\n\n`);
  }

  console.log("\nDone! 'locales/template.pot' updated.\n".green);

});


