inna.controllers.binders.Integer = function(element, object, property){
  inna.controllers.binders.Base.call(this, element, object, property);
	
  this.elementValue = function(){                             
    var int = parseInt(this.element.value.toNumber());
    return isNaN(int) ? this.readPropertyValue() : int;
  }                                 
	
  this.propertyValue = function(){
    return this.readPropertyValue().toCurrency(0);
  }
	
  this.onModelChanged();
};
