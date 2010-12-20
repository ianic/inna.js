inna.controllers.binders.AddRemoveClass = function(element, object, property){  
  
	this.className = element.getAttribute('className');
	
  this.onModelChanged = function() {
    if (this.modelValue())
			this.element.addClassName(this.className);
		else
			this.element.removeClassName(this.className);
  }
  
  inna.controllers.binders.BinderBase.call(this, element, object, property);
  
	this.onModelChanged();
};