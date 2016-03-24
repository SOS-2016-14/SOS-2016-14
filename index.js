var express = require ("express");
var fs = require ("fs");

var app = express();

app.get("/about",(req,res) => {
	console.log("executing");
	
	res.write ("<html><head><style type="text/css"></style></head><body>Pagina presentacion de Jaime Herrera Y Jose Llopis <ul> ");
	res.write ("<li>Jaime Herrera Varo </li></ul></body></html>");

	res.end();
});


app.listen(process.env.PORT);