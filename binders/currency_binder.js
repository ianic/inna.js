var inna = inna || {};

inna.currencyBinder = function(element, object, property){
	var that = {};
  inna.binderBase(that, element, object, property);
	
  that.elementValue = function(){
    var value = parseFloat(element.value.toNumber());
    return isNaN(value) ? that.modelValue() : value;		
  };
	
  that.propertyValue = function(){
    return that.modelValue().toCurrency(2);
  };
	
  that.onModelChanged();
	return that;
}; 
