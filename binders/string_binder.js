var inna = inna || {};

inna.StringBinder = Class.create(inna.BinderBase, {
	
	initialize: function($super, element, object, property){	
		$super(element, object, property);
		this.onModelChanged();		
	}

});
