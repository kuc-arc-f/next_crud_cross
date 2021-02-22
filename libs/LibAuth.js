// LibAuth
//
export default {
  get_user: function(mail , users){
    try{
      var ret = null
      users.forEach(function(item){
//            console.log(item.id );
        if(item.mail === mail){
          ret = item
        }
      });      
//console.log(items)
      return ret
    } catch (e) {
      console.error(e);
      throw new Error('Error , get_user');
    }        
  },
  /*
  valid_user: function(user, mail ,password){
    var ret = null
    if (bcrypt.compareSync(password,  user.password )){
        ret = true
    }    
    return ret
  },
  */

}
