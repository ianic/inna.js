inna.models.ModelBase = function(parent){
	
  this.__parent = parent;  
                        
	this.setProperty = function(name, value){
		var setFunctionName = this.setPropertyFunctionName(name);
		if (typeof this[setFunctionName] == 'function'){
			this[setFunctionName](value);
		}else{
			this[name] = value;
		}
		this.changed();
	}                                                                 
	
	this.setPropertyFunctionName = function(name){
		return "set" + name[0].capitalize() + name.substring(1);
	}
	
	this.getProperty = function(name){
		if (typeof this[name] == 'function'){
			return this[name]();
		}else{
			return this[name];
		}
	}
	
  this.childChanged = function(){ 	
		this.changed();		
	}
  
  this.changed = function(){
		this.pushNotification('changed', this);
    if (this.__parent != null){
      this.__parent.childChanged();
		}
  }    

  this.pushNotification = function(eventName, data){
		inna.notificationCenter.pushNotification(this, eventName, data);  
		if (eventName != 'changed')
			this.pushNotification('changed', this);
	}

  this.decodeJsonDates = function(){
    for(prop in this){      
      if (inna.helpers.getType(prop) == "string"){
				if (prop.isJSONDate()){
				  prop =  Date.fromJSON(prop);     
				}
			}
    } 				
  } 
	
  this.save = function(){
    if (!this.__parent){
      inna.db.save(this);
		}
  }                       
		
  this.decodeJsonDates(this);     

 	for(prop in this){
		if (inna.helpers.getType(this[prop]) == 'Array'){
			this[prop].each(function(item){
				inna.models.ModelBase.call(item, this);
			}.bind(this));			
		}
	}

}