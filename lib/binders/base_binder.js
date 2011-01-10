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
    return new inna.DateBinder(element, object, property);
  case 'number':
    return new inna.CurrencyBinder(element, object, property);
  case 'integer':
    return new inna.IntegerBinder(element, object, property);
  case 'select':  
    return new inna.SelectBinder(element, object, property);
		// case 'visible':  
		//   return new inna.controllers.binders.Visible(element, object, property);      
  case 'template':  
    return new inna.TemplateBinder(element, object, property);            
		// case 'addremoveclass':  
		//   return new inna.controllers.binders.AddRemoveClass(element, object, property);            
  default:                                                                
    return new inna.StringBinder(element, object, property);
  }
  
};

inna.BinderBase = new Class.create({

	initialize: function(element, model, property){
		this.key = property;
		this.element  = element;                               
		this.model    = model;
		this.property = property || element.name || element.id;  
		this.changingModel = false;

		if (this.isInputElement()){
			Event.observe(element, 'keyup',  this.onElementChanged.bindAsEventListener(this)); 
			Event.observe(element, 'change', function() { 
				this.onElementChanged();
				this.onModelChanged();
			}.bindAsEventListener(this)); 
		}

		if (this.model.addObserver){
			this.model.addObserver(this, this.key, { handler: this.onModelChanged.bind(this) });
		}				
	},

	isInputElement : function(){
		return this.element.nodeName == "INPUT" ||
			this.element.nodeName == "SELECT" ||
			this.element.nodeName == "TEXTAREA";
	},
  
  onElementChanged: function(){   
		this.changingModel = true;
    if (this.key){
      this.model.setValueForKey(this.key, this.elementValue());
		}
		this.changingModel = false;
  },
  
  onModelChanged: function(){
		if (this.changingModel){
			return;
		}

    if (this.key){
      if (this.element.value == null || this.element.nodeName == "LI"){
        this.element.update(this.propertyValue());
      } else {
        this.element.value = this.propertyValue();
      }                  
    }
  },                          
  
	propertyValue: function(){
    return this.modelValue();
  },
  
  elementValue: function(){   
    return (this.element.value === null) ? this.element.innerHTML : this.element.value;
  },

  modelValue: function(){
		return (this.model.valueForKey) ? this.model.valueForKey(this.key) : this.model[this.key];
  },
  
  destroy: function(){
		if (this.isInputElement()){
			Event.stopObserving(this.element);
		}
    this.model.removeObserver(this);
  }

});                 
