should = require('should')
clone = require("../Utilities.js").clone

ContextData = require('../ContextData.js').ContextData
ContextManager = require('../ContextManager.js').ContextManager

context = new ContextData("TestContext")
cm = new ContextManager(context)

cm.should.exist

try

  participantCoupon = cm.JoinCommonContext("test")

  # verify that participant is properly added to context
  should.exist(participantCoupon)
  context.participants.should.have.length(1)
  context.participants[0].should.have.property("coupon",participantCoupon)

  contextCoupon = cm.StartContextChanges(participantCoupon)
  should.exist(contextCoupon)

  context.SetItemValues(participantCoupon, ["a","b"], [1, 2], contextCoupon)

  result = cm.EndContextChanges(contextCoupon)

  result.responses.should.not.be.empty

  cm.PublishChangesDecision(contextCoupon, "accept")

  context.GetItemValues(participantCoupon, ["a","b"]).should.eql([1,2])


  cm.LeaveCommonContext(participantCoupon)
  context.participants.should.have.length(0)



catch err
  console.log err