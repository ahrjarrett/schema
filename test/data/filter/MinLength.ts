import * as _ from "@fp-ts/schema/data/filter"
import * as D from "@fp-ts/schema/Decoder"
import * as P from "@fp-ts/schema/Pretty"
import * as S from "@fp-ts/schema/Schema"
import * as Util from "@fp-ts/schema/test/util"

describe.concurrent("minLength", () => {
  it("property tests", () => {
    Util.property(_.minLength(0)(S.string))
  })

  it("Guard", () => {
    const is = D.is(_.minLength(1)(S.string))
    expect(is("")).toEqual(false)
    expect(is("a")).toEqual(true)
    expect(is("aa")).toEqual(true)
  })

  it("Decoder", () => {
    const schema = _.minLength(1)(S.string)
    Util.expectDecodingSuccess(schema, "a")
    Util.expectDecodingSuccess(schema, "aa")
    Util.expectDecodingFailure(schema, "", `"" did not satisfy refinement({"minLength":1})`)
  })

  it("Pretty", () => {
    const pretty = P.pretty(_.minLength(0)(S.string))
    expect(pretty("a")).toEqual(`"a"`)
  })
})
