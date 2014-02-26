// person object
function Person(id, fname, lname, dob, wage, location){
	this.id = id;
	this.fname = fname;
	this.lname = lname;
	this.dob = dob;
	this.wage = wage;
	this.location = location;
}

Person.prototype.getDOB = function(){
	var res = this.dob.split('-');
	var locationFormat = {
		"AU" : function(){
			return res[2] + '/'+ res[1] +'/'+ res[0];
		},
		"UK" : function(){
			return res[2] + '/'+ res[1] +'/'+ res[0];
		},
		"US" : function(){
			return res[1] + '/'+ res[2] +'/'+ res[0];
		}
	};
	return locationFormat[this.location](); 
	
}

Person.prototype.getWage = function(){
	var wage = this.wage;
	var locationCurrency = {
		"AU" : function(){
			return "A$" + wage;
		},
		"UK" : function(){
			return "£" + wage;
		},
		"US" : function(){
			return "$"+ wage;
		}
	};
	return locationCurrency[this.location](); 
	
}
