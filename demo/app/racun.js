var app = app || {};

app.Racun = Class.create({
	
	initialize: function(obj){    

    this.broj             = obj.broj || 0;    
		this.pdv							= obj.pdv || 22;    
		this.datum						= Date.toDateOrDefault(obj.datum || new Date());
		this.rokPlacanja			= obj.rokPlacanja || 15;

		this.partner					= new app.Model(obj.partner || {});
		this.stavke           = [];

		obj.stavke.each(function(stavka) { this.addStavka(stavka, this); }.bind(this));

		this.defineDependentKey("pdvIznos", ["osnovica", "pdv"]);
		this.defineDependentKey("iznos", ["osnovica", "pdv"]);
		this.defineDependentKey("valuta", ["datum", "rokPlacanja"]);
	},

	onValueForKeyChanged: function(key, options){
		if (key === "stavke" || key === "stavke.iznos"){
			this.didChangeValue("osnovica");
		}
	},
	
  addStavka: function(obj){	 		
		return this.pushObjectInKey("stavke", new app.Stavka(obj || {}, this));
  },
  
  removeStavka: function(stavka){     
		this.removeObjectInKey("stavke", stavka);
  },
  
  osnovica: function(){
    return this.stavke.inject(0, function(suma, stavka){ return suma + stavka.iznos(); });
  },
  
  pdvIznos: function() { 
    return this.osnovica() * this.pdv / 100; 
  },
  
  iznos: function(){ 
    return this.osnovica() + this.pdvIznos();
  },

  valuta: function(){		
    return new Date(this.datum.getTime() + this.rokPlacanja * 1000 * 60 * 60 * 24);
  }
  
});
app.Racun.addMethods(inna.KeyValueCoding);
