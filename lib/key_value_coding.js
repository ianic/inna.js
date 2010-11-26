var inna = inna || {};

//inna.KeyValueCoding = new JS.Module({
inna.KeyValueCoding = {

	valueForKey: function(key){
		if (key.indexOf(".") > 0){
			var keys = key.split(".");
			return this[keys[0]].valueForKey(keys[1]);
		}
		if (typeof this[key] == "function")
			return this[key]();
		else
			return this[key];
	},

	setValueForKey: function(key, value){
		var oldValue = this.valueForKey(key);
		if (key.indexOf(".") > 0){
			var keys = key.split(".");
			this[keys[0]].setValueForKey(keys[1], value);
		}else{
			this[key] = value;
		}
		this.didChangeValue(key, {oldValue: oldValue, value: this.valueForKey(key)});
	},

	addObserver: function(inspector, key, options){			
		this.__observers__ = this.__observers__ || [];
		options = options || {};
		this.__observers__.push({inspector: inspector, key: key || null, options: options});
	},

  removeObserver: function(inspector, key) {
    this.__observers__ = this.__observers__ || [];
    key = key || null;
    var i = this.countObservers();
    while (i--) {
			var observer = this.__observers__[i];
      if (observer.inspector === inspector && observer.key === key) {
        this.__observers__.splice(i, 1);
        return;
      }
    }
  },
      
  didChangeValue: function(key, options) {		
    var i = this.countObservers();
    while (i--) {
      var observer = this.__observers__[i];
      if (observer.key === key || observer.key === null){
				if (observer.options.handler){
					observer.options.handler(this, key, options);
				}else{
					if (observer.inspector.observeValueForKey){
						observer.inspector.observeValueForKey(this, key, options);
					}
				}
			}
    }
  },

	removeObservers: function() {
    this.__observers__ = [];
  },
  
  countObservers: function() {
    return (this.__observers__ = this.__observers__ || []).length;
  },

	addChildObject: function(childKey, value){		
		//TODO: provjeri da li je u value mixan inna.KeyValueCoding ako nije smiksaj ga
		this[childKey] = value;
		var handler = function(object, key, options){			
			this.didChangeValue(childKey + "." + key, options);
		};
		value.addObserver(this, null, { handler: handler.bind(this)});
	},

	removeChildObject: function(value){
		value.removeObserver(this);
	},

	countOfKey: function(key){
		return (this[key] || []).length;
	},
	objectInKeyAtIndex: function(key, index){
		return this[key][index];
	},	
	pushObjectInKey: function(key, object){
		this.insertObjectInKeyAtIndex(key, null, object);
	},
	insertObjectInKeyAtIndex: function(key, index, object){
		var container = this[key] = this[key] || [];
		index = index || container.length;
		container[index] = object;
		var handler = function(child, childKey, options){	
			Object.extend(options, {index: container.indexOf(object), object: child});
			this.didChangeValue(key + "." + childKey, options);
		};
		object.addObserver(this, null, { handler: handler.bind(this)});
		this.didChangeValue(key, {index: container.indexOf(object), object: object, type: "add", value: container});
	},
	removeObjectInKey: function(key, object){
		this.removeObjectInKeyAtIndex(key, null, object);
	},
	removeObjectInKeyAtIndex: function(key, index, object){		
		var container = this[key] = this[key] || [];		
		if (index === null){
			index = container.indexOf(object);
		}
		this[key].splice(index, 1);
		object.removeObserver(this);
		this.didChangeValue(key, {index: index , object: object, type: "remove", value: container});
	},
	replaceObjectInKeyAtIndex: function(key, index, object){
		var container = this[key] = this[key] || [];
		this[key][index] = object;
	}

};
//);