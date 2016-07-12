exports.pattern = function(gettext) {
  if (typeof gettext !== 'string') {
    gettext = 'context.t';
  }
  return new RegExp(gettext + '\\((?:[\"\'](.+?)[\"\'])(?:,.+)?\\)?', 'g');
}
exports.getAllMatches = function(pattern, content) {
  var found = [];
  var m = null;

  while((m = pattern.exec(content)) !== null) {
    if(m.index === pattern.lastIndex) {
        pattern.lastIndex++;
    }
    found.push(m[1])
  }

  return found;
}
