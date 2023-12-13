const request = require('request');
const fs = require('fs')
require('dotenv').config()
const { refresh_token} = require('./token.json')

 function getToken(){
request.post(
    {
        url: `${process.env.URL}`,
        form: {
            'client_id': `${process.env.ID}`,
            'client_secret': `${process.env.SECRET}`,
            'grant_type': 'authorization_code',
            'code': `${process.env.AUTH}`,
            'redirect_uri': `${[process.env.REDIRECT]}`,
              }
    },
    (err,responce,body)=>
    {
        fs.writeFile('./token.json',body,()=>{console.log('token writed');})
    })
}
function RefreshToken(){
    request.post(
    {
        url: `${process.env.URL}`,
        form: {
            'client_id': `${process.env.ID}`,
            'client_secret': `${process.env.SECRET}`,
            'grant_type': 'refresh_token',
            'refresh_token': `${refresh_token}`,
            'redirect_uri': `${[process.env.REDIRECT]}`,
              }
    },
    (err,responce,body)=>
    {
        fs.writeFile('./token.json',body,()=>{console.log('token token refreshed');})
    })
}
module.exports = {
    RefreshToken,
    getToken
}
//RefreshToken();
getToken();