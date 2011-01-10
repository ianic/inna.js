var app = app || {};     

app.Stavka = Class.create({

	initialize: function(obj, racun){
    
		this._racun           = racun;
		this.naziv						= obj.naziv || 'neka nova demo stavka';
		this.jedinicaMjere		= obj.jedinicaMjere || 'kom';
		this.kolicina					= (obj.kolicina === undefined) ? 15 : obj.kolicina;
		this.cijena						= obj.cijena || 1.23;      
		this.pdvPostotak      = (obj.pdvPostotak === undefined) ? 23 : obj.pdvPostotak;

		this.defineDependentKey("iznos", ["kolicina", "cijena", "pdvPostotak"]);
	},
	    
	osnovica: function(){
	  return this.kolicina * this.cijena;
	},
	
  iznos: function(){ 
    return this.osnovica() + this.pdv(); 
  },                                          
  
  pdv: function(){
    return this.osnovica() * (this.pdvPostotak / 100);
  },
	
	remove : function(){
		this._racun.removeStavka(this);
	},
	
	pdvPostotakOptions: function(){
	  return [0, 5, 10, 23];
	}

});      

app.Stavka.addMethods(inna.KeyValueCoding);


app.Model = Class.create({
  
  initialize: function(obj){
		if (obj){
			Object.extend(this, obj);
		}
	}
		
});
app.Model.addMethods(inna.KeyValueCoding);