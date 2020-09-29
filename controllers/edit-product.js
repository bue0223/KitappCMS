const axios = require('axios')
exports.editProductPage = async (req, res) => {
  let availableOrder = [];
  let withoutOrder = [];
  let largest= 0;
  const getProducts = await axios.get(`${req.protocol}://${req.get('host')}/api/products`);
  //remove console log if not needed.
  if(getProducts.data){
    for(let i = 0 ; i < getProducts.data.length; i++){ //add null and undefined checker getProducts and getProducts.data
      availableOrder.push( parseInt(getProducts.data[i].order) )
    }
    for (i = 0; i <= availableOrder.length; i++ ){ //add null checker for availableOrder
        if (availableOrder[i]>largest) {
           largest=availableOrder[i];
        }
    }
  }
  largest += 1
  let available = [];
  //remove console log if not needed.
  if(getProducts.data[0] != undefined && getProducts.data[0] != null){
    available = getProducts.data[0].withoutOrder
  }
  //remove console log if not needed.
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
