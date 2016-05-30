var express = require ("express");
var bodyParser = require("body-parser");
var fs = require ("fs");
var app = express();
var request =require("request");
var cors = require("cors");
var governify = require("governify");



var contacts = [{year: 2015, month: "January",city: "Sevilla", category : 5, theme: "resort" },{year: 2017, month: "March",city: "Madrid", category : 1, theme: "spa" },{year: 2017, month: "January",city: "Toledo", category : 4, theme: "resort" },{year: 2022, month: "April", city: "Granada", category : 3, theme: "resort" },{year: 2017, month: "January",city: "Huelva", category : 2, theme: "resort" }];
const contacts1 = JSON.parse(JSON.stringify(contacts));

var uuid = "b3b1f308-20e2-65b2-7fa7-4ef28fe78030";


app.use("/",express.static(__dirname));
app.use("/",express.static(__dirname + '/static'));
app.use("/RESTClient",express.static(__dirname + '/RESTClient'));

app.use("/consumissions",express.static(__dirname + '/static/consumissions'));
app.use("/api1",express.static(__dirname + '/static/api1'));
app.use("/api2",express.static(__dirname + '/static/api2'));
app.use("/api3",express.static(__dirname + '/static/api3'));
app.use("/api4",express.static(__dirname + '/static/api4'));
app.use("/api4",express.static(__dirname + '/static/api4'));
app.use("/api5",express.static(__dirname + '/static/api5'));

//////////////////////////////////////////////////////////// PROXYS


app.use(cors());

var pathsJaime='/contacts';
var apiServerHost = 'http://sos-contacts.herokuapp.com';
app.use(pathsJaime, function(req,res){
	var url = apiServerHost + req.baseUrl + req.url;

	req.pipe(request(url,(error,response,body)=>{
		if(error){
			res.sendStatus(503);
		}
	})).pipe(res);
});


app.use("/tiempo", function(req, res) {
	var q = req.query.q;
	var paths1='/data/2.5/weather?q='+q+'&APPID=537fae442cf69dd0a1e985b9aa6119c0'; 
	var apiServerHost1 = 'http://api.openweathermap.org';
  	
  	var url = apiServerHost1 + paths1;
  	console.log('piped: '+url);

	req.pipe( request(url,function(error, response, body){

	    if (error) {
	         console.log(error);
	        res.sendStatus(503); 
	       console.log("OK");
	     }
	 })
	 ).pipe(res);

  });

var paths2='/3/movie/550?api_key=02fe27f8f0aa317dc4be826a2639a623'; 
var apiServerHost2 = 'https://api.themoviedb.org';


app.use("/films", function(req, res) {
  var url = apiServerHost2 + paths2;
  console.log('piped: '+url);


  req.pipe( request(url,function(error, response, body){

    if (error) {
         console.log(error);
        res.sendStatus(503); 
       console.log("OK");
     }
 })
 ).pipe(res);

  });

	var path3 = '/api/v1/locations';
    var apiServerHost3 = 'http://sos-2016-05.herokuapp.com';

    app.use(path3,function(req,res){
      var url = apiServerHost3 + path3 + req.url;
      console.log("Piped: "+ req.baseUrl + req.url);
      console.log("URL Accesed: "+ url);

      req.pipe(request(url,(error,response,body)=>{
        if(error){
          console.error(error);
          res.sendStatus(503);
        }
      })).pipe(res);
    });

var path4 = '/api/v1/gold-medals';
    var apiServerHost4 = 'http://sos-2016-05.herokuapp.com';

    app.use(path4,function(req,res){
      var url = apiServerHost4 + path4 + req.url;
      console.log("Piped: "+ req.baseUrl + req.url);
      console.log("URL Accesed: "+ url);

      req.pipe(request(url,(error,response,body)=>{
        if(error){
          console.error(error);
          res.sendStatus(503);
        }
      })).pipe(res);
    });


app.use(bodyParser.json());
/////////////////////////////////GOVERNIFY JAIME

//multiPlan_C1_sos-2016-14-jhv_ag
//multiPlan_C4_sos-2016-14-jhv_ag
governify.control(app,{
	datastore : "http://datastore.governify.io/api/v6.1/",
	namespace : "sos-2016-14-jhv",
	defaultPath : "/api"
})


/////////////////////////////////TIME
app.get("/time",function (req,res){
  var time=Date();
    res.send("What time is it?   ->   "+time);
  });





/////////////////////////////////GET

app.get("/api/v1/consumissions",(req,res)=> {
	
	
	var from = req.query.from;
	var to = req.query.to;
	var all = req.query.all;
	var search = req.query.search;
	var apikey = req.query.apikey;
	
	
		//console.log("new GET of resource consumissions");
		var result = [];
		var i = [];
		contacts.forEach(function(value,key){
			if(search == ""|| all == 1){
				i.push(value);
			}else{
				if(search == value.year || search == value.city){
					i.push(value);	
				}
			}
		});

		
		if(all != 1){
			i.forEach(function(value,key){
				if(key+1 >= from && key+1 <= to){
					result.push(value);	
				}
			});
		}else{
			result = i;
		}
		
		var final = { 
			result: result, 
			total: i.length
		}

		res.send(final);
		
		
});

