var app = app || {modles: {}};

app.models.Racun = function(that){    
	that = that || {};
     
  that.pdv							= (that.pdv == null) ? 22 : that.pdv;
  that.stavke						= that.stavke || [];
  that.partner					= that.partner || {};    
  that.datum						= that.datum || new Date();
  that.rokPlacanja			= (that.rokPlacanja == null) ? 15 : that.rokPlacanja;	
  that.datum						= Date.toDateOrDefault(that.datum);

  //TODO ovdje moze ici neka logika da iterira kroz sve pa da skuzi o kojem se tipu objekta radi i koji apply treba pozvati
  that.stavke.each(
		function(stavka){ 
			app.models.Stavka.call(stavka, that);
		}.bind(that)
	); 
  app.models.Partner.call(that.partner, that);

	inna.model(that);

	that.onValueForKeyChanged = function(key, options){
		if (key === "stavke" || key === "stavke.iznos"){
			that.didChangeValue("osnovica");
		}
	};
																																															
  that.addStavka = function(){	 
		var stavka = {};
    app.models.Stavka.call(stavka, that);         
		that.pushObjectInKey("stavke", stavka);
    return stavka;
  };
  
  that.removeStavka = function(stavka){     
		that.removeObjectInKey("stavke", stavka);
  };
                             
  that.osnovica = function(){
    return that.stavke.inject(0, function(suma, stavka){ return suma + stavka.iznos(); });
  };                                                                   
  
  that.pdvIznos = function() { 
    return that.osnovica() * that.pdv / 100; 
  };
  
  that.iznos = function(){ 
    return that.osnovica() + that.pdvIznos();
  };

  that.valuta = function(){		
    return new Date(that.datum.getTime() + that.rokPlacanja * 1000 * 60 * 60 * 24);
  }; 

	that.defineDependentKey("pdvIznos", ["osnovica", "pdv"]);
	that.defineDependentKey("iznos", ["osnovica", "pdv"]);
          
	return that;
};
