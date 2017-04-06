
// Regexp pattern for extract translations
exports.pattern = function(gettext) {
  if (typeof gettext !== 'string') {
    gettext = 'context.t';
  }
  return new RegExp(gettext + '\\((?:([\"\']([^\),]+)[\"\']?)|(?:\\[[\"\']([^\),]+)(?:[\"\']),(?: )(?:[\"\'](.+?)(?:[\"\']))))(?:,.+(?:,(?: )?[\'\"](.*)[\'\"]))?\\)?', 'g');
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
      text: m[2] || m[3],
      comment: m[5] || null,
      plural: m[4] || null
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
  let content = ''

  for (var obj in texts) {

    const files = texts[obj].files
    const trans = texts[obj].trans

    if (trans.comment) {
      content += `#. ${trans.comment}\n`
    }

    files.map((file) => {
      content += `#: ${file}\n`
    })

    // We must check if text is plural or not.
    if (trans.plural) {
      content += `msgid "${trans.text}"\nmsgid_plural "${trans.plural}"\nmsgstr[0] ""\nmsgstr[1] ""\n\n`
    } else {
      content += `msgid "${trans.text}"\nmsgstr ""\n\n`
    }

  }

  return content
}
