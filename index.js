var express = require ("express");
var fs = require ("fs");
var contacts = [];
var app = express();
app.get("/", (req,res)=>{
	fs.readFile('contacts.json','utf8',(err,content)=>{
		console.log("Data read");
		contacts = JSON.parse(content);
		res.write("<html><body>___Contacts___<ul>");
		contacts.forEach((contact) => {
			res.write("<li> - "+contact.name+" ("+contact.phone+")</li>");

		});
		res.write("</ul>______________</body></html>");
		res.end();
	});
});

app.listen(process.env.PORT);