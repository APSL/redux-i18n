# Changelog

## 1.2.2 (Not created yet)

## 1.2.1 
- English grammar improved in documentation. Thanks to *doei* (https://github.com/APSL/redux-i18n/pull/19).

## 1.2.0
- Now is possible use reducer for store your translations. You can load async translations and then store there. Read documentation https://github.com/APSL/redux-i18n#async-translations
- Documentation updated for explain how use html object as a param. (https://github.com/APSL/redux-i18n#html-object-as-parameter) 

## 1.1.5
- Changelog format improved.
- Documentation improved.
- Now is possible use html object as parameter. Read documentation https://github.com/APSL/redux-i18n#html-object-as-parameter

## 1.1.4
- Fall back lang. Read documentation https://github.com/APSL/redux-i18n#changing-language

## 1.1.3
- Fixed import action when there was quotes.
- Demo app added. 

## 1.1.2
- Some tests added.
- Now is possible use complex languages codes as "en-DE".

## 1.1.1
- Fix: don't naively force params to strings; instead, only perform string operations on string parameters. Thanks to *evandavis* (https://github.com/APSL/redux-i18n/pull/16)

## 1.1.0

- Charset removed from POT header because is not necessary and POEdit showed an error.
- New feature. It is already possible use plurals.
- Unit tests improved and added more.

## 1.0.11

- Fix: make sure numbers passed to *t* function via params object are converted to strings so .replace() won't fail. Thanks to *gannoncurran* (https://github.com/APSL/redux-i18n/pull/15)

## 1.0.10

- Escapes any '$' characters passed to *t* function via params object to prevent unexpected behavior with string.replace(). Thanks to *gannoncurran* (https://github.com/APSL/redux-i18n/pull/14)

## 1.0.9

- Readme improved. Thanks to *mac200* (https://github.com/APSL/redux-i18n/pull/8)
- New tests added.
- New "dowloads per month" badge added.
- New node versions added in travis configuration.
- Readme updated adding the requirements sections.

## 1.0.8

- Readme improved.

## 1.0.7

- Readme improved.
- Tests improved for the action of "extract".
- Now its posible add comments for a translator when *t* function is called. Read the documentation.

## 1.0.6

- Immutable.js compatibility. Thanks to *tiii* (https://github.com/APSL/redux-i18n/pull/5)

## 1.0.5

- Add the ability to specify *--pattern* as a custom name for the translation function. Thanks to *evandavis* (https://github.com/APSL/redux-i18n/pull/4/commits/9ebd28f5f4d47c8414fc3dcd18da05a5cee14575)

## 1.0.4

- Two dependencies fixed. Thanks to *evandavis* (https://github.com/APSL/redux-i18n/issues/3).

## 1.0.3

- I18n component now it's the default import. Replace *import {I18n} from 'redux-i18n'* for *import I18n from 'redux-i18n'*. Thanks to *evandavis* (https://github.com/APSL/redux-i18n/issues/1).

## 1.0.2

- Replaced with single quotes the translation.js file.

## 1.0.1

- Eslint check added in test.
- Regexp of extract script improved. Now can extract texts inside single quotas.
- Tests run on dist libraries. Not over the sources.

## 1.0.0

- The package's version is increased because it's stable.

## 0.0.8

- Extract regexp bug fixed.

## 0.0.7

- Added "files" attribute in package.json.

## 0.0.6

- Documentation updated with an example with dates translated.
- New tests with date formats.

## 0.0.5

- Added Unit tests.

## 0.0.4

- Redux state and action added.
- Improved documentation.

## 0.0.3

- Improved documentation of contributed file.
- Performance improvement

## 0.0.2

- Added some parameters to *i18n_extract* and *i18n_import* scripts.
- Improved documentation.

## 0.0.1

- First commit