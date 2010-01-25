inna.controllers.binders.Date = function(element, object, property){
  inna.controllers.binders.BinderBase.call(this, element, object, property);
	
  this.elementValue = function(){  
	  var value = this.element.value.strip();
		var defaultDate = new Date(); 
		var date = defaultDate;
		if (value.startsWith("+") || value.startsWith("-")){
			date = new Date(defaultDate.getFullYear(), defaultDate.getMonth(), defaultDate.getDate() + parseInt(value));
		}		
	  else
		{
	    var parts = value.split('.');	    
	    var day = parts[0] || defaultDate.getDate();
	    var month = parts[1] || defaultDate.getMonth() + 1;
	    var year = parts[2] || defaultDate.getFullYear();
	    date = new Date(year, month - 1, day);                         			    
		}                                                                       
		return isNaN(date.valueOf()) ? this.readPropertyValue() : date; 
  }                                 
	
  this.propertyValue = function(){  
    var date = this.readPropertyValue();
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
  }
	
  this.onModelChanged();
};
