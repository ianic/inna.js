
inna.controllers.binders.create = function(element, object, property, type){     
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
      return new inna.controllers.binders.Date(element, object, property);
    case 'number':
      return new inna.controllers.binders.Currency(element, object, property);
    case 'integer':
      return new inna.controllers.binders.Integer(element, object, property);
    case 'select':  
      return new inna.controllers.binders.Select(element, object, property);
    case 'visible':  
      return new inna.controllers.binders.Visible(element, object, property);      
    case 'template':  
      return new inna.controllers.binders.Template(element, object, property);            
    case 'addremoveclass':  
      return new inna.controllers.binders.AddRemoveClass(element, object, property);            
    default:                                                                
      return new inna.controllers.binders.String(element, object, property);
  }
  
};

inna.controllers.binders.BinderBase = function(htmlElement, model, modelProperty){

	this.isInputElement = function(){
		return this.element.nodeName == "INPUT" ||
			this.element.nodeName == "SELECT" ||
			this.element.nodeName == "TEXTAREA";
	};

  this.element = $(htmlElement);                               
  this.model = model;
  this.property = modelProperty || this.element.name || this.element.id;  
                                                               
  // var showHide = this.element.getAttribute("showHide");
  // if (showHide)
  //   if (this.model[showHide])
  //     this.showHide = showHide;
    
  this.onElementChanged = function(){   
		//console.log("onElementChanged value: " + this.element.value + " elemenetValue(): " + this.elementValue());
		this._changingModel = true;
    if (this.property)
      this.model.setValueForKey(this.property, this.elementValue());
		this._changingModel = false;
  }; 
  
  if (this.onModelChanged == undefined) {
    this.onModelChanged = function(){
      // if (this.showHide){
      //   this.model.getProperty(this.showHide) ? this.element.show() : this.element.hide();
      // }
			if (this._changingModel)
				return;

      if (this.property){
        if (this.element.value == null || this.element.nodeName == "LI"){
          this.element.update(this.propertyValue());
        } else {
          this.element.value = this.propertyValue();
        }                  
      }
    };                          
  }
    
	if (this.isInputElement()){
		Event.observe(this.element, 'change', this.onElementChanged.bindAsEventListener(this)); 
		Event.observe(this.element, 'keyup', this.onElementChanged.bindAsEventListener(this)); 
	}

	if (this.model.addObserver)
		this.model.addObserver(this, this.property, {handler: this.onModelChanged.bind(this)});
    
  this.propertyValue = function(){
    return this.modelValue();
  };                                           
  
  this.elementValue = function(){   
    if (this.element.value == null){
      return this.element.innerHTML;
    } else {    
      return this.element.value;
    }
  }; 

  this.modelValue = function(){
		if (this.model.valueForKey)
			return this.model.valueForKey(this.property);
		else
			return this.model[this.property];
  };
  
  this.destroy = function(){
		if (this.isInputElement())
			Event.stopObserving(this.element);
    this.model.removeObserver(this);
  };

	//za potrebe testiranja
  this.uiChanged = function(){
		this._binders.each(function(binder){
			binder.onElementChanged();
		});
	};

};                 
