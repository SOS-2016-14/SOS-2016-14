var express = require ("express");
var bodyParser = require("body-parser");
var fs = require ("fs");

var app = express();

var contacts = [{year: 2015, month: "January",city: "Sevilla", category : 1, theme: "resort" },{year: 2017, month: "March",city: "Madrid", category : 2, theme: "spa" },{year: 2017, month: "January",city: "Sevilla", category : 1, theme: "resort" },{year: 2015, month: "April", city: "Sevilla", category : 1, theme: "resort" },{year: 2016, month: "January",city: "Madrid", category : 3, theme: "resort" }];
var contacts1 = [{year: 2015, month: "January",city: "Sevilla", category : 1, theme: "resort" },{year: 2017, month: "March",city: "Madrid", category : 2, theme: "spa" },{year: 2017, month: "January",city: "Sevilla", category : 1, theme: "resort" },{year: 2015, month: "April", city: "Sevilla", category : 1, theme: "resort" },{year: 2016, month: "January",city: "Madrid", category : 3, theme: "resort" }];
app.use(bodyParser.json());

app.get("/about",(req,res) => {
	//console.log("executing");
	
	res.write ("<html><body><center>Presentation page of Jaime Herrera and Jose Llopis <ul> ");
	res.write ("<li>Jaime Herrera Varo <br> <a href='https://github.com/jaimeweed'>GitHub</a><br> <a href='http://sos-2016-14.herokuapp.com/api/v1/consumissions'>API</a></li>");
	res.write ("<li>Jose Llopis <br> <a href='https://github.com/siryopas'>GitHub</a></li></ul></center></body></html>");
	res.end();
});


app.get("/api/v1/consumissions",(req,res)=> {
	//console.log("new GET of resource consumissions");
	res.send(contacts);
});

/*app.get("/api/v1/consumissions/loadInitialData",(req,res)=>{
	contacts = [];
	contacts.push(contacts1);
	contacts.concat();
	console.log("New load initial data");
	res.sendStatus(200);
});*/

app.get("/api/v1/consumissions/:anio",(req,res)=>{
	var anio = req.params.anio;
	var from = req.query.from;
	var to = req.query.to;
	
	console.log(from);
	console.log(to);
	//console.log("new GET of resource "+ anio);
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
	
});
app.get("/api/v1/consumissions/:city/:anio",(req,res)=>{
	var city = req.params.city;
	var anio = req.params.anio;
	//console.log("new GET of resource "+ anio+ " - "+ mes);
	var result = null;


	contacts.forEach(function(value){
		if(value.city == city && value.year == anio){
			result = value;
		}
	});
	if(result != null)
		res.send(result);
	else
		res.sendStatus(404);	
});
app.put("/api/v1/consumissions",(req,res)=> {
	res.sendStatus(405);
});
app.put("/api/v1/consumissions/:city/:anio",(req,res)=>{
	//console.log("new PUT of resource");
	var city = req.params.city;
	var anio = req.params.anio;
	
	var contact = req.body;
	var ok = false;
	contacts.forEach(function(value, key){
		if(value.year == anio && value.city == city){
			contacts[key] = contact;			
			ok = true
		}

	});
	if(ok == true)
		res.sendStatus(200);
	else
		res.send("Prueba");			
})

app.post("/api/v1/consumissions/:anio",(req,res)=>{
	//console.log("New intent of POST of resource");
	res.sendStatus(405);

});
app.post("/api/v1/consumissions/:anio/:city",(req,res)=>{
	//console.log("New intent of POST of resource");
	res.sendStatus(405);

});
app.post("/api/v1/consumissions",(req,res)=>{
	var contact = req.body;
	contacts.push(contact);
	//console.log("New POST of resource "+contact.name);
	res.sendStatus(201);
});

app.delete("/api/v1/consumissions",(req,res)=>{
	//console.log("New Delete of resources");
	contacts = [];
	res.sendStatus(200);
});

app.delete("/api/v1/consumissions/:city",(req,res)=>{
	//console.log("New DELETE of resource");
	
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
	}
	
	
	
	
}});

app.delete("/api/v1/consumissions/:city/:year",(req,res)=>{
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
});




app.listen(process.env.PORT|| 10000);