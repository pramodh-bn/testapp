var restify = require('restify');
var mongojs = require('mongojs');
var xml2js = require('xml2js');

var xmlData = '<persons>'+
			'<person><id>1</id><fname>Joe</fname><lname>Brown</lname><DOB>1987-03-04</DOB><wage>100</wage><location>US</location></person>'+
			'<person><id>2</id><fname>Frans</fname><lname>Clove</lname><DOB>1988-10-14</DOB><wage>200</wage><location>UK</location></person>'+
			'<person><id>3</id><fname>Barbara</fname><lname>Ransa</lname><DOB>1970-01-28</DOB><wage>300</wage><location>AU</location></person>'+
			'</persons>'
var parser = new xml2js.Parser({explicitArray: false });//, mergeAttrs:true});
var persons = null;



var ip_addr = '127.0.0.1';
var port = '8080';

var server = restify.createServer({
	name: "testapp"
});

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());


var PATH = '/person';
server.get({path:PATH, version: '0.0.1'}, findAllPersons);
server.get({path:PATH + '/:id', version:'0.0.1'}, findPerson);
server.post({path:PATH+'/add', version:'0.0.1'}, createPerson);
server.post({path:PATH + '/:id', version:'0.0.1'}, updatePerson);

server.listen(port, ip_addr, function(){
	console.log('%s listening at %s', server.name, server.url);
});

function findAllPersons(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', "*");
	console.log("find all persons");
	if(persons == null){
		parser.parseString(xmlData, function(err, result){
		persons = result;
		console.log(JSON.stringify(persons));
		persons.persons.person.forEach(function(item, index){
			console.log(item);
		});

		res.send(result);
		});
	} else {
		res.send(persons);
	}
}

function findPerson(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', "*");
	console.log("find person", req.params);
	res.send("hello world!", req.params.id);
}

function createPerson(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', "*");
	console.log("creating person" + req.params);
	console.log(persons.persons.person.length);
	var item = {};
	item.id = (persons.persons.person.length + 1).toString();
	item.fname = req.params.fname;
	item.lname = req.params.lname;
	item.DOB = req.params.DOB;
	item.location = req.params.location;
	item.wage = req.params.wage;
	console.log("loka", item);
	persons.persons.person.push(item);
	console.log("after putting " + persons.persons.person.length);
	var ind = persons.persons.person.length; 
	console.log(ind);
	console.log(JSON.stringify(persons));
	res.send(persons);
	return next();
}

function updatePerson(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', "*");
	console.log("Updating person", req.params);
	console.log(persons);
	var ind = 0;
	persons.persons.person.forEach(function(item, index){
		console.log("item " + item);
		if(item.id == req.params.id) {
			console.log("found the id " + item.id);
			console.log("fname " + req.params.fname);
			item.fname = req.params.fname;
			item.lname = req.params.lname;
			item.DOB = req.params.DOB;
			item.location = req.params.location;
			item.wage = req.params.wage;
			ind = index;
		}
	});
	console.log(persons.persons.person[ind]);
	res.send(persons.persons.person[ind]);
	var fs = require('fs'),
	    xml2js = require('xml2js');

	var obj = {name: "Super", Surname: "Man", age: 23};

	var builder = new xml2js.Builder();
	var xml = builder.buildObject(persons);
	console.log(xml);

}

