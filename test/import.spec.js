// Testing: import po
import {getTrans, transToTxt} from '../bin/import_utils'
import {describe, it} from 'mocha'
import expect from 'expect'

describe('importing po files', () => {
  it('from po file to dict', () => {
    let translations = {}
    getTrans('./test/en.po', translations)

    expect(Object.keys(translations).length).toEqual(2)
    expect(Object.keys(translations)[0]).toEqual('en')
    expect(Object.keys(translations.en).length).toEqual(6)

    expect(translations.en['Traducir este texto']).toEqual('Translate this text')
    expect(translations.en['Hola {n}!']).toEqual('Hello {n}!')
    expect(translations.en['una noche']).toEqual('one night')
    expect(translations.en['{n} noches']).toEqual('{n} nights')
    expect(translations.en['Text \'with\' quotes']).toEqual('Text \'with\' quotes')

    expect(translations.options.plural_rule).toEqual('n != 1')
    expect(translations.options.plural_number).toEqual(2)
  })

  it('from dict to js file', () => {
    let translations = {}
    getTrans('./test/en.po', translations)

    const txt = transToTxt(translations)
    expect(txt).toEqual('export const translations = {\n\
  \'en\': {\n\
    \'Traducir este texto\': \'Translate this text\',\n\
    \'Hola {n}!\': \'Hello {n}!\',\n\
    \'una noche\': \'one night\',\n\
    \'{n} noches\': \'{n} nights\',\n\
    \'Text \\\'with\\\' quotes\': \'Text \\\'with\\\' quotes\',\n\
    \'Text\\\nwith\\\nnewlines\\\n\': \'Text\\\nwith\\\nnewlines\\\n\',\n\
  },\n\
  \'options\': {\n\
    \'plural_rule\': \'n != 1\',\n\
    \'plural_number\': \'2\',\n\
  },\n\
}\n')
  })
})
