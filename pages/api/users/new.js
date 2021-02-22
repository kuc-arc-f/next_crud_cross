const bcrypt = require('bcrypt');
var csrf = require('csrf');
var tokens = new csrf();

//
export default async function (req, res){
  try{
    var data = req.body
    let hashed_password = bcrypt.hashSync(data.password, 10);
// console.log(data);
    if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    }   
    var item = {
      mail: data.mail,
      password: hashed_password,
      name: data.name,
      created_at: new Date(),
    }    
console.log(item);
    var content = "users"
    const response = await fetch(process.env.API_URL + '/api/post/create/' + content, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',  'apikey': process.env.API_KEY
      },
      body: JSON.stringify(item),
    });
    if (response.status === 200) {
      res.json(data)
    } else {
      throw new Error(await response.text());
    }
/*
    const collection = await LibMongo.get_collection("users" )
    await collection.insertOne(item); 
    var ret ={
      item: item
    }
    res.json(ret);
*/
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};