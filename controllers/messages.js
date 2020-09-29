const axios = require('axios')
exports.messagePage = async (req, res) => {
  let messages = await axios.get(`${req.protocol}://${req.get('host')}/api/messages`)
  if(!messages) {
    console.log('INFO_ERR')
  }
  if(req.session.username && req.session.username.type == 'SUPER_ADMIN'){
    res.render('messages', {
      user_data : req.session.username,
      messages : messages.data.payload
    });
  }
  else{
    res.redirect('/');
  }
};
