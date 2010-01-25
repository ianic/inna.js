app.models.Racun = function(){    
  inna.models.ModelBase.call(this, null, "app.models.Racun");
   
  this.pdv = (this.pdv == null) ? 22 : this.pdv;
  this.stavke = this.stavke || [];
  this.partner = this.partner || {};    
  this.datum = this.datum || new Date();
  this.rokPlacanja = (this.rokPlacanja == null) ? 15 : this.rokPlacanja;	
  this.datum = Date.toDateOrDefault(this.datum);
  
  //TODO ovdje moze ici neka logika da iterira kroz sve pa da skuzi o kojem se tipu objekta radi i koji apply treba pozvati
  this.stavke.each(function(stavka){ app.models.Stavka.call(stavka, this)}.bind(this)); 
  app.models.Partner.call(this.partner, this);
																																															
  this.addStavka = function(stavka){	 
		stavka = stavka || {}
    app.models.Stavka.call(stavka, this);         
    this.stavke.push(stavka);  
		this.pushNotification('stavkaAdded', stavka);
    return stavka;
  }      
  
  this.removeStavka = function(stavka){     
    this.stavke = this.stavke.without(stavka);                            
		this.pushNotification('stavkaRemoved', stavka);    
  }
                             
  this.osnovica = function(){
    return this.stavke.inject(0, function(suma, stavka){ return suma + stavka.iznos() });
  }                                                                   
  
  this.pdvIznos = function() { 
    return this.osnovica() * this.pdv / 100; 
  }
  
  this.iznos = function(){ 
    return this.osnovica() + this.pdvIznos() 
  }

  this.valuta = function(){		
    return new Date(this.datum.getTime() + this.rokPlacanja * 1000 * 60 * 60 * 24);
  } 
          
}
