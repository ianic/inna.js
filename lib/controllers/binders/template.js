
inna.controllers.binders.hamlTemplates = {};

inna.controllers.binders.renderHamlTemplate = function(element, template, context, locals, insert){
  
  var compiledTemplate = inna.controllers.binders.hamlTemplates[template];
  if (!compiledTemplate) {
		compiledTemplate = Haml.optimize(Haml.compile($F(template)));  
    inna.controllers.binders.hamlTemplates[template] = compiledTemplate;
  }
	var html = Haml.execute(compiledTemplate, context, locals);
	if (insert) {
		element.insert(html);
	} else {
		this.setInnerHTML(element, html);
	}

};

inna.controllers.binders.setInnerHTML = function(element, html)
{
	var fn, count = 0;
	fn = function(){
  	count++; 
    var innerHTMLBefore = element.innerHTML;
    // console.info('setInnerHTML attempt: ' + count);
  	element.innerHTML = html;
  	if (element.innerHTML == innerHTMLBefore && html != innerHTMLBefore && count < 20) {
   		setTimeout(fn, 50);
  	}
	};
	fn();
};


inna.controllers.binders.Template = function(element, object, property){  
  
  this.onModelChanged = function() {
    this.isDirty = true;
this.update();
  };
  
  inna.controllers.binders.BinderBase.call(this, element, object, property);
  
  this.template = element.getAttribute('template'); 
  this.isDirty = true;
  
  this.update = function(){ 
    if (this.isDirty){                        
			inna.controllers.binders.renderHamlTemplate(this.element, this.template, null, this.model);
      this.isDirty = false;          
    }
  };
	
  this.update();
};