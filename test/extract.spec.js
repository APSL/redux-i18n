import {pattern, getAllMatches} from "../bin/extract_utils"
import expect from "expect"

let html = `
<div>
  <strong>Your current language, is: {this.props.lang}</strong><br/>
  {this.context.t("Translate this text")}<br/>
  {this.context.t("Hello {n}!", {n: "Cesc"})}<br/><br/>
  <button onClick={this.changeLanguage.bind(this)}>Change Language</button>
  <div>
    {sample.format(this.context.t("YYYY-MM-DD"))}
  </div>

  <CustomComponent
    title={this.context.t("{n}. Values from {f} to {t}", {
      f: "11/11/1111",
      t: "22/22/2222",
      n: index
    })}
  />
</div>
`

describe("extract texts", function() {
  it("extracting basic texts", function() {

    let matches = getAllMatches(pattern, html)

    expect(matches.length).toEqual(4)
    expect(matches[0]).toEqual("Translate this text")
    expect(matches[1]).toEqual("Hello {n}!")
    expect(matches[2]).toEqual("YYYY-MM-DD")
    expect(matches[3]).toEqual("{n}. Values from {f} to {t}")
  })
})
