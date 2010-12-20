var inna = inna || {};

inna.collectionBinder = function(options){

	var element   				= $(options.element),
	    key								= options.key,
	    template					= options.template,
	    controller				= options.controller,
	    model							= options.model,
      binders						= [],
	    obj								= {};
	
	var initBinding = function(){
		for(var i=0, max = model.countOfKey(key); i<max; i++){
			var item = model.objectInKeyAtIndex(key, i);
			addItem(item);
		}
		model.addObserver(obj, key);
	};
  
	var addItem =  function(item){
		var options = {
			element   				: element, 
			model							: item, 
			template					: template, 
			insert						: true, 
			controller				: controller
		};
		binders.push(inna.objectBinder(options));
	};

	obj.observeValueForKey = function(model, key, options){
		if (options.type === "add"){
			addItem(options.object);
		}
		if (options.type === "remove"){
		  binders[options.index].remove();	
			binders.splice(options.index, 1);
		}
	};

	obj.destroy = function(){
		model.removeObserver(obj);
    binders.each(function(binder) { binder.destroy(); });    
    binders = [];
  };  

	initBinding();

	return obj;

};