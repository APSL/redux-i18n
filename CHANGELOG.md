# Changelog

## [unreleased]

[Fixed]

- Broken link. Thanks to _hussainshaikh12_ (https://github.com/APSL/redux-i18n/pull/163)

## 1.5.26 (2022-12-28)

- [Fixed] One-letter words are not extracted. Thanks to _kwangminini_ (https://github.com/APSL/redux-i18n/pull/162)

## 1.5.25

- [Fixed] Replace optimist with minimist. Thanks to _AndreeWille_ (https://github.com/APSL/redux-i18n/pull/150)
- [Removed] Demo and DemoCRA projects has been removed because it contains a lot of vulnerabilities. It will be moved to a separated repository.
- [Changed] Replaced Travis by GHA

## 1.5.24

- [Fixed] Fix interface definition for IGetTranslateFunctionResponse. Thanks to _JosephBrooksbank_ (https://github.com/APSL/redux-i18n/pull/137)

## 1.5.23

- [Fixed] Use react forceUpdate instead of deep-force-update. Thanks to _nicolascrop_ (https://github.com/APSL/redux-i18n/pull/130)

## 1.5.22

- Component lifecycles react17. Thanks to _uullrich_ (https://github.com/APSL/redux-i18n/pull/116)

## 1.5.21

- Use dynamic t function in HOC to rerender with new translations. Thanks to _bjackson_ (https://github.com/APSL/redux-i18n/pull/114)

## 1.5.20

- Some demoCRA packages upgraded for fix security alerts.

## 1.5.19

- Adds ability to suppress console warnings. Thanks to _erdemr_ (https://github.com/APSL/redux-i18n/pull/106)
- Support React.forwardRef(), React.memo() and latest react-redux. Thanks to _topaxi_ (https://github.com/APSL/redux-i18n/pull/103)
- Some security vulnerabilities fixed.

## 1.5.18

- Fix redux-thunk type definition for version 2.3.0. Thanks to _WhiteHatTux_ (https://github.com/APSL/redux-i18n/pull/102)

## 1.5.17

- Improve fallback handling. Thanks to _EvertEt_ (https://github.com/APSL/redux-i18n/pull/101)

## 1.5.16

- Updated some library versions of demo project for fix vulnerabilities.
- Fix plural fallback. Thanks to _EvertEt_ (https://github.com/APSL/redux-i18n/pull/100)
- react-deep-force-update package upgraded to 2.1.3 version.

## 1.5.15

- Warn when a translation is missing. Thanks to _aHerbots_ (https://github.com/APSL/redux-i18n/pull/96)
- Improve import multiline handling. Thanks to _EvertEt_ (https://github.com/APSL/redux-i18n/pull/97)

## 1.5.14

- Fallback language is stored to state. It's changable via setFallbackLanguage(lang) methοd. Thanks to _DimitrisD_ (https://github.com/APSL/redux-i18n/pull/93)
- Use singular translation if plural missing in .po. Thanks to _shizpi_ (https://github.com/APSL/redux-i18n/pull/83)

## 1.5.13

- Readme updated. Thanks to _jhta_ (https://github.com/APSL/redux-i18n/pull/76)
- Support multi-line strings. Thanks to _tuyakhov_ (https://github.com/APSL/redux-i18n/pull/80)

## 1.5.12

- Added explanation about .po format and rise exception when it's not set. Thanks to _Salec_ (https://github.com/APSL/redux-i18n/pull/72)
- Fix package.json on DemoCRA. Thanks to _karland_ (https://github.com/APSL/redux-i18n/pull/74)

## 1.5.11

- Documentation improved. Thanks to _karland_ (https://github.com/APSL/redux-i18n/pull/62, https://github.com/APSL/redux-i18n/pull/65, https://github.com/APSL/redux-i18n/pull/67)
- New demo app based in "create react app". Thanks to _karland_ (https://github.com/APSL/redux-i18n/pull/63, https://github.com/APSL/redux-i18n/pull/68)
- moment and react version upgraded.

## 1.5.10

- Test script updated for has been run on cross platform (windows, mac and linux). Run "npm install" before for install "cross-env".
- Plural forms, bug fixed.

## 1.5.9

- Added index.d.ts to package.json, and more tiny updates to index.d.ts. Thanks to _vasilevich_ (https://github.com/APSL/redux-i18n/pull/59)

## 1.5.8

- Made parameter propName optional in function localize. Thanks to _vasilevich_ (https://github.com/APSL/redux-i18n/pull/58)

## 1.5.7

- Added typescript typings file. Thanks to _vasilevich_ (https://github.com/APSL/redux-i18n/pull/57)

## 1.5.6

- Escape doublequotes. Thanks to _stayman_ (https://github.com/APSL/redux-i18n/pull/54)

## 1.5.5

- Documentation error for HOC. Thanks to _fhessenberger_ (https://github.com/APSL/redux-i18n/pull/48)
- Encoding setter. Thanks to _stayman_ (https://github.com/APSL/redux-i18n/pull/51)
- Isomorphic. Thanks to _stayman_ (https://github.com/APSL/redux-i18n/pull/52)
- Move translate behavior into an isolated import. Thanks to _TheActualWalko_ (https://github.com/APSL/redux-i18n/pull/53)

## 1.5.4

- Fix: use fallback lang translation if current lang is unknown. Thanks to _tagoro9_ (https://github.com/APSL/redux-i18n/pull/43)

## 1.5.3

- Allow react component interpolation. Thanks to _staymain_ (https://github.com/APSL/redux-i18n/pull/41)

## 1.5.2

- Multiple comments fix. Thanks to _stayman_ (https://github.com/APSL/redux-i18n/pull/40)

## 1.5.1

- _setTranslations_ now can merge translations. Thanks to _tagoro9_ (https://github.com/APSL/redux-i18n/pull/38)
- Extract regex improved. Thanks to _stayman_ (https://github.com/APSL/redux-i18n/pull/39)

## 1.5.0

- Localize Hoc method for translate your isolate components. Thanks to _stayman_ (https://github.com/APSL/redux-i18n/pull/34).
- Extract from múltiple folders. Thanks to _stayman_ (https://github.com/APSL/redux-i18n/pull/36).

## 1.4.0

- Fix deprecations with React 15.5. Thanks to _renchap_ (https://github.com/APSL/redux-i18n/pull/31).
- "fallbackLang" prop added. Read documentation (https://github.com/APSL/redux-i18n#usage)
- Build code minimized for reduce dist folder size.

## 1.3.2

- New parameter for "extract" action added (fexts). Take a look documentation (https://github.com/APSL/redux-i18n#extract-texts-and-build-templatepot). Thanks to _renchap_ for this idea (https://github.com/APSL/redux-i18n/issues/26).

## 1.3.1

- Updates extract strings regex. Tanks to _pablen_ (https://github.com/APSL/redux-i18n/pull/25).

## 1.3.0

- New _initialLang_ attribute added. Take a look to _Usage_ section.

## 1.2.2

- 'Extract' action and tests improved.

## 1.2.1

- English grammar improved in documentation. Thanks to _doei_ (https://github.com/APSL/redux-i18n/pull/19).

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

- Fix: don't naively force params to strings; instead, only perform string operations on string parameters. Thanks to _evandavis_ (https://github.com/APSL/redux-i18n/pull/16)

## 1.1.0

- Charset removed from POT header because is not necessary and POEdit showed an error.
- New feature. It is already possible use plurals.
- Unit tests improved and added more.

## 1.0.11

- Fix: make sure numbers passed to _t_ function via params object are converted to strings so .replace() won't fail. Thanks to _gannoncurran_ (https://github.com/APSL/redux-i18n/pull/15)

## 1.0.10

- Escapes any '$' characters passed to _t_ function via params object to prevent unexpected behavior with string.replace(). Thanks to _gannoncurran_ (https://github.com/APSL/redux-i18n/pull/14)

## 1.0.9

- Readme improved. Thanks to _mac200_ (https://github.com/APSL/redux-i18n/pull/8)
- New tests added.
- New "dowloads per month" badge added.
- New node versions added in travis configuration.
- Readme updated adding the requirements sections.

## 1.0.8

- Readme improved.

## 1.0.7

- Readme improved.
- Tests improved for the action of "extract".
- Now its posible add comments for a translator when _t_ function is called. Read the documentation.

## 1.0.6

- Immutable.js compatibility. Thanks to _tiii_ (https://github.com/APSL/redux-i18n/pull/5)

## 1.0.5

- Add the ability to specify _--pattern_ as a custom name for the translation function. Thanks to _evandavis_ (https://github.com/APSL/redux-i18n/pull/4/commits/9ebd28f5f4d47c8414fc3dcd18da05a5cee14575)

## 1.0.4

- Two dependencies fixed. Thanks to _evandavis_ (https://github.com/APSL/redux-i18n/issues/3).

## 1.0.3

- I18n component now it's the default import. Replace _import {I18n} from 'redux-i18n'_ for _import I18n from 'redux-i18n'_. Thanks to _evandavis_ (https://github.com/APSL/redux-i18n/issues/1).

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

- Added some parameters to _i18n_extract_ and _i18n_import_ scripts.
- Improved documentation.

## 0.0.1

- First commit
