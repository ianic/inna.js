var inna = inna || {};

inna.model = function(obj){

	inna.keyValueCoding(obj);
	inna.keyValueObserving(obj);
	inna.keyValueCollectionObserving(obj);

	return obj;
};