Array.prototype.sortStringBezkvaki = function(){
	var sortFn = function(a,b){
		return a.toString().bezkvakiZaSortCompare(b.toString());
	}
	this.sort(sortFn);
}

Array.prototype.sortObjectBezkvaki = function(key){
	var sortFn = function(a, b){
		return a[key].toString().bezkvakiZaSortCompare(b[key].toString());
	}
	this.sort(sortFn);
}