var inna = inna || {};

inna.createBinder = function(options){     
	var element		= $(options.element), 
	    object		= options.object,  
      property	= options.property,
	    type			= options.type;
	
  if (property.include(".")){   
    var parts = property.split('.');
    object = object[parts[0]];
    property = parts[1];                                                                        
  } 
  if (!type){
    if (typeof object[property] == "function")
      type = inna.helpers.getType(object[property]());
    else
      type = inna.helpers.getType(object[property]);
  }   
  switch(type.toLowerCase()){
    case 'date': 
      return inna.dateBinder(element, object, property);
    case 'number':
      return inna.currencyBinder(element, object, property);
    case 'integer':
      return inna.integerBinder(element, object, property);
    case 'select':  
      return new inna.controllers.binders.Select(element, object, property);
    case 'visible':  
      return new inna.controllers.binders.Visible(element, object, property);      
    case 'template':  
      return new inna.controllers.binders.Template(element, object, property);            
    case 'addremoveclass':  
      return new inna.controllers.binders.AddRemoveClass(element, object, property);            
    default:                                                                
      return inna.stringBinder(element, object, property);
  }
  
};

inna.binderBase = function(that, element, model, property){

  that.element  = element;                               
	that.model    = model;
  that.property = property || element.name || element.id;  

	var isInputElement = function(){
		return element.nodeName == "INPUT" ||
			element.nodeName == "SELECT" ||
			element.nodeName == "TEXTAREA";
	};
          
  var changingModel = false;

  that.onElementChanged = function(){   
		changingModel = true;
    if (that.property)
      model.setValueForKey(property, that.elementValue());
		changingModel = false;
  }; 
  
  if (that.onModelChanged === undefined) {
    that.onModelChanged = function(){
			if (changingModel){
				return;
			}

      if (property){
        if (element.value == null || element.nodeName == "LI"){
          element.update(that.propertyValue());
        } else {
          element.value = that.propertyValue();
        }                  
      }
    };                          
  }
    
	if (isInputElement()){
		Event.observe(element, 'change', that.onElementChanged.bindAsEventListener(that)); 
		Event.observe(element, 'keyup',  that.onElementChanged.bindAsEventListener(that)); 
	}

	if (model.addObserver){
		model.addObserver(that, property, {handler: that.onModelChanged.bind(that)});
	}
    
  that.propertyValue = function(){
    return that.modelValue();
  };                                           
  
  that.elementValue = function(){   
    return (element.value == null) ? element.innerHTML : element.value;
  }; 

  that.modelValue = function(){
		return (model.valueForKey) ? model.valueForKey(property) : model[property];
  };
  
  that.destroy = function(){
		if (isInputElement()){
			Event.stopObserving(element);
		}
    model.removeObserver(that);
  };

};                 
