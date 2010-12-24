var inna = {
 
  // notificationCenter : {
  //   observers: [],
    
  //   addObserver : function(observer, objectToObserve, eventToObserver, functionToCall){
  //     this.observers.push({
  //       observer: observer, 
  //       objectToObserve: objectToObserve, 
  //       eventToObserver: eventToObserver, 
  //       functionToCall: functionToCall
  //     });
  //   },
    
  //   removeObserver : function(observer){
  //     this.observers = this.observers.reject(function (o) { return o.observer == observer; });
  //   }, 
    
  //   pushNotification : function(object, event, data){
  //     var profiler = new sp.Profiler('pushNotification event: ' + event);
      
  //     var listeners = 0;
  //     this.observers.each(function(observer){
  //       if ((observer.objectToObserve == object || observer.objectToObserve == null)
  //         && observer.eventToObserver == event){
  //         listeners += 1;    
  //         observer.functionToCall(data, event);
  //       }
  //     });  
      
  //     profiler.stop("listeners: " + listeners);      
  //   },
    
  //   showObservers: function(){
      
  //   }                               
  // },

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
  },

	hamlTemplates: {},

	renderHamlTemplate: function(element, template, context, locals, insert){
		var compiledTemplate = inna.hamlTemplates[template];
		if (!compiledTemplate) {
			compiledTemplate = Haml.optimize(Haml.compile($F(template)));  
			inna.hamlTemplates[template] = compiledTemplate;
		}
		var html = Haml.execute(compiledTemplate, context, locals);
		if (insert) {
			element.insert(html);
		} else {
			element.update(html);
		}
	}

};

inna.helpers = {};

inna.helpers.getType = function(x) {
    // If x is null, return "null"
    if (x == null) return "null";

    // Next try the typeof operator
    var t = typeof x;
    // If the result is not vague, return it
    if (t != "object")  return t;

    // Otherwise, x is an object. Use the default toString( ) method to
    // get the class value of the object.
    var c = Object.prototype.toString.apply(x);  // Returns "[object class]"
    c = c.substring(8, c.length-1);              // Strip off "[object" and "]"

    // If the class is not a vague one, return it.
    if (c != "Object") return c;

    // If we get here, c is "Object".  Check to see if
    // the value x is really just a generic object.
    if (x.constructor == Object) return c;  // Okay the type really is "Object"
    // For user-defined classes, look for a string-valued property named
    // classname, that is inherited from the object's prototype
    if ("classname" in x.constructor.prototype &&  // inherits classname
        typeof x.constructor.prototype.classname == "string") // its a string
        return x.constructor.prototype.classname;

    // If we really can't figure it out, say so.
    return "<unknown type>";
}; 

inna.helpers.getValueType = function(x){
	var type = inna.helpers.getType(x);
	if (type == "function")
		return inna.helpers.getType(x());
	else
		return type;
};