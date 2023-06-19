const express = require('express')
const morgan = require('morgan')
let unirest = require('unirest');

const app = express();
app.listen(3000,(req,res)=>{
    console.log('listening on port 3000')
})
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('index')
})
app.post('/send',(req,res)=>{
    let request = unirest('POST', 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest')
    .headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer MGaGkWC5sSemjkDi9cBKQYqN2ZlL'
    })
    .send(JSON.stringify({
        "BusinessShortCode": 8591268,
        "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjMwNjE5MTYyMTA0",
        "Timestamp": "20230619162104",
        "TransactionType": "CustomerPayBillOnline",
        "Amount": req.body.amount,
        "PartyA":req.body.name ,
        "PartyB":8591268,
        "PhoneNumber": req.body.phone,
        "CallBackURL": "https://mpesa-lht1.onrender.com/",
        "AccountReference": "Sneaker kenya",
        "TransactionDesc": "Payment of sneakers " 
      }))
    .end(res => {
        if (res.error) throw new Error(res.error);
        console.log(res.raw_body);
    });
})
