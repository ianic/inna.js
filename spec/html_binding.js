var Item = Class.create({

	initialize: function(options){
		Object.extend(this, options);
	},

	total: function(){
		return this.quantity * this.price;
	}
});
Item.addMethods(inna.KeyValueCoding);


var Invoice = Class.create({

	initialize: function(){
		this.date = new Date();
		this.term = 15;
		this.dueDate = new Date();
		this.comment = "...";
		this.items = [];
		this.items.push(new Item({name: "item 1", quantity : 12, price: 1.2}));
		this.items.push(new Item({name: "item 2", quantity : 34, price: 3.4}));
	}

});
Invoice.addMethods(inna.KeyValueCoding);

describe("html binding", function(){

	describe("basic", function(){

		beforeEach(function(){
			$("invoice").update("");
			inna.HamlTemplates.renderHaml({element: "invoice", template: "invoice"});	
		});

		it("simple read-only element: span", function(){
			var invoice = new Invoice();
			var span = $$("#invoice span[inna-binding=comment]")[0];
			var spanBinder = new inna.HtmlBinder({element: span, model: invoice, key: "comment"});
			expect(span.innerHTML).toBe("...");
			invoice.setValueForKey("comment", "iso medo u ducan");
			expect(span.innerHTML).toBe("iso medo u ducan");
		});

		it("input element, string binder", function(){
			var invoice = new Invoice();
			var input = $$("#invoice input[inna-binding=comment]")[0];
			var inputBinder = new inna.HtmlBinder({element: input, model: invoice, key: "comment"});		
			expect(input.value).toBe("...");
			invoice.setValueForKey("comment", "iso medo u ducan");
			expect(input.value).toBe("iso medo u ducan");
			input.value = "no comment";
			inputBinder.updateModel();
			expect(invoice.comment).toBe("no comment");
		});

	});

	describe("collection binding", function(){
		it("", function(){
			$("invoice").update("");
			inna.HamlTemplates.renderHaml({element: "invoice", template: "invoice"});	
			var invoice = new Invoice();
			var divItems = $$("#invoice div.items")[0];
			var binder = new inna.HtmlCollectionBinder({element: divItems, model: invoice, template: "item", key: "items"});
		});
	});

	describe("inna.HtmlBinding", function(){
		
		it("should init html binding for all elements in template", function(){
			var invoice = new Invoice();
			var binding = new inna.HtmlBinding({element: "invoice", template: "invoice", model: invoice});			
			expect(binding._binders.length).toBe(5);
			expect(invoice.countObservers()).toBe(5);
			binding.destroy();
			expect(binding._binders.length).toBe(0);
			expect(invoice.countObservers()).toBe(0);
		});
		
	});
	
});
