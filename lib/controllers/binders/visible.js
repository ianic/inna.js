inna.controllers.binders.Visible = function(element, object, property){	
  inna.controllers.binders.BinderBase.call(this, element, object, property);
  
  this.showHide = property;
  this.property = null;
  
  this.onModelChanged();  
};
