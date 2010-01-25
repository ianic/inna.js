inna.controllers.binders.create = function(element, object, property, type){     
  if (property.include(".")){   
    var parts = property.split('.');
    object = object[parts[0]]
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
			return new inna.controllers.binders.Date(element, object, property);
		case 'number':
			return new inna.controllers.binders.Currency(element, object, property);
		case 'integer':
			return new inna.controllers.binders.Integer(element, object, property);
		default:	                                                          
			return new inna.controllers.binders.String(element, object, property);
	}
};

inna.controllers.binders.BinderBase = function(htmlElement, model, modelProperty){
  this.element = $(htmlElement);                               
  this.model = model;
  this.property = modelProperty || this.element.name || this.element.id;
  
  this.onElementChanged = function(){		
    this.model.setProperty(this.property, this.elementValue());
  }                       
  
  this.onModelChanged = function(){
    if (this.element.value == null){
      this.element.update(this.propertyValue());
		} else {
      this.element.value = this.propertyValue();
		}
  }    
  
  Event.observe(this.element, 'change', this.onElementChanged.bindAsEventListener(this)); 
	//ne mogu u testovima dignuti change event, pa se stog slusa jos jedan custom (prototype book p.124)
	Event.observe(this.element, 'test:change', this.onElementChanged.bindAsEventListener(this)); 
	inna.notificationCenter.addObserver(this, this.model, 'changed', this.onModelChanged.bind(this));
        
  this.propertyValue = function(){
    return this.modelValue();
  }                                            
	
  this.elementValue = function(){   
		if (this.element.value == null){
			return this.element.innerHTML;
		} else {		
    	return this.element.value;
		}
  } 

	this.modelValue = function(){
    return this.model.getProperty(this.property);
  }                                    
	                     	
  this.onModelChanged();    
};                 
