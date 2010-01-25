app.controllers.Racun = function(model, element){     
	
  inna.controllers.ControllerBase.call(this);
	this.model = model;
  app.models.Racun.apply(this.model);
        
  this.bind = function(){
    this.bindObject();   
    this.bindCollection('stavke');
  } 
  
  this.addStavka = function(){                
		this.model.addStavka();		
  }
                                                                 
  this.removeStavka = function(event, params){	 
    this.model.removeStavka(params.object);             
  }    

  // this.displayName = function(){
  //   return "Račun " + this.model.broj;
  // }  
	
  this.edit = function(event, params){
    new app.controller.Racun(params.object);    
  }
  
  this.initHtml(element);	
  this.bind();   
	
	//model notifications
	this.onStavkaAdded = function(stavka){   
		var last = this.bindCollection('stavke');
		var input = this.findElement('input', last);
		if (input){ input.select(); } 
	}  
	
	this.onStavkaRemoved = function(stavka){ 
		this.bindCollection('stavke');
	}
	                                           
	//subscribe to model notifications
	inna.notificationCenter.addObserver(this, this.model, 'stavkaAdded', this.onStavkaAdded.bind(this));
	inna.notificationCenter.addObserver(this, this.model, 'stavkaRemoved', this.onStavkaRemoved.bind(this));
	
}
