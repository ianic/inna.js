var Person = Class.create({
	//include: inna.KeyValueCoding,

	initialize: function(firstName, lastName, age, mother){
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;	
		if (mother)
			this.addChildObject("mother", mother);
	},

	addFriend: function(friend){
		this.pushObjectInKey("friends", friend);
	},

	removeFriend: function(friend){
		this.removeObjectInKey("friends", friend);
	},

	fullName: function(){
		return this.firstName + " " + this.lastName;
	}
});
Person.addMethods(inna.KeyValueCoding);



describe("key value coding specs", function() {

  describe("valueForKey", function() {

    it("should return object properties", function() {			
			var person = new Person('Igor', 'Anic', 37);
			expect(person.valueForKey('firstName')).toMatch('Igor');
			expect(person.valueForKey('lastName')).toMatch('Anic');
			expect(person.valueForKey('age')).toMatch(37);
			expect(person.valueForKey('fullName')).toMatch("Igor Anic");
    });

  });

  describe("setValueForKey", function() {

    it("should set object properties", function() {			
			var person = new Person('Igor', 'Anic', 37);
			person.setValueForKey('lastName', 'Anić');			
			person.setValueForKey('age', 38);			
			expect(person.valueForKey('lastName')).toMatch('Anić');
			expect(person.valueForKey('age')).toMatch(38);			
    });

  });

	describe("adding/removing inspectors", function(){
		it("inspector should be added to __observers__", function(){
			var person = new Person('Igor', 'Anic', 37);
			var inspector = {};
			person.addObserver(inspector, 'firstName');			
			expect(person.countObservers()).toMatch(1);
			var observer = person.__observers__[0];
			expect(observer.inspector).toMatch(inspector);
			expect(observer.key).toMatch('firstName');
			person.addObserver(inspector, 'lastName');
			expect(person.countObservers()).toMatch(2);
		});
	});

	describe("notifying observers", function() {

		it("should call observerValueForKey on inspector object", function() {			
			var person = new Person('Igor', 'Anic', 37);
			var age = 0;
			var inspector = {
				observeValueForKey: function(object, key, options){
					age = options.value;
					expect(object).toMatch(person);
					expect(key).toMatch('age');
					expect(options.oldValue).toMatch(37);
					expect(options.value).toMatch(38);
				}
			};
			person.addObserver(inspector, 'age');
			expect(person.countObservers()).toMatch(1);			
			expect(age).toMatch(0);
			person.setValueForKey('age', 38);
			expect(age).toMatch(38);			
    });

  });

	describe("one to one relationship", function(){
		
		it("should set properties on child object", function(){
			var igor = new Person("Igor", "Anic", 38, new Person("Andjelka", "Anic"));
			expect(igor.valueForKey("mother.firstName")).toMatch("Andjelka");
			igor.setValueForKey("mother.age", 67);
			expect(igor.valueForKey("mother.age")).toMatch(67);
		});
		
		it("should notify inspectors on child changes", function(){
			var igor = new Person("Igor", "Anic", 38, new Person("Andjelka", "Anic"));
			var called = false;
			var inspector = { observeValueForKey: function(object, key, options) {
				expect(key).toMatch("age");
				expect(options.value).toMatch(67);
				called = true;
			}};
			igor.addObserver(inspector, "mother.age");
			igor.setValueForKey("mother.age", 67);
			expect(called).toMatch(true);
		});

		it("should notify inspectors on child changes even if child is not changed through this object", function(){
			var mother = new Person("Andjelka", "Anic");
			var igor = new Person("Igor", "Anic", 38, mother);			
			var called = false;
			var inspector = { observeValueForKey: function(object, key, options) {
				expect(key).toMatch("age");
				expect(options.value).toMatch(67);
				called = true;
			}};
			igor.addObserver(inspector, "mother.age");
			mother.setValueForKey("age", 67);
			expect(called).toMatch(true);
		});
		
		
	});

	describe("one to many relationship", function(){
		it("should observe child objects", function(){
			var igor = new Person("Igor", "Anic");
			var friend1 = new Person("Igor", "Plavsic");
			var friend2 = new Person("Pero", "Zdero");
			igor.addFriend(friend1);
			expect(igor.friends.length).toMatch(1);
			igor.addFriend(friend2);
			expect(igor.friends.length).toMatch(2);
			expect(igor.countOfKey("friends")).toMatch(2);
			expect(friend1.__observers__.length).toMatch(1);
			expect(friend2.__observers__.length).toMatch(1);
			igor.removeFriend(friend2);
			expect(igor.friends.length).toMatch(1);
			expect(friend2.__observers__.length).toMatch(0);
		});
		it("should notify on child add",function(){
			var igor = new Person("Igor", "Anic");
			var friend1 = new Person("Igor", "Plavsic");
			var called = false;
			var inspector = { observeValueForKey: function(object, key, options) {
				expect(key).toEqual("friends");
				expect(options.value).toBe(igor.friends);
				expect(options.oldValue).toBe(undefined);
				expect(object).toBe(igor);
				expect(options.type).toBe("add");
				expect(options.index).toEqual(0);
				expect(options.object).toBe(friend1);
				called = true;
			}};
			igor.addObserver(inspector);
			igor.addFriend(friend1);
			expect(called).toBeTruthy();
		});
		it("should notify on child remove",function(){
			var igor = new Person("Igor", "Anic");
			var friend1 = new Person("Igor", "Plavsic");
			var friend2 = new Person("Pero", "Zdero");
			igor.addFriend(friend1);
			expect(igor.friends.length).toMatch(1);
			igor.addFriend(friend2);
			var called = false;
			var inspector = { observeValueForKey: function(object, key, options) {
				expect(key).toEqual("friends");
				expect(options.value).toBe(igor.friends);
				expect(options.oldValue).toBe(undefined);
				expect(object).toBe(igor);
				expect(options.type).toBe("remove");
				expect(options.index).toEqual(1);
				expect(options.object).toBe(friend2);
				called = true;
			}};
			igor.addObserver(inspector, "friends");
			igor.removeFriend(friend2);
			expect(called).toBeTruthy();
		});
		it("should notify on child object changes",function(){
			var igor = new Person("Igor", "Anic");
			var friend1 = new Person("Igor", "Plavsic");
			var friend2 = new Person("Mate", "Curic", 34);			
			igor.addFriend(friend1);
			igor.addFriend(friend2);
			var called = false;
			var inspector = { observeValueForKey: function(object, key, options) {
				expect(key).toEqual("friends.age");
				expect(options.value).toEqual(35);
				expect(options.oldValue).toEqual(34);
				expect(object).toBe(igor);
				expect(options.index).toEqual(1);
				expect(options.object).toBe(friend2);
				called = true;
			}};
			igor.addObserver(inspector);
			friend2.setValueForKey("age", 35);
			expect(called).toBeTruthy();
		});		
	});

});