import {pattern, getAllMatches, potFileContent, groupByText} from '../bin/extract_utils'
import expect from 'expect'

const html = `
<div>
  <strong>Your current language, is: {this.props.lang}</strong><br/>
  {this.context.t("Translate this text")}<br/>
  {translate("Also translate this text")}<br/>
  {this.context.t('Hello {n}!', {n: 'Cesc'})}<br/><br/>
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

  <div>{this.context.t('Hi {name}!', { name: 'Cesc' }, 'This is a comment for the translator')}</div>
  <div>{this.context.t('Hi {name}!', { name: 'Cesc' },'This is a comment for the translator')}</div>
  <div>{this.context.t('Hi {name}!', {}, 'This is a comment for the translator')}</div>
</div>
`

const stateless = `
const Foo = ({}, context) => <h1>{context.t("Hello World")}</h1>
`

describe('extract texts', () => {
  it('extracting basic texts', () => {

    const matches = getAllMatches(pattern(), html)

    expect(matches.length).toEqual(7)
    expect(matches[0].text).toEqual('Translate this text')
    expect(matches[1].text).toEqual('Hello {n}!')
    expect(matches[2].text).toEqual('YYYY-MM-DD')
    expect(matches[3].text).toEqual('{n}. Values from {f} to {t}')
    expect(matches[4].text).toEqual('Hi {name}!')
    expect(matches[4].comment).toEqual('This is a comment for the translator')
  });

  it('accepts a custom getText function name', () => {

    const matches = getAllMatches(pattern('(?:translate|\\bt)'), html);

    expect(matches.length).toEqual(8)
    expect(matches[0].text).toEqual('Translate this text')
    expect(matches[1].text).toEqual('Also translate this text')
    expect(matches[2].text).toEqual('Hello {n}!')
    expect(matches[3].text).toEqual('YYYY-MM-DD')
    expect(matches[4].text).toEqual('{n}. Values from {f} to {t}')
  });

  it('check pot file content', () => {

    // Grouping all matches by text-id
    const matches = getAllMatches(pattern(), html)
    expect(matches.length).toEqual(7)

    const filesMatches = {
      'src/file1.js': matches,
      'src/file2.js': matches
    }

    const grBTxt = groupByText(filesMatches)
    expect(Object.keys(grBTxt).length).toEqual(5)
    expect(grBTxt['Translate this text'].files.length).toEqual(2)
    expect(grBTxt['Hi {name}!'].trans.comment).toEqual('This is a comment for the translator')

    // Build pot content and check...
    const content = potFileContent(grBTxt)
    expect(content).toEqual('#: src/file1.js\n\
#: src/file2.js\n\
msgid "Translate this text"\n\
msgstr ""\n\
\n\
#: src/file1.js\n\
#: src/file2.js\n\
msgid "Hello {n}!"\n\
msgstr ""\n\
\n\
#: src/file1.js\n\
#: src/file2.js\n\
msgid "YYYY-MM-DD"\n\
msgstr ""\n\
\n\
#: src/file1.js\n\
#: src/file2.js\n\
msgid "{n}. Values from {f} to {t}"\n\
msgstr ""\n\
\n\
#. This is a comment for the translator\n\
#: src/file1.js\n\
#: src/file2.js\n\
msgid "Hi {name}!"\n\
msgstr ""\n\n')

  });

  it('stateless extracting', () => {
    const matches = getAllMatches(pattern(), stateless)
    expect(matches.length).toEqual(1)
    expect(matches[0].text).toEqual('Hello World')
  })

})
