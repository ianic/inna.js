var app = app || {modles: {}};

app.models.Racun = function(){    
  inna.model(this);
   
  this.pdv = (this.pdv == null) ? 22 : this.pdv;
  this.stavke = this.stavke || [];
  this.partner = this.partner || {};    
  this.datum = this.datum || new Date();
  this.rokPlacanja = (this.rokPlacanja == null) ? 15 : this.rokPlacanja;	
  this.datum = Date.toDateOrDefault(this.datum);

	// this.onStavkaChanged = function(){
	// 	this.didChangeValue("osnovica");
	// },

	this.onValueForKeyChanged = function(key, options){
		if (key === "stavke" || key === "stavke.iznos"){
			this.didChangeValue("osnovica");
		}
	};
  
  //TODO ovdje moze ici neka logika da iterira kroz sve pa da skuzi o kojem se tipu objekta radi i koji apply treba pozvati
  this.stavke.each(
		function(stavka){ 
			app.models.Stavka.call(stavka, this);
			//stavka.addObserver(this, "iznos", {handler: this.onStavkaChanged.bind(this)});
		}.bind(this)); 
  app.models.Partner.call(this.partner, this);

																																															
  this.addStavka = function(){	 
		var stavka = {};
    app.models.Stavka.call(stavka, this);         
		//stavka.addObserver(this, "iznos", {handler: this.onStavkaChanged.bind(this)});
		this.pushObjectInKey("stavke", stavka);
		//this.onStavkaChanged();

    // this.stavke.push(stavka);  
		// //this.pushNotification('stavkaAdded', stavka);
		// this.changed();
    return stavka;
  };
  
  this.removeStavka = function(stavka){     
		this.removeObjectInKey("stavke", stavka);
		//this.onStavkaChanged();
    // this.stavke = this.stavke.without(stavka);                            
		//this.pushNotification('stavkaRemoved', stavka);    
  };
                             
  this.osnovica = function(){
    return this.stavke.inject(0, function(suma, stavka){ return suma + stavka.iznos(); });
  };                                                                   
  
  this.pdvIznos = function() { 
    return this.osnovica() * this.pdv / 100; 
  };
  
  this.iznos = function(){ 
    return this.osnovica() + this.pdvIznos();
  };

  this.valuta = function(){		
    return new Date(this.datum.getTime() + this.rokPlacanja * 1000 * 60 * 60 * 24);
  }; 

	this.defineDependentKey("pdvIznos", ["osnovica", "pdv"]);
	this.defineDependentKey("iznos", ["osnovica", "pdv"]);
          
};
