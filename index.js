var express = require ("express");
var fs = require ("fs");

var app = express();

app.get("/about",(req,res) => {
	console.log("executing");
	
	res.write ("<html><body><center>Pagina presentacion de Jaime Herrera Y Jose Llopis <ul> ");
	res.write ("<li>Jaime Herrera Varo <br> <a href='https://github.com/jaimeweed'>GitHub</a></li>");
	res.write ("<li>Jose Llopis <br> <a href='https://github.com/siryopas'>GitHub</a></li></ul></center></body></html>");
	res.end();
});


app.listen(process.env.PORT);