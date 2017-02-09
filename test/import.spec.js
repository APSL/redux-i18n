// Testing: import po
import {getTrans, transToTxt} from '../bin/import_utils'
import {describe, it} from 'mocha'
import expect from 'expect'

describe('importing po files', () => {
  it('from po fiel to dict', () => {
    let translations = {}
    getTrans('./test/en.po', translations)

    expect(Object.keys(translations).length).toEqual(1)
    expect(Object.keys(translations)[0]).toEqual('en')
    expect(Object.keys(translations.en).length).toEqual(4)

    expect(translations.en['Traducir este texto']).toEqual('Translate this text')
    expect(translations.en['Hola {n}!']).toEqual('Hello {n}!')
    expect(translations.en['una noche']).toEqual('one night')
    expect(translations.en['{n} noches']).toEqual('{n} nights')
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
  },\n\
}\n')
  })
})
