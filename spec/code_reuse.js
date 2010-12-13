describe("code reuse patterns", function() {

  beforeEach(function() {});

  it("required methods", function() {
		expect(Object.create).toBeDefined();
  });

	it("using Object.create", function() {
		var o = { method1: function() { return 1;} };
		var o2 = Object.create(o, { prop1 : { value: 2 } });
		expect(o2.method1).toBeDefined();
		expect(o2.method1()).toBe(1);
		expect(o2.prop1).toBeDefined();
		expect(o2.prop1).toBe(2);
  });

  describe("sub spec", function() {
    beforeEach(function() { });

    it("pjeske", function() {
			var mixin1 = { method1: function(){}};
			var mixin2 = { method2: function(){}};
			var o = { prop1: 1, method3: function() {} };
			var base = {};
			Object.extend(base, mixin1);
			Object.extend(base, mixin2);
			var obj = Object.create(base);
			Object.extend(obj, o);

			expect(obj.method1).toBeDefined();
			expect(obj.method2).toBeDefined();
			expect(obj.method3).toBeDefined();
			expect(obj.prop1).toBeDefined();
    });

    it("power constructor", function() {
			var mixin1 = { method1: function(){} };
			var mixin2 = { method2: function(){} };
			var o = { prop1: 1, method3: function() {} };
			var baseCreations = 0;

			var powerConstructor = (function(){
				
				baseCreations += 1;
				var base = {};
				Object.extend(base, mixin1);
				Object.extend(base, mixin2);

				return function(props){
					var obj = Object.create(base);
					var priv = "private prop";
					Object.extend(obj, props);
					obj.fnPrivileded = function() { return priv; };
					return obj;					
				};
				
			}());

			var obj = powerConstructor(o);

			expect(obj.method1).toBeDefined();
			expect(obj.method2).toBeDefined();
			expect(obj.method3).toBeDefined();
			expect(obj.prop1).toBeDefined();

			var obj2 = powerConstructor();
			expect(baseCreations).toBe(1);
			expect(obj.prototype === obj2.prototype).toBeTruthy();
			
    });


  });

});