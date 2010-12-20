var inna = inna || {};

inna.keyValueCollectionObserving = function(obj){

	obj.countOfKey = function(key){
		return (obj[key] || []).length;
	};

	obj.objectInKeyAtIndex = function(key, index){
		return obj[key][index];
	};

	obj.pushObjectInKey = function(key, object){
		var container = obj[key] = obj[key] || [];
		var index = container.length;
		container[index] = object;
		var handler = function(child, childKey, options){	
			Object.extend(options, {index: container.indexOf(object), object: child});
			obj.didChangeValue(key + "." + childKey, options);
		};
		object.addObserver(obj, null, { handler: handler.bind(obj)});
		obj.didChangeValue(key, {index: index, object: object, type: "add", value: container});
		return object;		
	};

	obj.removeObjectInKey = function(key, object){
		var container = obj[key] = obj[key] || [];
		var index = container.indexOf(object);
		obj.removeObjectInKeyAtIndex(key, index);
	};

	obj.removeObjectInKeyAtIndex = function(key, index){		
		var container = obj[key] = obj[key] || [];
		var object = container[index];
		obj[key].splice(index, 1);
		object.removeObserver(obj);
		obj.didChangeValue(key, {index: index , object: object, type: "remove", value: container});
	};

};

