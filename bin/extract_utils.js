
// Regexp pattern for extract translations
// Some tools:
//  - https://regexper.com/
//  - https://regex101.com/
//  - http://www.freeformatter.com/javascript-escape.html
exports.pattern = function(gettext) {
  // If custom pattern provided, enforce word boundary to avoid some false positives.
  // e.g. someString.split('.') would extract '.' if custom pattern is 't'
  const patternName = typeof gettext !== 'string' ? 'context.t' : `\\b(?=\\w)${gettext}`;

  return new RegExp(
    `(?:${patternName}(?:(?:(?:\\(\\s*?\\"(.+?[^\\\\])(?:\\"))|(?:\\(\\s*?\\'(.+?[^\\\\])(?:\\')))|(?:(?:\\(\\s*?\\[\\s*?\\'(.+?[^\\\\])\\'\\s*?\\,\\s*?\\'(.+?[^\\\\])\\')|(?:\\(\\s*?\\[\\s*?\\"(.+?[^\\\\])\\"\\s*?\\,\\s*?\\"(.+?[^\\\\])\\")))(?:.*?\\}\\s*?\\,\\s*?(?:(?:\\'(.+?[^\\\\])\\')|(?:\\s*?\\"(.+?[^\\\\])\\")))?)`,
    'g'
  );
};

// Extract all occurences of content
exports.getAllMatches = function(pattern, content) {
  var found = [];
  var m = null;

  while ((m = pattern.exec(content)) !== null) {
    if (m.index === pattern.lastIndex) {
        pattern.lastIndex++;
    }
    found.push({
      text: m[1] || m[2] || m[3] || m[5],
      comment: (m[7] || m[8]) || null,
      plural: (m[4] || m[6]) || null
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
        group[trans.text] = { files: [file], trans: trans, comments: [trans.comment] }
      } else {
        if (group[trans.text].files.indexOf(file) === -1) {
          group[trans.text].files.push(file)
        }
        if (group[trans.text].comments.indexOf(trans.comment) === -1) {
          group[trans.text].comments.push(trans.comment)
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
    const comments = texts[obj].comments

    comments.filter(comment => comment).map((comment) => {
      content += `#. ${comment}\n`
    })

    files.map((file) => {
      content += `#: ${file}\n`
    })
    const string = trans.text.replace(/"/g, '\\"');
    // We must check if text is plural or not.
    if (trans.plural) {
      content += `msgid "${string}"\nmsgid_plural "${trans.plural}"\nmsgstr[0] ""\nmsgstr[1] ""\n\n`
    } else {
      content += `msgid "${string}"\nmsgstr ""\n\n`
    }

  }

  return content
}
