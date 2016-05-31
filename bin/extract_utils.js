exports.pattern = /context.t\((?:\"(.+?)\")(?:,.+)?\)?/g;
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
