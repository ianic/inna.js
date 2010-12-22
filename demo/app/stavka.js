var app = app || {};

app.Stavka = Class.create({

	initialize: function(obj, racun){
    
		this._racun           = racun;
		this.naziv						= obj.naziv || 'neka nova demo stavka';
		this.jedinicaMjere		= obj.jedinicaMjere || 'kom';
		this.kolicina					= obj.kolicina || 12.15;
		this.cijena						= obj.cijena || 1.23;

		this.defineDependentKey("iznos", ["kolicina", "cijena"]);
	},
	
  iznos: function(){ 
    return this.kolicina * this.cijena; 
  },
	
	remove : function(){
		this._racun.removeStavka(this);
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