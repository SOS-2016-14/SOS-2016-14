var express = require ("express");
var fs = require ("fs");

var app = express();

app.get("/about",(req,res) => {
	console.log("executing");
	
	res.write ("<html><body>Pagina presentacion de Jaime Herrera Y Jose Llopis <ul> ");
	res.write ("<li>Jaime Herrera Varo </li>");
	res.write ("<li>Jose Llopis </li></ul><a href='finofilipino.org'>Enlace</a></body></html>");
	res.end();
});


app.listen(process.env.PORT);