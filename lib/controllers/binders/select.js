inna.controllers.binders.Select = function(element, object, property){
  inna.controllers.binders.BinderBase.call(this, element, object, property);
	
	//ako postoji funkcija koja vraca key, value parove za options popuni ih
	//funkcija se mora zvati kao i property sa sufixom Options                            
  if (object[property + "Options"]){
    object[property + "Options"]().each(function (opt){
			if (opt.value === undefined && opt.key === undefined)
				element.options[element.options.length] = new Option(opt, opt);
			else
				element.options[element.options.length] = new Option(opt.value, opt.key);
      }  
    );
  }
	
  this.onModelChanged();
}; 