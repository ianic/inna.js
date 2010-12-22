var inna = inna || {};

inna.IntegerBinder = Class.create(inna.BinderBase, {

	initialize: function($super, element, object, property){
		$super(element, object, property);
		this.onModelChanged();
	},
	
  elementValue: function(){                  
    var value = this.element.value.gsub(".", "");
    value = parseInt(value.toNumber());
    return isNaN(value) ? this.modelValue() : value;
  },
	
  propertyValue: function(){
    var value = this.modelValue();
    if (value || value == 0)
      return value.toCurrency(0);  
    else 
      return "";
  }	  

});
