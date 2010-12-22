var inna = inna || {};

inna.HamlTemplates = {

	/**
	 * renders Haml template
	 * uses haml-js: https://github.com/creationix/haml-js
	 * 
	 * options:
	 *   template   : template name, template should be found in dom element with id __[template]Template__
	 *   element		: dom element to update with result
	 *   context		: This is the this context within the haml template.
	 *   locals			: This is an object that's used in the with scope. Basically it creates local variables and function accessible to the haml template.
	 *   insert     : insert or update html element
	 **/
	renderHaml: function(options){		
		var html = Haml.execute(this._loadHamlTemplate(options.template), options.context, options.locals);
		this._updateDomElement(options, html);
		return html;
	},

	_loadHamlTemplate: function(template){
		var templateSource = $F("__" + template + "Template__");
		return Haml.optimize(Haml.compile(templateSource));
	}.memoize(),

	_updateDomElement: function(options, html){
		if (options.element){
			if (options.insert)
				$(options.element).insert(html);
			else
				$(options.element).update(html);
		}		
	}

};