inna = {
	models : {},
	controllers : { binders: {} },
	helpers : {},
	db : {},  
	
	notificationCenter : {
		observers: [],
				
		addObserver : function(observer, objectToObserve, eventToObserver, functionToCall){
		  this.observers.push({
				observer: observer, 
				objectToObserve: objectToObserve, 
				eventToObserver: eventToObserver, 
				functionToCall: functionToCall
			});
		},
		
		removeObserver : function(observer, objectToObserve, eventToObserver){
			
		}, 
		  		
		pushNotification : function(object, event, data){
			this.observers.each(function(observer){
				if (observer.objectToObserve == object && observer.eventToObserver == event){
					observer.functionToCall(data);
				}
			});
		}
						
	}
}