app.get("/api/v1/consumissions/:anio",(req,res)=>{
	console.log("---------    Mostrar por año");
	console.log(contacts1);
	var apikey = req.query.apikey;
	
		var anio = req.params.anio;
		var from = req.query.from;
		var limit = req.query.limit;
		var offset = req.query.offset;
		var to = req.query.to;
		var result = [];


		if(anio!="loadInitialData"){
			contacts.forEach(function(value){
				if(((value.year == anio && (!from && !to)) || (value.year == anio && (value.year >= from && value.year <= to))) || ((value.city == anio && (!from && !to)) || (value.city == anio && (value.year>= from && value.year <= to)))) {
					result.push(value);
				}
			});
		
			if(result.length!=0){
				if(limit && offset){
					res.send(result.slice(offset, limit));
				}else{
					res.send(result);
				}
			}else{
				res.sendStatus(404);
			}

		}else{
			contacts = JSON.parse(JSON.stringify(contacts1));
			//contacts.concat();
			console.log("New load initial data");
			res.sendStatus(200);
		}	

		
		
});

app.get("/api/v1/consumissions/:city/:anio",(req,res)=>{
	console.log("---------    Mostrar 1");
	console.log(contacts1);
	var apikey = req.query.apikey;
	
		var city = req.params.city;
		var anio = req.params.anio;
		//console.log("new GET of resource "+ anio+ " - "+ mes);
		var result = "";


		contacts.forEach(function(value){
			if(value.city == city && value.year == anio){
				result = value;
			}
		});
		if(result != "")
			res.send(result);
		else
			res.sendStatus(404);	
	
});

/////////////////////////////////PUT

app.put("/api/v1/consumissions",(req,res)=> {
	console.log("---------    Actualizar error");
	console.log(contacts1);
	var apikey = req.query.apikey;
	
		res.sendStatus(401);
	
});

app.put("/api/v1/consumissions/:city/:anio",(req,res)=>{
	console.log("---------    Actualizar uno");
	console.log(contacts1);
	var apikey = req.query.apikey;
	var city = req.params.city;
	var anio = req.params.anio;
	var contact = req.body;
	var ok = false;
		
		if(contact.year <2000){
			res.sendStatus(409);
			return;
		}else if(contact.year != anio||contact.city != city){
			res.sendStatus(400);
			return;
		}else{
			contacts.forEach(function(value, key){
				if(value.year == anio && value.city == city){
					contacts[key] = contact;			
					ok = true
				}
			});
		}

		if(ok == true)
			res.sendStatus(200);
		else
			res.sendStatus(404);;	
			
});

/////////////////////////////////POST

app.post("/api/v1/consumissions/:anio",(req,res)=>{
	console.log("---------    Grabar error 2");
	console.log(contacts1);

	var apikey = req.query.apikey;
	
	
		res.sendStatus(405);
	
	
});

app.post("/api/v1/consumissions/:anio/:city",(req,res)=>{
	console.log("---------   Grabar error");
	console.log(contacts1);
	var apikey = req.query.apikey;

	
	//console.log("New intent of POST of resource");
		res.sendStatus(405);
	
});

app.post("/api/v1/consumissions",(req,res)=>{
	console.log("---------    Grabar uno");
	console.log(contacts1);
	var apikey = req.query.apikey;
	var cantidad_atributos=JSON.stringify(req.body).split(",").length;
	var cantidad = cantidad_atributos.toString();


	
		var contact = req.body;
		var ok = true;

		if(req.body.city === undefined || req.body.year === undefined || req.body.month === undefined || req.body.category === undefined || req.body.theme === undefined || cantidad !== "5"){
			res.sendStatus(400);
		}

		contacts.forEach(function(value, key){
			if(value.year == contact.year && value.city == contact.city){
				ok =  false;
			}
		});
		
		if(!ok){
			res.sendStatus(409);
		}else{
			contacts.push(contact);
			//console.log("New POST of resource "+contact.name);
			res.sendStatus(201);
			
		}	
	
});

/////////////////////////////////DELETE

app.delete("/api/v1/consumissions",(req,res)=>{
	console.log("---------    Borrar todo");
	console.log(contacts1);
	//console.log("New Delete of resources");
	

	
		contacts = [];
		res.sendStatus(200);
	
});

app.delete("/api/v1/consumissions/:city",(req,res)=>{
	console.log("---------    Borrar una ciudad");
	console.log(contacts1);
	//console.log("New DELETE of resource");
	var apikey = req.query.apikey;

	
		var city = req.params.city;
		
		
		var suplente = [];

		contacts.forEach(function(value, key){
			if(value.city != city){
				suplente.push(value);			
				
			}

		});
		if(suplente.length == contacts.length){
			res.send(404);
		}
		
		else{
		if(suplente.length==0){
			contacts = [];
			res.sendStatus(200);
		}else{
			contacts = suplente;
			res.sendStatus(200);
		}}
		
});

app.delete("/api/v1/consumissions/:city/:year",(req,res)=>{
	console.log("---------    Borrar un recurso");
	console.log(contacts1);

	var apikey = req.query.apikey;

	
		console.log("New DELETE of resource");
		var anio = req.params.year;
		var city = req.params.city;
		var ok = false;

		contacts.forEach(function(value, key){
			if(value.year == anio && value.city == city){
				contacts.splice(key,1);
				ok = true;
			}
		});
		if(ok == true)
			res.sendStatus(200);
		else
			res.sendStatus(404);
		
		
});


app.listen(process.env.PORT|| 10000);