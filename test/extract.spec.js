import {pattern} from "../bin/extract_pattern"
import expect from "expect"

let html = `
<div>
  <strong>Your current language, is: {this.props.lang}</strong><br/>
  {this.context.t("Translate this text")}<br/>
  {this.context.t("Hello {n}!", {n: "Cesc"})}<br/><br/>
  <button onClick={this.changeLanguage.bind(this)}>Change Language</button>
</div>
`

describe("extract texts", function() {
  it("extracting basic texts", function() {

    let found = []
    let m = null

    while ((m = pattern.exec(html)) !== null) {
      if (m.index === pattern.lastIndex) {
          pattern.lastIndex++;
      }
      found.push(m[1])
    }

    expect(found.length).toEqual(2)
    expect(found[0]).toEqual("Translate this text")
    expect(found[1]).toEqual("Hello {n}!")
  })
})
