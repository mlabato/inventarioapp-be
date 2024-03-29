const products = require("./products.mongo");
const users = require("./users.mongo");
const areas = require("../models/areas.mongo");

const DEFAULT_ID_NUMBER = 0;

const getLatestIdNumber = async () => {
  const latestIdNumber = await products.findOne().sort("-id");

  if (latestIdNumber === null) {
    return DEFAULT_ID_NUMBER;
  }
  return latestIdNumber.id;
};

async function saveProduct(product) {
  await products.updateOne(
    {
      id: product.id,
    },
    product,
    { upsert: true }
  );
}

const getAllProducts = async () => {
  return await products.find({}, { __id: 0, __v: 0 });
};

const registerNewProduct = async (product) => {
  const user = await users.findOne({
    username: product.user,
  });

  if (!user) {
    return { error: "No user found" };
  } else {
    const newIdNumber = (await getLatestIdNumber()) + 1;

    const newProduct = Object.assign(product, {
      area: user._doc.area,
      id: newIdNumber,
      registrationDate: new Date(),
      active: true,
    });

    await saveProduct(newProduct);

    return newProduct;
  }
};

const editProductById = async (product, id) => {
  const area = await areas.findOne({
    area: product.area,
  });

  const user = await users.findOne({
    username: product.user,
  });

  if (!area || !user) {
    return { error: "No matching area or user found" };
  } else {
    if (!product.active) {
      Object.defineProperties(product, {
        area: {
          value: "Sin asignar",
        },
        user: {
          value: "Sin asignar",
        },
      });
      const editedProduct = Object.assign(product, { id: id });

      await saveProduct(editedProduct);

      return editedProduct;
    } else {
      const editedProduct = Object.assign(product, { id: id });

      await saveProduct(editedProduct);

      return editedProduct;
    }
  }
};

module.exports = { getAllProducts, registerNewProduct, editProductById };
