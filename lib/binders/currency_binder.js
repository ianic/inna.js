var inna = inna || {};

inna.CurrencyBinder = Class.create(inna.BinderBase, {

	initialize: function($super, element, object, property){
		
		$super(element, object, property);
		this.onModelChanged();
	},

  elementValue: function(){
    var value = parseFloat(this.element.value.toNumber());	
    return isNaN(value) ? this.modelValue() : value;		
  },
	
  propertyValue: function(){
    return this.modelValue().toCurrency(2);
  }
	
}); 
