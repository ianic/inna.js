Function.prototype.memoized = function(key){ 
	this._values = this._values || {}; 
	return this._values[key] !== undefined ?
		this._values[key] : 
		this._values[key] = this.apply(this, arguments);
};

Function.prototype.memoize = function(){ 
	var fn = this; 
	return function(){
		return fn.memoized.apply( fn, arguments ); 
	};
};