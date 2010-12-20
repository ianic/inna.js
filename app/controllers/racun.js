var app = app || {controllers: {}};
app.RacunController = function(model, view){     
	
  // this.addStavka = function(){                
	// 	model.addStavka();		
  // };
                                                                 
  // this.removeStavka = function(event, params){	 
  //   model.removeStavka(params.object);             
  // };    

  // this.edit = function(event, params){
  //   new app.controller.Racun(params.object);    
  // };
  
	var binder = inna.objectBinder({model: model, view: view, controller: this});
};
