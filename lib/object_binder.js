var inna = inna || {};

inna.objectBinder = function(options){
	var factory = new inna.ObjectBinderFactory(options);
	return new inna.Binders(factory.binders, factory.view);
};

inna.ObjectBinderFactory = Class.create({

  initialize: function(options){
		
		this.view					  = $(options.view);
    this.model					= options.model;
	  this.controller			= options.controller;
	  this.template				= options.template;
	  this.element   			= options.element;
    this.binders				= [];

		if(this.template){
			inna.renderHamlTemplate(this.element, this.template, null, this.model, options.insert);
			this.view = inna.findLastChildNode(this.element);    
		}

		this.bindActions();
		this.bindProperties();   

	},
		
  bindActions: function(){
		inna.findElements('[action]', this.view).each(function(e) {
			var action = e.getAttribute('action');
			var target = this.controller[action] ? this.controller : this.model[action] ? this.model : null;
			var fnHandler = function(event) { target[action](); return false; };
			if (target){        
				e.onclick = fnHandler;      
			}else{
				console.warn("bindActions - no method in controller or model for action: " + action);
			}              
		}.bind(this)); 
	},
  
	bindProperties: function(){      
		inna.findElements('[property]',   this.view).each(function(element) { this.bindProperty(element);   }.bind(this));
		inna.findElements('[collection]', this.view).each(function(element) { this.bindCollection(element); }.bind(this));
	},

	bindProperty: function(element){
		this.binders.push(
			inna.createBinder({
				element					: element, 
				object					: this.model, 
				property				: element.getAttribute("property"), 
				type						: element.getAttribute("binderType")
			})
		); 
	},

	bindCollection: function(element){ 
		element.update('');
		this.binders.push(inna.collectionBinder({
			key								: element.getAttribute('collection'),
			template					: element.getAttribute('template'),
			model							: this.model,
			element						: element,
			controller				: this.controller
		}));    
	}
});

inna.Binders = Class.create({
	
	initialize: function(binders, view){
		this.binders = binders;
		this.view = view;		
	},
  
  destroy : function(){
    this.binders.each(function(binder) { binder.destroy(); });    
    this.binders = [];
  },

	remove : function(){
		this.destroy();
		this.view.remove();
	},
  
	updateBinders : function(){
    this.binders.each(function(binder) { if (binder.update) { binder.update();} });
  }
  
});