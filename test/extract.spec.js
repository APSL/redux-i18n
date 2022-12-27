import { pattern, getAllMatches, potFileContent, groupByText } from '../bin/extract_utils'
import expect from 'expect'
import { describe, it } from 'mocha'

const html = `
<div>
  <strong>Your current language, is: {this.props.lang}</strong><br/>
  {this.context.t("Translate this text")}<br/>
  {translate("Also translate this text")}<br/>
  {this.context.t('Hello {n}!', {n: 'Cesc'})}<br/><br/>
  {notranslate("Don't translate this text")}<br/>
  <button onClick={this.changeLanguage.bind(this)}>Change Language</button>
  <div>
    {sample.format(this.context.t('YYYY-MM-DD'))}
  </div>

  <CustomComponent
    title={this.context.t('{n}. Values from {f} to {t}', {
      f: '11/11/1111',
      t: '22/22/2222',
      n: index
    })}
  />

  <div>{this.context.t('Hi {name} 1!', { name: 'Cesc' }, 'This is a comment for the translator 1')}</div>
  <div>{this.context.t('Hi {name} 2!', { name: 'Cesc' },'This is a comment for the translator 2')}</div>
  <div>{this.context.t("Hi {name} 3!", { name: "Cesc" },"This is a comment for the translator 3")}</div>
  <div>{this.context.t('Hi {name} 4!', {}, 'This is a comment for the translator 4')}</div>
  <span>{context.t(['una noche 1', '{n} noches 1', 'n'], {n: 5})}</span>
  <span>{context.t(['una noche 2','{n} noches 2', 'n'], {n: 5})}</span>
  <span>{context.t(["una noche 3", "{n} noche's 3", "n"], {n: 5})}</span>
  <span>{context.t(["una noche 4", "{n} noche's 4", "n"], {n: 5}, "This is a comment 4")}</span>
  <span>{context.t(['una noche 5', '{n} noches 5', 'n'], {n: 5}, 'This is a comment 5')}</span>
  <span>{context.t("Tom's house is very big")}</span>
  <span>{context.t(
    "Tom's house is very big"
  )}</span>
  <span>{context.t(
    [
      "Tom's house is very big" ,
      "Tom's houses are very big" ,
    ]
    ,
    {}
    , "Some comment"
  )}</span>

  <div>{this.context.t('Hi {name} 1!', { name: 'Cesc' }, 'This is a comment for the translator duplicate')}</div>
</div>
`

const stateless = `
const Foo = ({}, context) => <h1>{context.t("Hello World")}</h1>
`

const oneWord = `const oneWord = (props, context) =>{
  return(
    <h1>{context.t("굿")}</h1>
    <h1>{context.t("A")}</h1>   
  )
}`

