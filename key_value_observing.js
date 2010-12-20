var inna = inna || {};

inna.keyValueObserving = function(obj){
	
	var observers = [], dependentKeys = {};

	/**
  * key - read only
	* dependsOn - string or Array of keys on wich key depends
  **/
	obj.defineDependentKey = function(key, dependsOn){
		var add = function(changing){
			dependentKeys[changing] = dependentKeys[changing] || [];
			dependentKeys[changing].push(key);
		};
		if (Object.isArray(dependsOn)){
			var i = dependsOn.length;
			while(i--){
				add(dependsOn[i]);
			}
		}else{
			add(dependsOn);
		}
	};

	obj.addObserver = function(inspector, key, options){			
		options = options || {};
		key = key || null;
		observers.push({inspector: inspector, key: key, options: options});
	};

  obj.removeObserver = function(inspector, key) {
    key = key || null;
    var i = observers.length;
    while (i--) {
			var observer = observers;
      if (observer.inspector === inspector && (observer.key === key || key === null)) {
        observers.splice(i, 1);
        return;
      }
    }
  };
  
  obj.didChangeValue = function(key, options) {
		console.log("didChangeValue key:" + key);
    var i = observers.length;
    while (i--) {
      var observer = observers[i];
      if (observer.key === key || observer.key === null || key === null){
				if (observer.options.handler){
					observer.options.handler(obj, key, options);
				}else{
					if (observer.inspector.observeValueForKey){
						observer.inspector.observeValueForKey(obj, key, options);
					}
				}
			}
    }
		if (dependentKeys[key]){
			var j = dependentKeys[key].length;
			while(j--){				
				var dependentKey = dependentKeys[key][j];
				obj.didChangeValue(dependentKey, { value: obj.valueForKey(dependentKey) });
			}
		}
		if (obj.onValueForKeyChanged){
			obj.onValueForKeyChanged(key, options);
		}			
  };

	obj.removeObservers = function() {
    observers= [];
  };

	return obj;

};
