const axios = require('axios')
exports.addProductPage = async (req, res) => {
  let availableOrder = [];
  let withoutOrder = [];
  const getProducts = await axios.get(`${req.protocol}://${req.get('host')}/api/products`);
  //remove console log if not needed.
  //add null and undefined checker for getProducts and getProducts.data
  if(getProducts.data){
    for(let i = 0 ; i < getProducts.data.length; i++){
      availableOrder.push( parseInt(getProducts.data[i].order) )
    }
  }
  let largest= 0;
  for (i = 0; i <= availableOrder.length; i++ ){
      if (availableOrder[i]>largest) {
         largest=availableOrder[i];
      }
  }
  largest += 1
  let available = [];
  if(getProducts.data[0] != undefined && getProducts.data[0] != null){
    available = getProducts.data[0].withoutOrder
  }
  available.push(largest)
  if(available != undefined && available != null){
    available = available.filter((a, b) => available.indexOf(a) === b)
  }
  if(req.session.username && req.session.username.type == 'SUPER_ADMIN'){
    res.render('add-product', {
      label : 'Add New Product',
      label_btn : 'Add',
      user_data : req.session.username,
      image_label : 'Add image',
      availableOrder : available
    });
  }
  else{
    res.redirect('/');
  }
};
