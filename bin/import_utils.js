const fs = require('fs')
const gtp = require('gettext-parser')
const po = gtp.po
const escape_quotes = require('escape-quotes');
const plural_pattern = new RegExp('(?:([0-9]+)\\;\\s(?:plural\\=\\((.*)\\)\\;))')

exports.getTrans = (file, translations, encoding) => {
  const content = fs.readFileSync(file)
  const pocontent = po.parse(content, encoding)
  if (!pocontent.headers.language) {
      console.log(`\nError! language header not defined. \n`.red)
      throw `Define language in ${file}`
  }
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

  // Options
  translations['options'] = {}
  if (pocontent.headers && pocontent.headers['plural-forms']) {
    const result = (plural_pattern.exec(pocontent.headers['plural-forms']))
    if (result) {
      translations['options']['plural_rule'] = result[2]
      translations['options']['plural_number'] = result[1]
    }
  }

}

exports.transToTxt = (trans) => {
  let txt = 'export const translations = {\n'

  for (let lang in trans) {
    txt += `  '${lang}': {\n`

    for (let k in trans[lang]) {
      txt += `    '${escape_quotes(k)}': '${escape_quotes(trans[lang][k])}',\n`
    }

    txt += `  },\n`
  }

  txt += '}\n'
  return txt
}
