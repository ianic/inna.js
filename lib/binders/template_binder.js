var inna = inna || {};

inna.TemplateBinder = Class.create(inna.BinderBase, {

	initialize: function($super, element, object, property){
		$super(element, object, property);                                   
		this.template = this.element.getAttribute("template")
		this.onModelChanged();
	},
	
  onModelChanged: function() {      
    inna.renderHamlTemplate(this.element, this.template, null, this.model);
  }
	
});