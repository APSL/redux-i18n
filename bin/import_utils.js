const fs = require('fs')
const gtp = require('gettext-parser')
const po = gtp.po
const path = require('path')

exports.getTrans = (file, translations) => {
  const content = fs.readFileSync(file)
  const pocontent = po.parse(content)
  const trans = pocontent.translations['']
  const lang = pocontent.headers.language.replace('_', '-')

  // Initializing language dictionary
  translations[lang] = {}

  for (let k in trans) {
    const value = trans[k]

    if (value.msgid && value.msgstr.length) {
      translations[lang][value.msgid] = value.msgstr[0]
      if (value.msgid_plural && value.msgid_plural.length) {
        translations[lang][value.msgid_plural] = value.msgstr[1]
      }
    }
  }

}

exports.transToTxt = (trans) => {
  let txt = 'export const translations = {\n'

  for (let lang in trans) {
    txt += `  '${lang}': {\n`

    for (let k in trans[lang]) {
      txt += `    '${k}': '${trans[lang][k]}',\n`
    }

    txt += `  },\n`
  }

  txt += '}\n'
  return txt
}
