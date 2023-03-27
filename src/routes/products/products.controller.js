const {
  getAllProducts,
  registerNewProduct,
} = require("../../models/products.model");

const httpGetAllProducts = async (req, res) => {
  const responseProducts = await getAllProducts();

  return res.status(200).json(responseProducts);
};

const httpRegisterNewProduct = async (req,res) => {
    const product = req.body;

    if(!product.brand || !product.model || !product.user || !product.code || !product.area ){
        return res.status(400).json({
            error: "Missing required product property",
          });
    }
    registerNewProduct(product)
    
    return res.status(201).json(product)
}
module.exports = { httpGetAllProducts, httpRegisterNewProduct };
