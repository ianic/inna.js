app.models.Stavka = function(parent){
  inna.model(this, parent);   
  
  this.naziv = this.naziv || 'neka nova demo stavka';
  this.jedinicaMjere = this.jedinicaMjere || 'kom';
  this.kolicina = this.kolicina || 12.15;
  this.cijena = this.cijena || 1.23;
	  
  this.iznos = function(){ 
    return this.kolicina * this.cijena; 
  };
	
	this.remove = function(){
		parent.removeStavka(this);
	};

	this.defineDependentKey("iznos", ["kolicina", "cijena"]);
};      
