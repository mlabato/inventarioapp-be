const products = require("./products.mongo");
const users = require("./users.mongo");
const areas = require("../models/areas.mongo")

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

  const area = await areas.findOne({
    area: product.area,
  });

  if (!user || !area) {
    return { error: "No matching area or user found" };
  } else {
    const newIdNumber = (await getLatestIdNumber()) + 1;

    const newProduct = Object.assign(product, {
      id: newIdNumber,
      registrationDate: new Date(),
      active: true,
    });

    await saveProduct(newProduct);

    return newProduct
  }
};

module.exports = { getAllProducts, registerNewProduct };
