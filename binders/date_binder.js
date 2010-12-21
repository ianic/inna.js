var inna = inna || {};

inna.dateBinder = function(element, object, property){
	var that = {};
  inna.binderBase(that, element, object, property);
	
  that.elementValue = function(){  
	  var value = that.element.value.strip();
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
		return isNaN(date.valueOf()) ? that.propertyValue() : date; 
  };
	
  that.propertyValue = function(){  
    var date = that.modelValue();
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
  };
	
  that.onModelChanged();
	return that;
};
