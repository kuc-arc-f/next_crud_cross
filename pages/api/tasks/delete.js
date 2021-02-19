//
export default async function (req, res){
  try{
//console.log(req.body);
    var data = req.body
    var item = {
      id: data.id,
    };    
    var content = "tasks"
    const response = await fetch(process.env.API_URL + '/api/post/delete/' + content, {
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
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};