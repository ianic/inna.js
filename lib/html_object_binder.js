var inna = inna || {};

inna.HtmlObjectBinder = Class.create({
	
	/**
	 * options: 
	 *   element  - html element
	 *   template - haml template
	 *   model    -  
	**/
	initialize: function(options){
		//TODO - provjeri da u options postoje samo dozvoljeni key-ovi
		//       u Rails-ima postoji neki standardni nacin kako se to radi
		this._binders = [];
		Object.extend(this, options);		
		this.renderHamlTemplate();
		this.initBinding();
	},

	renderHamlTemplate: function(){
		if (this.insert){			
			inna.HamlTemplates.renderHaml({element: this.rootElement, template: this.template, insert: true});
			var children = this.rootElement.childElements();
			this.element = children[children.length - 1];
		}
		else{
			this.element = $(this.element);	
			inna.HamlTemplates.renderHaml({element: this.element, template: this.template});
		}		
	},

	initBinding: function(){
		var bindingElements = this.bindingElements();
		var i = bindingElements.length;
		while(i--){
			var element = bindingElements[i];
			var key = element.getAttribute("inna-binding");
			this._binders.push(new inna.HtmlBinder({element: element, model: this.model, key: key}));
		}
	},
		
	bindingElements: function(){
		return Prototype.Selector.select("[inna-binding]", this.element);
	},

	destroy: function(){
		var i = this._binders.length;
		while(i--){
			this._binders[i].destroy();
		}
		this._binders = [];
	},

	remove: function(){
		this.destroy();
		this.element.remove();
	}

});