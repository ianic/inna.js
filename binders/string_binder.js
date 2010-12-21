var inna = inna || {};

inna.stringBinder = function(element, object, property){	
	var that = {};
  inna.binderBase(that, element, object, property);
  that.onModelChanged();
	return that;
};
