var inna = inna || {};

inna.collectionBinder = function(options){
	return new inna.CollectionBinder(options);
};

inna.CollectionBinder = Class.create({

	initialize: function(options){

	  this.element   			= $(options.element);
	  this.key						= options.key;
	  this.template				= options.template;
	  this.controller			= options.controller;
	  this.model					= options.model;
    this.binders				= [];
		
		for(var i=0, max = this.model.countOfKey(this.key); i<max; i++){
			var item = this.model.objectInKeyAtIndex(this.key, i);
			this.addItem(item);
		}

		this.model.addObserver(this, this.key);
	},
  
	addItem:  function(item){
		var options = {
			element   				: this.element, 
			model							: item, 
			template					: this.template, 
			insert						: true, 
			controller				: this.controller
		};
		this.binders.push(inna.objectBinder(options));
	},

	observeValueForKey: function(model, key, options){
		if (options.type === "add"){
			this.addItem(options.object);
		}
		if (options.type === "remove"){
		  this.binders[options.index].remove();	
			this.binders.splice(options.index, 1);
		}
	},

	destroy: function(){
		this.model.removeObserver(this);
    this.binders.each(function(binder) { binder.destroy(); });    
    this.binders = [];
  }
	
});