describe('extract texts', () => {
  it('extracting basic texts', () => {
    const matches = getAllMatches(pattern(), html)

    expect(matches.length).toEqual(17)
    expect(matches[0].text).toEqual('Translate this text')
    expect(matches[0].plural).toEqual(null)
    expect(matches[0].comment).toEqual(null)

    expect(matches[1].text).toEqual('Hello {n}!')
    expect(matches[1].plural).toEqual(null)
    expect(matches[1].comment).toEqual(null)

    expect(matches[2].text).toEqual('YYYY-MM-DD')
    expect(matches[2].plural).toEqual(null)
    expect(matches[2].comment).toEqual(null)

    expect(matches[3].text).toEqual('{n}. Values from {f} to {t}')
    expect(matches[3].plural).toEqual(null)
    expect(matches[3].comment).toEqual(null)

    expect(matches[4].text).toEqual('Hi {name} 1!')
    expect(matches[4].plural).toEqual(null)
    expect(matches[4].comment).toEqual('This is a comment for the translator 1')

    expect(matches[5].text).toEqual('Hi {name} 2!')
    expect(matches[5].comment).toEqual('This is a comment for the translator 2')
    expect(matches[5].plural).toEqual(null)

    expect(matches[6].text).toEqual('Hi {name} 3!')
    expect(matches[6].comment).toEqual('This is a comment for the translator 3')
    expect(matches[6].plural).toEqual(null)

    expect(matches[7].text).toEqual('Hi {name} 4!')
    expect(matches[7].comment).toEqual('This is a comment for the translator 4')
    expect(matches[7].plural).toEqual(null)

    expect(matches[8].text).toEqual('una noche 1')
    expect(matches[8].plural).toEqual('{n} noches 1')
    expect(matches[8].comment).toEqual(null)

    expect(matches[9].text).toEqual('una noche 2')
    expect(matches[9].plural).toEqual('{n} noches 2')
    expect(matches[9].comment).toEqual(null)

    expect(matches[10].text).toEqual('una noche 3')
    expect(matches[10].plural).toEqual("{n} noche's 3")
    expect(matches[10].comment).toEqual(null)

    expect(matches[11].text).toEqual('una noche 4')
    expect(matches[11].plural).toEqual("{n} noche's 4")
    expect(matches[11].comment).toEqual('This is a comment 4')

    expect(matches[12].text).toEqual('una noche 5')
    expect(matches[12].plural).toEqual('{n} noches 5')
    expect(matches[12].comment).toEqual('This is a comment 5')

    expect(matches[13].text).toEqual("Tom's house is very big")
    expect(matches[13].plural).toEqual(null)
    expect(matches[13].comment).toEqual(null)
  })

  it('accepts a custom getText function name', () => {
    const matches = getAllMatches(pattern('translate'), html)

    expect(matches.length).toEqual(1)
    expect(matches[0].text).toEqual('Also translate this text')
    expect(matches[0].plural).toEqual(null)
    expect(matches[0].comment).toEqual(null)
  })

  it('check pot file content', () => {
    // Grouping all matches by text-id
    const matches = getAllMatches(pattern(), html)
    expect(matches.length).toEqual(17)

    const filesMatches = {
      'src/file1.js': matches,
      'src/file2.js': matches
    }

    const grBTxt = groupByText(filesMatches)
    expect(Object.keys(grBTxt).length).toEqual(14)
    expect(grBTxt['Translate this text'].files.length).toEqual(2)
    expect(grBTxt['Hi {name} 1!'].trans.comment).toEqual('This is a comment for the translator 1')

    // Build pot content and check...
    const content = potFileContent(grBTxt)

    expect(content).toEqual(`#: src/file1.js
#: src/file2.js
msgid "Translate this text"
msgstr ""

#: src/file1.js
#: src/file2.js
msgid "Hello {n}!"
msgstr ""

#: src/file1.js
#: src/file2.js
msgid "YYYY-MM-DD"
msgstr ""

#: src/file1.js
#: src/file2.js
msgid "{n}. Values from {f} to {t}"
msgstr ""

#. This is a comment for the translator 1
#. This is a comment for the translator duplicate
#: src/file1.js
#: src/file2.js
msgid "Hi {name} 1!"
msgstr ""

#. This is a comment for the translator 2
#: src/file1.js
#: src/file2.js
msgid "Hi {name} 2!"
msgstr ""

#. This is a comment for the translator 3
#: src/file1.js
#: src/file2.js
msgid "Hi {name} 3!"
msgstr ""

#. This is a comment for the translator 4
#: src/file1.js
#: src/file2.js
msgid "Hi {name} 4!"
msgstr ""

#: src/file1.js
#: src/file2.js
msgid "una noche 1"
msgid_plural "{n} noches 1"
msgstr[0] ""
msgstr[1] ""

#: src/file1.js
#: src/file2.js
msgid "una noche 2"
msgid_plural "{n} noches 2"
msgstr[0] ""
msgstr[1] ""

#: src/file1.js
#: src/file2.js
msgid "una noche 3"
msgid_plural "{n} noche's 3"
msgstr[0] ""
msgstr[1] ""

#. This is a comment 4
#: src/file1.js
#: src/file2.js
msgid "una noche 4"
msgid_plural "{n} noche's 4"
msgstr[0] ""
msgstr[1] ""

#. This is a comment 5
#: src/file1.js
#: src/file2.js
msgid "una noche 5"
msgid_plural "{n} noches 5"
msgstr[0] ""
msgstr[1] ""

#: src/file1.js
#: src/file2.js
msgid "Tom's house is very big"
msgstr ""

`)
  })

  it('stateless extracting', () => {
    const matches = getAllMatches(pattern(), stateless)
    expect(matches.length).toEqual(1)
    expect(matches[0].text).toEqual('Hello World')
    expect(matches[0].plural).toEqual(null)
    expect(matches[0].comment).toEqual(null)
  })

  it('oneWord extracting', () => {
    const matches = getAllMatches(pattern(), oneWord)
    expect(matches.length).toEqual(2)

    expect(matches[0].text).toEqual('굿')
    expect(matches[0].plural).toEqual(null)
    expect(matches[0].comment).toEqual(null)

    expect(matches[1].text).toEqual('A')
    expect(matches[1].plural).toEqual(null)
    expect(matches[1].comment).toEqual(null)
  })
})
