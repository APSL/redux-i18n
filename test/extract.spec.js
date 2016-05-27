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
</div>
`

describe("extract texts", function() {
  it("extracting basic texts", function() {

    let matches = getAllMatches(pattern, html)

    expect(matches.length).toEqual(3)
    expect(matches[0]).toEqual("Translate this text")
    expect(matches[1]).toEqual("Hello {n}!")
    expect(matches[2]).toEqual("YYYY-MM-DD")
  })
})
