const axios = require('axios')
exports.messageEditPage = async (req, res) => {
  let messages = await axios.post(`${req.protocol}://${req.get('host')}/api/messages/${req.params.id}`);
  if(!messages) {
    console.log('INFO_ERR')
  }
  if(req.session.username && req.session.username.type == 'SUPER_ADMIN'){
    res.render('edit-messages', {
      messages : messages.data.payload,
      user_data : req.session.username
    });
  }
  else{
    res.redirect('/');
  }
};
