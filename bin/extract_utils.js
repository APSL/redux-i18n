
// Regexp pattern for extract translations
exports.pattern = function(gettext) {
  if (typeof gettext !== 'string') {
    gettext = 'context.t';
  }
  return new RegExp(gettext + '\\((?:[\"\'](.+?)[\"\'])(?:,.+(?:,(?:\ )?[\'\"](.*)[\'\"]))?\\)?', 'g');
}

// Extract all occurences of content
exports.getAllMatches = function(pattern, content) {
  var found = [];
  var m = null;

  while ((m = pattern.exec(content)) !== null) {
    if (m.index === pattern.lastIndex) {
        pattern.lastIndex++;
    }
    found.push({
      text: m[1],
      comment: m[2] || null
    })
  }

  return found;
}

// Grouping by text
exports.groupByText = function(filesMatches) {
  let group = {}

  for (let file in filesMatches) {
    const matches = filesMatches[file]

    for (let i = 0; i < matches.length; i++) {
      const trans = matches[i]

      if (group[trans.text] === undefined) {
        group[trans.text] = { files: [file], trans: trans }
      } else {
        if (group[trans.text].files.indexOf(file) === -1) {
          group[trans.text].files.push(file)
        }
      }
    }
  }

  return group
}

// Build pot file content
exports.potFileContent = function(texts) {
  let content = 'msgid ""\nmsgstr ""\n"Content-Type: text/plain; charset=UTF-8"\n"Content-Transfer-Encoding: 8bit"\n\n'

  for (var obj in texts) {

    let files = texts[obj].files
    let trans = texts[obj].trans

    if (trans.comment) {
      content += `#. ${trans.comment}\n`
    }

    files.map((file) => {
      content += `#: ${file}\n`
    })

    content += `msgid "${trans.text}"\nmsgstr ""\n\n`
  }

  return content
}
