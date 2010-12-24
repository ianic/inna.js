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

		this.defineDependentKey("pdv",    ["osnovica"]);
		this.defineDependentKey("iznos",  ["osnovica"]);
		this.defineDependentKey("porezi", ["osnovica"]);
		this.defineDependentKey("valuta", ["datum", "rokPlacanja"]);
	},

	onValueForKeyChanged: function(key, options){
		if (key === "stavke" || key === "stavke.iznos"){
			this.didChangeValue("osnovica");
		}       
		this.izracun();						
	},               
	
  izracun: function(){
    this.osnovica = 0;
    this.pdv = 0;  
    this.porezi = [];
    this.iznos = 0;  
    this.stavke.each(function (stavka){
      this.osnovica += stavka.osnovica();
      this.pdv += stavka.pdv();
      this.iznos += stavka.iznos();         
      if (stavka.pdv() > 0){
        var porez = this.porezi.find(function(p){return p.key == stavka.pdvPostotak; });
        if (!porez){
          porez = {key: stavka.pdvPostotak, value: stavka.pdv()};
          this.porezi.push(porez);
        }else{
          porez.value += stavka.pdv();
        }                   
      }
    }.bind(this));
    //this.osnovica = this.stavke.inject(0, function(suma, stavka){ return suma + stavka.osnovica(); });
  },
	
  addStavka: function(obj){	 		
		return this.pushObjectInKey("stavke", new app.Stavka(obj || {}, this));
  },
  
  removeStavka: function(stavka){     
		this.removeObjectInKey("stavke", stavka);
  },
  
  // osnovica: function(){
  //   return this.stavke.inject(0, function(suma, stavka){ return suma + stavka.iznos(); });
  // },
  // 
  // pdvIznos: function() { 
  //   return this.osnovica() * this.pdv / 100; 
  // },
  // 
  // iznos: function(){ 
  //   return this.osnovica() + this.pdvIznos();
  // },

  valuta: function(){		
    return new Date(this.datum.getTime() + this.rokPlacanja * 1000 * 60 * 60 * 24);
  }
  
});
app.Racun.addMethods(inna.KeyValueCoding);
