var inna = inna || {};

inna.HtmlCollectionBinder = Class.create({
	
	initialize: function(options){
		Object.extend(this, options);
		this.element = $(this.element);
		this._binders = [];
		this.initBinding();
		this.model.addObserver(this, this.key);
	},

	initBinding: function(){
		var collection = this.model.valueForKey(this.key);
		for(var i=0; i<collection.length; i++){
			var item = collection[i];
			this.addItem(item);
		}
	},

	addItem: function(item){
		var options = {rootElement: this.element, model: item, template: this.template, insert: true};
		this._binders.push(new inna.HtmlObjectBinder(options));
	},

	observeValueForKey: function(model, key, options){
		if (options.type === "add"){
			this.addItem(options.object);
		}
		if (options.type === "remove"){
		  this._binders[options.index].remove();	
		}
	}

});