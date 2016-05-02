var express = require ("express");
var bodyParser = require("body-parser");
var fs = require ("fs");
var app = express();

var contacts = [{year: 2015, month: "January",city: "Sevilla", category : 1, theme: "resort" },{year: 2017, month: "March",city: "Madrid", category : 2, theme: "spa" },{year: 2017, month: "January",city: "Sevilla", category : 1, theme: "resort" },{year: 2022, month: "April", city: "Sevilla", category : 1, theme: "resort" },{year: 2017, month: "January",city: "Cadiz", category : 3, theme: "resort" }];
const contacts1 = JSON.parse(JSON.stringify(contacts));

var uuid = "b3b1f308-20e2-65b2-7fa7-4ef28fe78030";

app.use(bodyParser.json());
app.use("/",express.static(__dirname));
app.use("/",express.static(__dirname + '/static'));
app.use("/RESTClient",express.static(__dirname + '/RESTClient'));

app.use("/consumissions",express.static(__dirname + '/static/consumissions'));

/////////////////////////////////GET

app.get("/api/v1/consumissions",(req,res)=> {
	console.log("---------    Mostrar todo");
	console.log(contacts1);
	
	var from = req.query.from;
	var to = req.query.to;
	var search = req.query.search;
	
	var apikey = req.query.apikey;
	if(apikey == uuid){
		//console.log("new GET of resource consumissions");
		var result = [];
		var i = [];
		contacts.forEach(function(value,key){
			if(search == ""){
				i.push(value);
			}else{
				if(search == value.year){
					i.push(value);	
				}
			}
		});

		i.forEach(function(value,key){
			if(key+1 >= from && key+1 <= to){
				result.push(value);	
			}
		});

		var final = { 
			result: result, 
			total: i.length
		}
		res.send(final)
	}else{
		res.sendStatus(401);
	}	
});

app.get("/api/v1/consumissions/:anio",(req,res)=>{
	console.log("---------    Mostrar por año");
	console.log(contacts1);
	var apikey = req.query.apikey;
	if(apikey == uuid){
		var anio = req.params.anio;
		var from = req.query.from;
		var limit = req.query.limit;
		var offset = req.query.offset;
		var to = req.query.to;
		var result = [];


		if(anio!="loadInitialData"){
			contacts.forEach(function(value){
				if(((value.year == anio && (!from && !to)) || (value.year == anio && (value.year >= from && value.year <= to))) || ((value.city == anio && (!from && !to)) || (value.city == anio && (value.year>= from && value.year <= to)))) {
					result.push(value);
				}
			});
		
			if(result.length!=0){
				if(limit && offset){
					res.send(result.slice(offset, limit));
				}else{
					res.send(result);
				}
			}else{
				res.sendStatus(404);
			}

		}else{
			contacts = JSON.parse(JSON.stringify(contacts1));
			//contacts.concat();
			console.log("New load initial data");
			res.sendStatus(200);
		}	

		
	}else{
		res.sendStatus(401);
	}	
});

app.get("/api/v1/consumissions/:city/:anio",(req,res)=>{
	console.log("---------    Mostrar 1");
	console.log(contacts1);
	var apikey = req.query.apikey;
	if(apikey == uuid){
		var city = req.params.city;
		var anio = req.params.anio;
		//console.log("new GET of resource "+ anio+ " - "+ mes);
		var result = "";


		contacts.forEach(function(value){
			if(value.city == city && value.year == anio){
				result = value;
			}
		});
		if(result != "")
			res.send(result);
		else
			res.sendStatus(404);	
	}else{
		res.sendStatus(401);
	}
});

/////////////////////////////////PUT

app.put("/api/v1/consumissions",(req,res)=> {
	console.log("---------    Actualizar error");
	console.log(contacts1);
	var apikey = req.query.apikey;
	if(apikey == uuid){
		res.sendStatus(405);
	}else{
		res.sendStatus(401);
	}
});

