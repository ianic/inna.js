Date.prototype.toString = function(format){
  switch(format){
    case "time":
      return (this.getHours() < 10 ?  "0" + this.getHours() : this.getHours()) + ":" + (this.getMinutes() < 10 ?  "0" + this.getMinutes() : this.getMinutes());
    case "dateTime":
      return this.getDate() + '.' + (this.getMonth() + 1) + '.' + this.getFullYear() + ' ' + this.getHours() + ":" + this.getMinutes();
    case "shortDateTime":                                                    
      return this.toString('shortDate') + ' ' + this.toString('time'); 
    case "shortDateTimeWithSeconds":  
      return this.toString('shortDate') + ' ' + this.toString('time') + ':' + (this.getSeconds() < 10 ?  "0" + this.getSeconds() : this.getSeconds());      
    case "shortDate":                                                    
      return this.getDate() + '.' + (this.getMonth() + 1);      
    case "day":
      switch(this.getDay()){
        case 0: return "ned";
        case 1: return "pon";
        case 2: return "uto";
        case 3: return "sri";
        case 4: return "čet";
        case 5: return "pet";
        case 6: return "sub";
      }
    case "dayShortDate": 
      return this.toString("day") + " " + this.toString("shortDate");
    default:
      return this.getDate() + '.' + (this.getMonth() + 1) + '.' + this.getFullYear();
  }     
};              
                             
Date.prototype.toDate = function(){
  return new Date(this.getFullYear(), this.getMonth(), this.getDate());
}                                                                      

Date.prototype.addDays = function(days){
  this.setTime(this.getTime() + days * 1000 * 60 * 60 * 24);
  return this;
};

Date.fromJSON = function(json) {                                         
  try{        
    if (json.length == 10){
      parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(json);
      return new Date(Date.UTC(parts[1],parts[2]-1,parts[3],0,0,0));
    }else{
      parts = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).*Z$/.exec(json);
      return new Date(Date.UTC(parts[1],parts[2]-1,parts[3],parts[4],parts[5],parts[6]));
    }
  }
  catch(e){
    return null;    
  }
};                                                                                 

Date.toDateOrDefault = function(input, defaultDate){
  return (typeof input == "string") ? Date.fromJSON(input) : input || defaultDate || new Date(); 
};
