inna.controllers.binders.Integer = function(element, object, property){
  inna.controllers.binders.BinderBase.call(this, element, object, property);
	
  this.elementValue = function(){                             
    var int = parseInt(this.element.value.toNumber());
    return isNaN(int) ? this.propertyValue() : int;
  }                                 
	
  this.propertyValue = function(){
    return this.modelValue().toCurrency(0);
  }
	
  this.onModelChanged();
};
