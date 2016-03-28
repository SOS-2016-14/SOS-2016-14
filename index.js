var express = require ("express");
var bodyParser = require("body-parser");
var fs = require ("fs");

var app = express();

var contacts = [{anio: 2017, mes: "Enero", categoria : 1},{anio: 2017, mes: "Febrero", categoria : 2},{anio: 2016, mes: "Febrero", categoria : 3}];

app.use(bodyParser.json());

app.get("/about",(req,res) => {
	//console.log("executing");
	
	res.write ("<html><body><center>Pagina presentacion de Jaime Herrera Y Jose Llopis <ul> ");
	res.write ("<li>Jaime Herrera Varo <br> <a href='https://github.com/jaimeweed'>GitHub</a><br> <a href='http://sos-2016-14.herokuapp.com/api/v1/consumissions'>API</a></li>");
	res.write ("<li>Jose Llopis <br> <a href='https://github.com/siryopas'>GitHub</a></li></ul></center></body></html>");
	res.end();
});
app.get("/api/v1/consumissions",(req,res)=> {
	//console.log("new GET of resource consumissions");
	res.send(contacts);
});
app.get("/api/v1/consumissions/:anio",(req,res)=>{
	var anio = req.params.anio;
	var from = req.query.from;
	var to = req.query.to;
	
	
	//console.log("new GET of resource "+ anio);
	var result = [];
		contacts.forEach(function(value){
		if((value.anio == anio && (!from && !to)) || (value.anio == anio && (value.categoria >= from && value.categoria <= to) )){
			result.push(value);
		}
	});
		
	if(result.length!=0)
		res.send(result);
	else
		res.sendStatus(404);
});
app.get("/api/v1/consumissions/:anio/:mes",(req,res)=>{
	var anio = req.params.anio;
	var mes = req.params.mes;
	//console.log("new GET of resource "+ anio+ " - "+ mes);
	var result = [];
	contacts.forEach(function(value){
		if(value.anio == anio && value.mes == mes){
			result.push(value);
		}
	});
	if(result.length!=0)
		res.send(result);
	else
		res.sendStatus(404);	
});
app.put("/api/v1/consumissions",(req,res)=> {
	//console.log("new GET of resource consumissions");
	res.sendStatus(405);
});
app.put("/api/v1/consumissions/:anio/:mes",(req,res)=>{
	//console.log("new PUT of resource");
	var anio = req.params.anio;
	var mes = req.params.mes;
	var contact = req.body;
	var ok = false;
	contacts.forEach(function(value, key){
		if(value.anio == anio && value.mes == mes){
			contacts[key] = contact;			
			ok = true
		}

	});
	if(ok == true)
		res.sendStatus(200);
	else
		res.sendStatus(405);			
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
		if(value.anio == anio && value.mes == mes){
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
})
app.listen(process.env.PORT|| 10000);