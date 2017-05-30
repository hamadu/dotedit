import assert from 'assert'
import ToolSet from "/src/model/tool/toolSet"

describe('selectTool', function () {
  const toolSet = ToolSet.getInstance()

  it('select Rect tool', function () {
    toolSet.selectToolByName('Rect')
    assert.equal(toolSet.currentTool.name, 'Rect')
  })

  it('select no exists tool', function () {
    toolSet.selectToolByName('SomeWrongToolName')
    assert.equal(toolSet.currentTool.name, 'Rect')
  })

  it('select Rect tool again', function () {
    toolSet.selectToolByName('Rect')
    assert.equal(toolSet.currentTool.name, '*Rect*')
  })
})
