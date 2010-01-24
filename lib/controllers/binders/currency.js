inna.controllers.binders.Currency = function(element, object, property){
  inna.controllers.binders.Base.call(this, element, object, property);
	
  this.elementValue = function(){
    var float = parseFloat(this.element.value.toNumber());
    return isNaN(float) ? this.readPropertyValue() : float;		
  }                                 
	
  this.propertyValue = function(){
    return this.readPropertyValue().toCurrency(2);
  }
	
  this.onModelChanged();
}; 
