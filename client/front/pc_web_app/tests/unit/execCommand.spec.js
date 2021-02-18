import { expect } from "chai";
import execCommand from "../../src/components/modules/editor/execCommand";

describe("execCommand", () => {
  it("return command name", () => {
    expect(execCommand("insertParagraph")).to.be.equal("insertParagraph");
  });
});
