var inna = inna || {};

inna.keyValueCoding = function(obj){

	obj.valueForKey = function(key){
		if (key.indexOf(".") > 0){
			var keys = key.split(".");
			return obj[keys[0]].valueForKey(keys[1]);
		}
		if (typeof obj[key] == "function"){
			return obj[key]();
		}else{
			return obj[key];
		}
	};

	obj.setValueForKey = function(key, value){
		var oldValue = obj.valueForKey(key);
		if (key.indexOf(".") > 0){
			var keys = key.split(".");
			obj[keys[0]].setValueForKey(keys[1], value);
		}else{
			if (typeof obj[key] == "function"){
				obj[key](value);
			}else{
				obj[key] = value;
			}
		}
		if (obj.didChangeValue){
			var options = {oldValue: oldValue, value: obj.valueForKey(key)};
			obj.didChangeValue(key, options);
		}
	};

	return obj;
};
