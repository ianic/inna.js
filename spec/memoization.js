var isPrimeCalculated = false;

var isPrime = function( num ) { 
	var prime = num != 1; 
	for ( var i = 2; i < num; i++ ) {
		if ( num % i == 0 ) { 
			prime = false; 
			break;
		}
	}
	isPrimeCalculated = true;
	return prime; 
}.memoize();

describe("memoization spec", function() {

  it("should store memoized value", function() {
		isPrime(5);
		expect(isPrimeCalculated).toBeTruthy();
		isPrimeCalculated = false;
		isPrime(5);
		expect(isPrimeCalculated).toBeFalsy();
  });

});