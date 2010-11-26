describe("demo spec", function() {

  beforeEach(function() {});

  it("jedan bi tebalo biti jedan", function() {
		expect(1).toMatch(1);
  });

  describe("sub spec", function() {
    beforeEach(function() { });

    it("ovdje vazi isto", function() {
			expect(1).toMatch(1);
    });
  });

});