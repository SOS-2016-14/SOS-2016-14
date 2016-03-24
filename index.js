var express = require ("express");
var fs = require ("fs");

var app = express();
app.get("/",(req,res) => {
	console.log("executing");

	res.write ("Página presentación de Jaime Y Jose");
	res.end();
});

app.listen(process.env.PORT);