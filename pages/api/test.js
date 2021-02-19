//
export default async function (req, res){
  try {
    var data = req.body
//console.log(typeof data)
    var content = "test_1"
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
//console.log(res.status)
  } catch (error) {
    res.status(500).send(); 
    console.error(error);
  }
};