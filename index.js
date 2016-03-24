var express = require ("express");
var fs = require ("fs");

var app = express();
app.get("/",(req,res) => {
	console.log("executing");

	res.write ("Página presentación de Jaime Y Jose");
	res.end();
});
app.get("/about",(req,res) => {
	console.log("executing");

	res.write ("Presentation page of Jaime Herrera Varo and Jose Llopis Zapata, we will conduct an analysis that compares the temperature with the hotel occupancy");
	res.end();
});
app.get("/about/consumissions",(req,res) => {
	console.log("executing");

	res.write ("Presentation page of Jaime Herrera Varo. Im analizing the hotel room ocupation for our project");
	res.end();
});
/app.get("/", function(request, response) {

  response.redirect('www.github.com/jaimeweed');

});/
app.listen(process.env.PORT);