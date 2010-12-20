var inna = {
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
    
    removeObserver : function(observer){
      this.observers = this.observers.reject(function (o) { return o.observer == observer; });
    }, 
          
    pushNotification : function(object, event, data){
      var profiler = new sp.Profiler('pushNotification event: ' + event);
       
      var listeners = 0;
      this.observers.each(function(observer){
        if ((observer.objectToObserve == object || observer.objectToObserve == null)
            && observer.eventToObserver == event){
          listeners += 1;    
          observer.functionToCall(data, event);
        }
      });  
                                                              
      profiler.stop("listeners: " + listeners);      
    },
    
    showObservers: function(){
        
    }                               
  },

  findLastChildNode : function(e){
    var nodes = e.childNodes; 
		var length = e.childNodes.length;
    for(var i = length - 1; i>=0; i--){
      if (e.childNodes[i].nodeType == 1)
        return e.childNodes[i];
    }
		return null;
  },

  findElement : function(cssQuery, root){
    return this.findElements(cssQuery, root)[0];
  },
  
  findElements : function(cssQuery, root){ 
    return Selector.findChildElements(root, [cssQuery]);
  }
};