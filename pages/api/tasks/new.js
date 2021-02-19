var csrf = require('csrf');
var tokens = new csrf();

//
export default async function (req, res){
  try{
//console.log(req.body);
    var data = req.body
    var token =data._token
    if(tokens.verify(process.env.CSRF_SECRET, token) === false){
      throw new Error('Invalid Token, csrf_check');
    }    
    var content = "tasks"
    const response = await fetch(process.env.API_URL + '/api/post/create/' + content, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',  'apikey': process.env.API_KEY
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      res.json(data)
    } else {
      throw new Error(await response.text());
    }       
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};