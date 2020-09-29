const axios = require('axios')
exports.editProductPage = async (req, res) => {
  let availableOrder = [];
  let withoutOrder = [];
  let largest= 0;
  const getProducts = await axios.get(`${req.protocol}://${req.get('host')}/api/products`);
  if(getProducts.data){
    for(let i = 0 ; i < getProducts.data.length; i++){
      availableOrder.push( parseInt(getProducts.data[i].order) )
    }
    for (i = 0; i <= availableOrder.length; i++ ){
        if (availableOrder[i]>largest) {
           largest=availableOrder[i];
        }
    }
  }
  largest += 1
  let available = [];
  if(getProducts.data[0] != undefined && getProducts.data[0] != null){
    available = getProducts.data[0].withoutOrder
  }
  if(available != null && available != undefined){
    available = available.filter((a, b) => available.indexOf(a) === b)
  }
  if(req.session.username && req.session.username.type == 'SUPER_ADMIN'){
    res.render('add-product',{
      label : 'Edit Product',
      label_btn : 'Update',
      user_data : req.session.username,
      image_label : 'Update image',
      availableOrder : available,
    });
  }
  else{
    res.redirect('/');
  }
};
