Date.prototype.toString = function(){
	return this.getDate() + '.' + (this.getMonth() + 1) + '.' + this.getFullYear();
}      

//ianic slijedece dvije funkcije sam ja dodao
Date.fromJSON = function(json) {                                         
	try{
		parts = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/.exec(json);					
		return new Date(parts[1],parts[2]-1,parts[3],parts[4],parts[5],parts[6]);
	}
	catch(e){
		return null;		
	}
}                                                                                 
