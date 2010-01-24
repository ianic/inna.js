app.models.Stavka = function(parent){
  inna.models.Base.call(this, parent, "app.models.Stavka");   
  
  this.naziv = this.naziv || '';
  this.jedinicaMjere = this.jedinicaMjere || 'kom';
  this.kolicina = this.kolicina || 1;
  this.cijena = this.cijena || 0;
  
  this.iznos = function(){ 
    return this.kolicina * this.cijena; 
  }
	
	this.remove = function(){
		parent.removeStavka(this);
	}
}      
