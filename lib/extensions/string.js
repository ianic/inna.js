String.prototype.toNumber = function(){
	var str = this.gsub(",", ".");
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
	return /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/.match(this);
} 

String.prototype.toDate = function() {
	if (this.isJSONDate()){
		return Date.fromJSON(this);
	} else{
	  return null; 
	}		
}
