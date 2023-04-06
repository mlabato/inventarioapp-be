const {
  getAllProducts,
  registerNewProduct,
  editProductById,
} = require("../../models/products.model");

const httpGetAllProducts = async (req, res) => {
  const responseProducts = await getAllProducts();

  return res.status(200).json(responseProducts);
};

const httpRegisterNewProduct = async (req, res) => {
  const product = req.body;

  if (
    !product.brand ||
    !product.model ||
    !product.user 
  ) {
    return res.status(400).json({
      error: "Missing required product property",
    });
  }

  const modelResponse = await registerNewProduct(product);

  return res.status(201).json(modelResponse);
};

const httpEditProductById = async (req, res) => {
  const productId = req.params.id;

  const productToEdit = req.body;

  const edited = await editProductById(productToEdit, productId);

  if (edited.error) {
    return res.status(400).json({
      msg: "product not edited",
      error: edited.error
    });
  }

  console.log(edited);
  return res.status(200).json({
    ok: true,

    edited,
  });
};

module.exports = {
  httpGetAllProducts,
  httpRegisterNewProduct,
  httpEditProductById,
};
