const bcrypt = require('bcrypt');
var csrf = require('csrf');
var tokens = new csrf();

import LibAuth from '../../../libs/LibAuth'
//
export default async (req, res) => {
  try{
    if (req.method === "POST") {
      var retArr= {ret:0, user_id:0}
      var data = req.body
//console.log(data)
      if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
        throw new Error('Invalid Token, csrf_check');
      } 
      var site_id = process.env.SITE_ID
      var url = process.env.API_URL +"/api/get/find?content=users&site_id=" +site_id      
      const response = await fetch(url)    
      const json = await response.json()
// console.log(json)
      var user = LibAuth.get_user( data.mail , json)
      if(user == null){
        throw new Error('error, get_user mail nothing');
      }
      if (bcrypt.compareSync(data.password,  user.password )){
          retArr.ret = 1
          user.password = ""
          retArr.user = user
          return res.json(retArr);
      }else{
        return res.json(retArr);
      } 
    }else{
      return res.status(404).send("");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }  
}
