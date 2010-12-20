var inna = inna || {};
inna.ObjectBinder = function(options){
  
	Object.extend(this, options);
	this.view = $(this.view);

	if(options.template){
		inna.controllers.binders.renderHamlTemplate(options.rootElement, options.template, null, options.model, options.insert);
    this.view = inna.findLastChildNode(options.rootElement);    
	}
  this._binders = [];  

  this.bindCollection = function(collectionRoot, object){ 
		var key = collectionRoot.getAttribute('collection');
		var template = collectionRoot.getAttribute('template') || collectionName;
    if (!template)
      return;
    collectionRoot.update(''); 

		this._binders.push(new inna.CollectionBinder({
			key: key,
			template: template,
			model: object,
			element: collectionRoot,
			controller: this.controller
		}));    
  };  
  
  this.bindObject = function(){   
		this.bindActions(this.view, this.model);
    this.bindProperties(this.view, this.model);    
  }; 
  
  this.bindProperties = function(rootElement, object){      
    inna.findElements('[property]', rootElement).each(function(e) { 
			this.bindProperty(e, object);
    }.bind(this));
		inna.findElements('[collection]', rootElement).each(function(e) { 
			this.bindCollection(e, object);
    }.bind(this));
  };

  this.bindProperty = function(e, object){
    this._binders.push(inna.controllers.binders.create(e, object, e.getAttribute("property"), e.getAttribute("binderType"))); 
	};
  
  this.bindActions = function(rootElement, object){
    var controller = this.controller;
    var model = this.model;
    
    inna.findElements('[action]', rootElement).each(function(e) {
      var action = e.getAttribute('action');
      var params = { object: object, element: rootElement };
      var target = controller[action] ? controller : model[action] ? model : null;
      var fnHandler = function(event) { target[action](event, params); return false; };
      if (target){        
        e.onclick = fnHandler;      
      }else{
        console.warn("bindActions - no method in controller or model for action: " + action);
      }              
    }); 
  };
  
  this.destroy = function(){
    this._binders.each(function(binder) { binder.destroy(); });    
    this._binders = [];
  }; 

	this.remove = function(){
		this.destroy();
		this.view.remove();
	},
  
  this.updateBinders = function(){
    this._binders.each(function(binder) { if (binder.update) { binder.update();} });
  };
  
	//za potrebe testiranja
  this.uiChanged = function(element){
		this._binders.each(function(binder){
			if (binder.element == element){
				binder.onElementChanged();
			}
		});
	};

  this.bindObject();  
};

inna.CollectionBinder = function(options){

	Object.extend(this, options);
	this.element = $(this.element);
	this._binders = [];	
	//this.model.addObserver(this, this.key);

	//FIXME - ova funkcija bi mogla biti private
	this.initBinding = function(){
		//var collection = this.model.valueForKey(this.key);
		//var collection = this.model[this.key];
		for(var i=0, max=this.model.countOfKey(this.key); i<max; i++){
			var item = this.model.objectInKeyAtIndex(this.key, i);
			this.addItem(item);
		}
		this.model.addObserver(this, this.key);
	};
  
  //FIXME - ova funkcija bi mogla biti private
	this.addItem =  function(item){
		var options = {
			rootElement: this.element, 
			model: item, 
			template: this.template, 
			insert: true, 
			controller: this.controller
		};
		this._binders.push(new inna.ObjectBinder(options));
	};

	this.observeValueForKey = function(model, key, options){
		if (options.type === "add"){
			this.addItem(options.object);
		}
		if (options.type === "remove"){
		  this._binders[options.index].remove();	
			this._binders.splice(options.index, 1);
		}
	};

	this.destroy = function(){
		this.model.removeObserver(this);
    this._binders.each(function(binder) { binder.destroy(); });    
    this._binders = [];
  };  

	this.initBinding();

};