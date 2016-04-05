var express = require ("express");
var bodyParser = require("body-parser");
var fs = require ("fs");
var app = express();

var contacts = [{year: 2015, month: "January",city: "Sevilla", category : 1, theme: "resort" },{year: 2017, month: "March",city: "Madrid", category : 2, theme: "spa" },{year: 2017, month: "January",city: "Sevilla", category : 1, theme: "resort" },{year: 2015, month: "April", city: "Sevilla", category : 1, theme: "resort" },{year: 2016, month: "January",city: "Madrid", category : 3, theme: "resort" }];
var contacts1 = [{year: 2015, month: "January",city: "Sevilla", category : 1, theme: "resort" },{year: 2017, month: "March",city: "Madrid", category : 2, theme: "spa" },{year: 2017, month: "January",city: "Sevilla", category : 1, theme: "resort" },{year: 2015, month: "April", city: "Sevilla", category : 1, theme: "resort" },{year: 2016, month: "January",city: "Madrid", category : 3, theme: "resort" }];

var uuid = "b3b1f308-20e2-65b2-7fa7-4ef28fe78030";

app.use(bodyParser.json());

app.get("/about",(req,res) => {
	//console.log("executing");
	var apikey = req.query.apikey;
	if(apikey == uuid){
		res.write ("<html><body><center>Presentation page of Jaime Herrera and Jose Llopis <ul> ");
		res.write ("<li>Jaime Herrera Varo <br> <a href='https://github.com/jaimeweed'>GitHub</a><br> <a href='http://sos-2016-14.herokuapp.com/api/v1/consumissions'>API</a></li>");
		res.write ("<li>Jose Llopis <br> <a href='https://github.com/siryopas'>GitHub</a></li></ul></center></body></html>");
		res.end();
	}else{
		res.sendStatus(401);
	}
});

app.get("/api/v1/consumissions",(req,res)=> {
	var apikey = req.query.apikey;
	if(apikey == uuid){
		//console.log("new GET of resource consumissions");
		res.send(contacts);
	}else{
		res.sendStatus(401);
	}	
});

app.get("/api/v1/consumissions/:anio",(req,res)=>{
	var apikey = req.query.apikey;
	if(apikey == uuid){
		var anio = req.params.anio;
		var from = req.query.from;
		var to = req.query.to;
		var result = [];

		if(anio!="loadInitialData"){
			contacts.forEach(function(value){
				if(((value.year == anio && (!from && !to)) || (value.year == anio && (value.year >= from && value.year <= to))) || ((value.city == anio && (!from && !to)) || (value.city == anio && (value.year>= from && value.year <= to)))) {
					result.push(value);
				}
			});
		}else{
			contacts = contacts1;
			//contacts.concat();
			console.log("New load initial data");
			res.sendStatus(200);
		}	

		if(result.length!=0)
			res.send(result);
		else
			res.sendStatus(404);
	}else{
		res.sendStatus(401);
	}	
});

app.get("/api/v1/consumissions/:city/:anio",(req,res)=>{
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

app.put("/api/v1/consumissions",(req,res)=> {
	var apikey = req.query.apikey;
	if(apikey == uuid){
		res.sendStatus(405);
	}else{
		res.sendStatus(400);
	}
});

app.put("/api/v1/consumissions/:city/:anio",(req,res)=>{
	var apikey = req.query.apikey;
	var city = req.params.city;
	var anio = req.params.anio;
	var contact = req.body;
	var ok = false;
	if(apikey == uuid){	
		if(contact.year <2000){
			res.sendStatus(409);
		}

		contacts.forEach(function(value, key){
			if(value.year == anio && value.city == city){
				contacts[key] = contact;			
				ok = true
			}

		});

		if(ok == true)
			res.sendStatus(200);
		else
			res.sendStatus(404);;	
	}else{
		res.sendStatus(400);
	}		
});

app.post("/api/v1/consumissions/:anio",(req,res)=>{
	var apikey = req.query.apikey;

	if(apikey == uuid){
		res.sendStatus(405);
	}else{
		res.sendStatus(401);
	}	
	

});
app.post("/api/v1/consumissions/:anio/:city",(req,res)=>{
	var apikey = req.query.apikey;

	if(apikey == uuid){
	//console.log("New intent of POST of resource");
		res.sendStatus(405);
	}else{
		res.sendStatus(401);
	}
});
app.post("/api/v1/consumissions",(req,res)=>{
	var apikey = req.query.apikey;

	if(apikey == uuid){
		var contact = req.body;
		var ok = false;

		contacts.forEach(function(value, key){
			if(value.year == contact.year && value.city == contact.city && value.month == contact.month){
				ok = true;
			}
		});
		
		if(ok == false){
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

app.delete("/api/v1/consumissions",(req,res)=>{
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
			res.sendStatus(405);
	}else{
		res.sendStatus(401);
	}	
});




app.listen(process.env.PORT|| 10000);