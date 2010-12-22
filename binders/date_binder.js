var inna = inna || {};

inna.DateBinder = Class.create(inna.BinderBase, {
	

	initialize: function($super, element, object, property){
		$super(element, object, property);
		this.onModelChanged();
	},
	
  elementValue: function(){  
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
		return isNaN(date.valueOf()) ? this.propertyValue() : date; 
  },
	
  propertyValue: function(){  
    var date = this.modelValue();
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
  }
	
});
