// Generated by CoffeeScript 1.3.3
(function() {
  var Q, delay, f, i, obj, obj2, should, sobj, _fn, _i;

  should = require('should');

  f = require("../Utilities.js").formatter;

  Q = require('q');

  should.exist(f);

  obj = {
    a: 1,
    b: "two",
    c: true,
    d: [10, 20, 30]
  };

  sobj = f.generateObject(obj);

  obj2 = f.parseObject(sobj);

  obj2.should.have.property("a", obj.a.toString());

  obj2.should.have.property("b", obj.b.toString());

  obj2.should.have.property("c");

  obj2.d.should.have.length(3);

  _fn = function(i) {
    return obj2.d[i].should.eql(obj.d[i].toString());
  };
  for (i = _i = 0; _i <= 2; i = ++_i) {
    _fn(i);
  }

  delay = function(ms) {
    var deferred;
    deferred = Q.defer();
    setTimeout((function() {
      return deferred.resolve("done");
    }), ms);
    return deferred.promise;
  };

  Q.all(delay(2000)).then(console.log);

}).call(this);
