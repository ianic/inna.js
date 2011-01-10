var inna = inna || {};

inna.SelectBinder = Class.create(inna.BinderBase, {
  
  initialize: function($super, element, object, property){
    $super(element, object, property);
    this.createSelectOptions();
    this.onModelChanged();
  },
	
	createSelectOptions: function(){
	  //ako postoji funkcija koja vraca key, value parove za options popuni ih
  	//funkcija se mora zvati kao i property sa sufixom Options                            	
  	var fnOptions = this.model[this.key + "Options"];
    if (fnOptions){
  		this.element.options.length = 0;
      fnOptions ().each(function (opt){
  			if (opt.value === undefined && opt.key === undefined)
  				this.element.options[this.element.options.length] = new Option(opt, opt);
  			else
  				this.element.options[this.element.options.length] = new Option(opt.value, opt.key);
        }.bind(this)  
      );
    }  	
	}
			
});