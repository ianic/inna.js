var app = app || {};

app.stavka = function(that, parent){
	that = that || {};
    
  that.naziv						= that.naziv || 'neka nova demo stavka';
  that.jedinicaMjere		= that.jedinicaMjere || 'kom';
  that.kolicina					= that.kolicina || 12.15;
  that.cijena						= that.cijena || 1.23;

	inna.model(that);   
	  
  that.iznos = function(){ 
    return that.kolicina * that.cijena; 
  };
	
	that.remove = function(){
		parent.removeStavka(that);
	};

	that.defineDependentKey("iznos", ["kolicina", "cijena"]);

	return that;
};      