app.put("/api/v1/consumissions/:city/:anio",(req,res)=>{
	console.log("---------    Actualizar uno");
	console.log(contacts1);
	var apikey = req.query.apikey;
	var city = req.params.city;
	var anio = req.params.anio;
	var contact = req.body;
	var ok = false;
	if(apikey == uuid){	
		if(contact.year <2000){
			res.sendStatus(409);
			return;
		}else if(contact.year != anio||contact.city != city){
			res.sendStatus(400);
			return;
		}else{
			contacts.forEach(function(value, key){
				if(value.year == anio && value.city == city){
					contacts[key] = contact;			
					ok = true
				}
			});
		}

		if(ok == true)
			res.sendStatus(200);
		else
			res.sendStatus(404);;	
	}else{
		res.sendStatus(401);
	}		
});

/////////////////////////////////POST

app.post("/api/v1/consumissions/:anio",(req,res)=>{
	console.log("---------    Grabar error 2");
	console.log(contacts1);

	var apikey = req.query.apikey;
	
	if(apikey == uuid){
		res.sendStatus(405);
	}else{
		res.sendStatus(401);
	}	
	
});

app.post("/api/v1/consumissions/:anio/:city",(req,res)=>{
	console.log("---------   Grabar error");
	console.log(contacts1);
	var apikey = req.query.apikey;

	if(apikey == uuid){
	//console.log("New intent of POST of resource");
		res.sendStatus(405);
	}else{
		res.sendStatus(401);
	}
});

app.post("/api/v1/consumissions",(req,res)=>{
	console.log("---------    Grabar uno");
	console.log(contacts1);
	var apikey = req.query.apikey;
	var cantidad_atributos=JSON.stringify(req.body).split(",").length;
	var cantidad = cantidad_atributos.toString();


	if(apikey == uuid){
		var contact = req.body;
		var ok = true;

		if(req.body.city === undefined || req.body.year === undefined || req.body.month === undefined || req.body.category === undefined || req.body.theme === undefined || cantidad !== "5"){
			res.sendStatus(400);
		}

		contacts.forEach(function(value, key){
			if(value.year == contact.year && value.city == contact.city){
				ok =  false;
			}
		});
		
		if(!ok){
			res.sendStatus(409);
		}else{
			contacts.push(contact);
			//console.log("New POST of resource "+contact.name);
			res.sendStatus(201);
			
		}	
	}else{
		res.sendStatus(401);
	}
});

/////////////////////////////////DELETE

app.delete("/api/v1/consumissions",(req,res)=>{
	console.log("---------    Borrar todo");
	console.log(contacts1);
	//console.log("New Delete of resources");
	var apikey = req.query.apikey;

	if(apikey == uuid){
		contacts = [];
		res.sendStatus(200);
	}else{
		res.sendStatus(401);
	}
});

app.delete("/api/v1/consumissions/:city",(req,res)=>{
	console.log("---------    Borrar una ciudad");
	console.log(contacts1);
	//console.log("New DELETE of resource");
	var apikey = req.query.apikey;

	if(apikey == uuid){
		var city = req.params.city;
		
		
		var suplente = [];

		contacts.forEach(function(value, key){
			if(value.city != city){
				suplente.push(value);			
				
			}

		});
		if(suplente.length == contacts.length){
			res.send(404);
		}
		
		else{
		if(suplente.length==0){
			contacts = [];
			res.sendStatus(200);
		}else{
			contacts = suplente;
			res.sendStatus(200);
		}}
	}else{
		res.sendStatus(401);
	}	
});

app.delete("/api/v1/consumissions/:city/:year",(req,res)=>{
	console.log("---------    Borrar un recurso");
	console.log(contacts1);

	var apikey = req.query.apikey;

	if(apikey == uuid){
		console.log("New DELETE of resource");
		var anio = req.params.year;
		var city = req.params.city;
		var ok = false;

		contacts.forEach(function(value, key){
			if(value.year == anio && value.city == city){
				contacts.splice(key,1);
				ok = true;
			}
		});
		if(ok == true)
			res.sendStatus(200);
		else
			res.sendStatus(404);
		
	}else{
		res.sendStatus(401);
	}	
});


app.listen(process.env.PORT|| 10000);