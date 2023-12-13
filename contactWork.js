const request = require('request');
require('dotenv').config()
const { token_type,access_token} = require('./token.json');

function addContact(query){
    request.post(
        {
            url: `https://zell03.amocrm.ru/api/v4/contacts`,
            headers: 
            {
                'Authorization': `${token_type} ${access_token}`,
                'Content-Type': 'application/json',
            },
            form:
            {'contacts':[{
                
                "name":`${query.name}`,
                "first_name":`${query.name}`,
                "last_name":`${query.name}`,
            }]
                
        },
    },
        (err,responce,body)=>
        {
            console.log(console.log('body =>'+body+'\n err =>'+err));
            console.log('\ncontact added')
            addLead(query,body.split('"id":')[1].split(',')[0])
        })
    
    
}
function getContact(query){
    request.get(
        {
            url: ` https://zell03.amocrm.ru/api/v4/contacts?query=${query.phone}`,
            headers: 
            {
                'Authorization': `${token_type} ${access_token}`,
            }
        },
        (err,responce,body)=>
        {
            console.log('body =>'+body+'\n err =>'+err);
            if(!body)
                addContact(query);
            else 
                updateContact(query,body.split('"id":')[1].split(',')[0]);
        })
    }
function addLead(query,res){
        request.post(
            {
                url: `https://zell03.amocrm.ru/api/v4/leads`,
                headers: 
                {
                    'Authorization': `${token_type} ${access_token}`,
                    'Content-Type': 'application/json',
                },
                form: {
                    "leads":[{
                        "name":`сделка с ${query.name}`,
                        "price":`${res}`,
                        "responsible_user_id":10439998,
                        }]     
            },
        },
        
            (err,responce,body)=>
            {
                console.log('body =>'+body+'\n err =>'+err);
            })
    }

    function updateContact(query,res){
      
        request.patch(
            {
                url: `https://zell03.amocrm.ru/api/v4/contacts/${res}`,
                headers: 
                {
                    'Authorization': `${token_type} ${access_token}`,
                    'Content-Type': 'application/json',
                },
                form:
                {
                    "name":`${query.name}`,
                    "first_name":"test",
                    "last_name":"test",
                    "custom_fields_values":
                        [{
                           
                         
                            "field_code":"PHONE",
                         
                            "values":
                                [{
                                    "value":`${query.phone}`,
                                   
                                    "enum_code":"WORK"
                                }]},
                            {
                               
                              
                                "field_code":"EMAIL",
                               
                                "values":
                                    [{
                                        "value":`${query.email}`,
                                       
                                        "enum_code":"WORK"
                                    }]},
                            {
                            
                            "field_code":"POSITION",
                           
                            "values":
                                [{
                                    "value":"wwwwwww"
                                }]
                            }],
                        }
            
            },(err,responce,body)=>{
                
                addLead(query,body.split('"id":')[1].split(',')[0])
                console.log('body =>'+body+'\n err =>'+err);
            }
        )
    }
    module.exports = {getContact}
    