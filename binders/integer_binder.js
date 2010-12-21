var inna = inna || {};

inna.integerBinder = function(element, object, property){
	var that = {};
  inna.binderBase(that, element, object, property);
	
  that.elementValue = function(){                  
    var value = that.element.value.gsub(".", "");
    value = parseInt(value.toNumber());
    return isNaN(value) ? that.modelValue() : value;
  };
	
  that.propertyValue = function(){
    var value = that.modelValue();
    if (value || value == 0)
      return value.toCurrency(0);  
    else 
      return "";
  };
	
  that.onModelChanged();
	return that;
};
