inna.controllers.binders.Currency = function(element, object, property){
  inna.controllers.binders.BinderBase.call(this, element, object, property);
	
  this.elementValue = function(){
    var float = parseFloat(this.element.value.toNumber());
    return isNaN(float) ? this.propertyValue() : float;		
  }                                 
	
  this.propertyValue = function(){
    return this.modelValue().toCurrency(2);
  }
	
  this.onModelChanged();
}; 
