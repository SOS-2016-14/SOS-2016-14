var express = require ("express");
var fs = require ("fs");

var app = express();

app.get("/about",(req,res) => {
	console.log("executing");
	res.write ("Funciona!");
	//res.write (<html><body><center>"Pagina presentacion de Jaime Herrera Y Jose Llopis");
	//res.write (<ul><li>Jaime Herrera Varo</li><a href="https://github.com/jaimeweed">Enlace a github</a></ul></center></body></html>);
	res.end();
});


app.listen(process.env.PORT);