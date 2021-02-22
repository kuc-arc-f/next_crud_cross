const bcrypt = require('bcrypt');
var csrf = require('csrf');
var tokens = new csrf();

//
export default async (req, res) => {
  try{
    res.json({count: 0 })
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }  
}
