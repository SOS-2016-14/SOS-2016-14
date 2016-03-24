var express = require ("express");
var fs = require ("fs");

var app = express();

app.get("/about",(req,res) => {
	console.log("executing");
	
	res.write ("<html><body>Pagina presentacion de Jaime Herrera Y Jose Llopis </body></html>");
	//res.write ("<li>Jaime Herrera Varo</li> <a href="https://github.com/jaimeweed"> Enlace a github </a></ul></body></html>");
	res.end();
});


app.listen(process.env.PORT);