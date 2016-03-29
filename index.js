var express = require ("express");
var bodyParser = require("body-parser");
var fs = require ("fs");

var app = express();

var contacts = [{year: 2015, month: "January",country: "Spain", category : 1, theme: "resort" },{year: 2017, month: "March",country: "Spain", category : 2, theme: "spa" },{year: 2017, month: "January",country: "Spain", category : 1, theme: "resort" },{year: 2015, month: "April", country: "Spain", category : 1, theme: "resort" },{year: 2016, month: "January",country: "Germany", category : 3, theme: "resort" }];
var contacts1 = [{year: 2015, month: "January",country: "Spain", category : 1, theme: "resort" },{year: 2017, month: "March",country: "Spain", category : 2, theme: "spa" },{year: 2017, month: "January",country: "Spain", category : 1, theme: "resort" },{year: 2015, month: "April", country: "Spain", category : 1, theme: "resort" },{year: 2016, month: "January",country: "Germany", category : 3, theme: "resort" }];
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
			if(((value.year == anio && (!from && !to)) || (value.year == anio && (value.category >= from && value.category <= to))) || ((value.month == anio && (!from && !to)) || (value.month == anio && (value.category >= from && value.category <= to)))) {
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
app.get("/api/v1/consumissions/:anio/:mes",(req,res)=>{
	var anio = req.params.anio;
	var mes = req.params.mes;
	//console.log("new GET of resource "+ anio+ " - "+ mes);
	var result;


	contacts.forEach(function(value){
		if(value.year == anio && value.month == mes){
			result = value;
		}
	});
	if(result.length!=0)
		res.send(result);
	else
		res.sendStatus(404);	
});
app.put("/api/v1/consumissions",(req,res)=> {
	res.sendStatus(405);
});
app.put("/api/v1/consumissions/:anio/:mes",(req,res)=>{
	//console.log("new PUT of resource");
	var anio = req.params.anio;
	var mes = req.params.mes;
	var contact = req.body;
	var ok = false;
	contacts.forEach(function(value, key){
		if(value.year == anio && value.month == mes){
			contacts[key] = contact;			
			ok = true
		}

	});
	if(ok == true)
		res.sendStatus(200);
	else
		res.sendStatus(404);			
})

app.post("/api/v1/consumissions/:anio",(req,res)=>{
	//console.log("New intent of POST of resource");
	res.sendStatus(405);

});
app.post("/api/v1/consumissions/:anio/:mes",(req,res)=>{
	//console.log("New intent of POST of resource");
	res.sendStatus(405);

});
app.post("/api/v1/consumissions",(req,res)=>{
	var contact = req.body;
	contacts.push(contact);
	//console.log("New POST of resource "+contact.name);
	res.sendStatus(201);
});
app.delete("/api/v1/consumissions/:anio/:mes",(req,res)=>{
	//console.log("New DELETE of resource");
	var anio = req.params.anio;
	var mes = req.params.mes;
	var ok = false;

	contacts.forEach(function(value, key){
		if(value.year == anio && value.month == mes){
			contacts.splice(key,1);
			ok = true;
		}
	});
	if(ok == true)
		res.sendStatus(200);
	else
		res.sendStatus(404);
});



app.delete("/api/v1/consumissions",(req,res)=>{
	//console.log("New Delete of resources");
	contacts.splice(0,contacts.length);
	res.sendStatus(200);
});
app.listen(process.env.PORT|| 10000);