
inna.controllers.binders.Integer = function(element, object, property){
  inna.controllers.binders.BinderBase.call(this, element, object, property);
	
  this.elementValue = function(){                  
    var value = this.element.value.gsub(".", "");
    value = parseInt(value.toNumber());
		//return value;
    return isNaN(value) ? this.modelValue() : value;
  };
	
  this.propertyValue = function(){
    var value = this.modelValue();
    if (value || value == 0)
      return value.toCurrency(0);  
    else 
      return "";
  };
	
  this.onModelChanged();
};
