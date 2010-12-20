String.prototype.toNumber = function(){
	var str = this.gsub(",", ".");
	if (str.length == 0)
		return 0;
	var parts = str.split(".");
	if (parts.length > 1){               
		var res = '';
		for(var i=0; i<parts.length-1; i++){
			res = res + parts[i];
		}                  
		return parseFloat(res + '.' + parts[parts.length - 1]);
	}		
	else
		return parseFloat(parts[0]);	
} 

String.prototype.isJSONDate = function(){
	return /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).*Z$/.match(this);
} 

String.prototype.toDate = function() {
	if (this.isJSONDate()){
		return Date.fromJSON(this);
	} else{
	  return null; 
	}		
}

String.prototype.toCurrency = function(decimalPlaces){
  return parseFloat(this).toCurrency();
}

String.prototype.toBezkvakiZaSort = function(){
	return this.toLowerCase().gsub('ž', 'zz').gsub('č', 'cw').gsub('ć', 'cz').gsub('š', 'sz').gsub('đ', 'dzz');
}

String.prototype.toBezkvaki = function(){
	return this.toLowerCase().gsub('ž', 'z').gsub('č', 'c').gsub('ć', 'c').gsub('š', 's').gsub('đ', 'd');
}

String.prototype.imaKvacice = function(){
	return this.include("ć") || this.include("č") || this.include("ž") || this.include("š") || this.include("đ");
}

String.prototype.bezkvakiZaSortCompare = function(other){
	return this.toBezkvakiZaSort().localeCompare(other.toBezkvakiZaSort());
}

String.prototype.toBezkvakiZaSearch = function(){
	var bezSpecZnakova =  this.toLowerCase().gsub(',', '').gsub('"', '').gsub("'", '');
	var keyWords = bezSpecZnakova.split(' ').map(function(e){ 
		if (e.length>0) {
			return e;}
	}).compact();
	var keyWordsBezNasih = [];
	keyWords.each(function(e){
		if (e.imaKvacice()){
			keyWordsBezNasih.push(e.toBezkvaki());
		}
	});
  return " " + keyWords.join(" ") + (keyWordsBezNasih.length > 0 ? " " + keyWordsBezNasih.join(" ") : "");
}