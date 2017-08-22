var express = require('express');
var app = express();
var fortunes = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple.",
];
app.set('port',process.env.PORT||3000);
app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
	// res.type('text/plain');
	// res.send('Meadowlark Travel');
	res.render('home');
});
//about 通配符
app.get('/about*',function(req,res){
	// res.type('text/plain');
	// res.send('About Meadowlark Travel');
	var randomFortune = 
			fortunes[Math.floor(Math.random()*fortunes.length)];
	console.log(randomFortune);
	res.render('about',{fortunes:randomFortune});
});
//定制404页面
app.use(function(req,res){
	// res.type('text/plain');
	// res.send('404-Not Found');
	res.status(404);
	res.render('404');
});
//定制500页面
app.use(function(err,req,res,next){
	console.error(err.stack);
	res.type("text/plain");
	res.send('500-Server Error');
	res.status(500);
	res.render('500');
});
app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost:'+
		app.get('port')+';press Ctrl-C to terminate');
});
var handlebars = require('express3-handlebars')
		.create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');