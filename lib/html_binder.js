var inna = inna || {};

inna.HtmlBinder = Class.create({

	/**
	 * options:
	 *   element
	 *   model
	 *   key
	**/
	initialize: function(options){
		Object.extend(this, options);
		this.element = $(this.element);
		this.initBinding();
	},

	initBinding: function(){
		this.model.addObserver(this, this.key);
		if (this.isInputElement()){
			Event.observe(this.element, 'change', this.updateModel.bindAsEventListener(this)); 
			Event.observe(this.element, 'keyup', this.updateModel.bindAsEventListener(this)); 
		}
		this.updateElement();		
	},

	observeValueForKey: function(model, key, options){
		this.updateElement(options.value);
	},

	updateElement: function(value){
		if (value === undefined)
			value = this.modelValue();
		if (value == this.elementValue)
			return;
		if (this.element.value === undefined)
			this.element.update(value);
		else
			this.element.value = value;					
	},

	updateModel: function(){
		var value = this.elementValue();
		if (this.modelValue() != value)
			this.model.setValueForKey(this.key, value);
	},

	modelValue: function(){
		return this.model.valueForKey(this.key);
	},

	elementValue: function(){
		if (this.isInputElement())
			return this.element.value;
		else
			return this.element.innerHTML;
	},

	destroy: function(){
		this.model.removeObserver(this);
		if (this.isInputElement())
			Event.stopObserving(this.element);
	},

	isInputElement: function(){
		return this.element.nodeName == "INPUT" ||
			this.element.nodeName == "SELECT" ||
			this.element.nodeName == "TEXTAREA";
	}


});