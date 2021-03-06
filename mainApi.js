const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const api=require('./Razorpay_key');
const Razorpay = require('razorpay');
const rzp= new Razorpay({
	key_id:api.key,
	key_secret:api.secrete
	});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');


//index route of the server:
app.get('/',function(req,resp){
	resp.render('explorer.ejs',null);
});

//API explorer Route
app.post('/apiExplorer',(req,resp)=>{
	console.log(req.body);

	rzp.orders.create(req.body)
	.then((data)=>{
	
		resp.status(200).send(data);
		console.log(data);
	
	})
	.catch((data)=>{
	
		resp.status(400).send(data);
	});
});

//API to fech payments
app.get('/fetchPayment/:id',(req,resp)=>{

	rzp.payments.fetch(req.params.id)
	.then((data)=>{
		resp.status(200).send(data);
	})
	.catch((err)=>{
		resp.status(400).send(err);
	})
});


//Payment route:
app.use('/payment',require('./paymentsApi'));


const PORT = process.env.PORT || 3000
app.listen(PORT);
console.log(`localhost started on the PORT:${PORT}`);
