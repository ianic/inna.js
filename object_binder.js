var inna = inna || {};

inna.objectBinder = function(options){
  
	var view							= $(options.view),
	    model							= options.model,
	    controller				= options.controller,
	    template					= options.template,
	    element   				= options.element,
     	binders						= [],
    	obj               = {};
	
	if(template){
		inna.controllers.binders.renderHamlTemplate(element, template, null, model, options.insert);
    view = inna.findLastChildNode(element);    
	}
  
  var bindActions = function(){
    inna.findElements('[action]', view).each(function(e) {
      var action = e.getAttribute('action');
      var target = controller[action] ? controller : model[action] ? model : null;
      var fnHandler = function(event) { target[action](); return false; };
      if (target){        
        e.onclick = fnHandler;      
      }else{
        console.warn("bindActions - no method in controller or model for action: " + action);
      }              
    }); 
  };
    
  var bindProperties = function(){      
    inna.findElements('[property]', view).each(function(element)   { bindProperty(element);   });
		inna.findElements('[collection]', view).each(function(element) { bindCollection(element); });
  };

  var bindProperty = function(element){
    binders.push(
			inna.controllers.binders.create(
				element, 
				model, 
				element.getAttribute("property"), 
				element.getAttribute("binderType")
			)
		); 
	};

  var bindCollection = function(element){ 
    element.update('');
		binders.push(inna.collectionBinder({
			key								: element.getAttribute('collection'),
			template					: element.getAttribute('template'),
			model							: model,
			element						: element,
			controller				: controller
		}));    
  };  
    
  obj.destroy = function(){
    binders.each(function(binder) { binder.destroy(); });    
    binders = [];
  }; 

	obj.remove = function(){
		obj.destroy();
		view.remove();
	},
  
  obj.updateBinders = function(){
    binders.each(function(binder) { if (binder.update) { binder.update();} });
  };
  
	bindActions();
  bindProperties();    

	return obj;
};