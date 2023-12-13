const express = require('express');
require('dotenv').config()
const app = express();
const querystring = require('querystring'); 
const { getContact} = require('./contactWork');
app.get('',(req,res)=>
{
    
   const param = querystring.parse(req.url.slice(2));
   getContact(param);
   res.end('ok')
   
})

app.listen(process.env.PORT, ()=>
{
console.log(`server started on port: ${process.env.PORT}`);
})