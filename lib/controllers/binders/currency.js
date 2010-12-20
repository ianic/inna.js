inna.controllers.binders.Currency = function(element, object, property){
  inna.controllers.binders.BinderBase.call(this, element, object, property);
	
  this.elementValue = function(){
    var value = parseFloat(this.element.value.toNumber());
    return isNaN(value) ? this.modelValue() : value;		
  }                                 
	
  this.propertyValue = function(){
    return this.modelValue().toCurrency(2);
  }
	
  this.onModelChanged();
}; 
