var app = app || {};

app.racunController = function(model, view){     
	var that = {};
	var binder = inna.objectBinder({model: model, view: view, controller: that});

	return that;
};
