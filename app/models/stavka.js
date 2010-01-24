app.models.Stavka = function(parent){
  inna.models.Base.call(this, parent, "app.models.Stavka");   
  
  this.naziv = this.naziv || 'neka nova demo stavka';
  this.jedinicaMjere = this.jedinicaMjere || 'kom';
  this.kolicina = this.kolicina || 12.15;
  this.cijena = this.cijena || 1.23;
  
  this.iznos = function(){ 
    return this.kolicina * this.cijena; 
  }
	
	this.remove = function(){
		parent.removeStavka(this);
	}
}      
