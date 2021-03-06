// Generated by CoffeeScript 1.6.1
(function() {
  var ContextData, ContextManager, clone, should;

  should = require('should');

  clone = require("../Utilities.js").clone;

  ContextData = require('../ContextData.js').ContextData;

  ContextManager = require('../ContextManager.js').ContextManager;

  describe('ContextManager', function() {
    return it('should workd', function(done) {
      var cm, context, contextCoupon, participantCoupon;
      context = new ContextData("TestContext");
      cm = new ContextManager(context);
      cm.should.exist;
      participantCoupon = cm.JoinCommonContext("test");
      should.exist(participantCoupon);
      context.participants.should.have.length(1);
      context.participants[0].should.have.property("coupon", participantCoupon);
      contextCoupon = cm.StartContextChanges(participantCoupon);
      should.exist(contextCoupon);
      context.SetItemValues(participantCoupon, ["a", "b"], [1, 2], contextCoupon);
      cm.EndContextChanges(contextCoupon).then(function(result) {
        result.responses.should.be.empty;
        return done();
      });
      cm.PublishChangesDecision(contextCoupon, "accept");
      context.GetItemValues(participantCoupon, ["a", "b"]).should.eql([1, 2]);
      cm.LeaveCommonContext(participantCoupon);
      return context.participants.should.have.length(0);
    });
  });

}).call(this);
