app.controllers.Racun = function(model, element){     
	
  inna.controllers.Base.call(this);   
	
  this.model = this.open(model); 
  app.models.Racun.apply(this.model);
        
  this.bind = function(){
    this.bindObject();   
    this.bindCollection('stavke');
  } 
  
  this.addStavka = function(){                
		this.model.createStavka();		
		//     var e = this.bindCollectionItem("stavke", this.model.createStavka());
		// this.findElement('input', e).select();
  }
                                                                 
  this.removeStavka = function(event, params){	 
    this.model.removeStavka(params.object);             
    //Element.remove(params.element); 
  }    

  this.displayName = function(){
    return "Racun " + this.model.partner.naziv;
  }  
	
  this.edit = function(event, params){
    new app.controller.Racun(params.object);    
  }
  
  this.initHtml(element);	
  this.bind();   

	
	//model notifications
	this.onStavkaAdded = function(stavka){   
		var last = this.bindCollection('stavke');
		// var e = this.bindCollectionItem("stavke", stavka);
		var input = this.findElement('input', last);
		if (input){ input.select(); } 
	}  
	
	this.onStavkaRemoved = function(stavka){ 
		this.bindCollection('stavke');
	}
	
	inna.notificationCenter.addObserver(this, this.model, 'stavkaAdded', this.onStavkaAdded.bind(this));
	inna.notificationCenter.addObserver(this, this.model, 'stavkaRemoved', this.onStavkaRemoved.bind(this));
	
}
