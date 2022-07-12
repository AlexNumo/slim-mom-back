const { createError } = require("../../errors/createError");
const { Dietary } = require("../../models");

const updateDietary = async (_id, payload) => {
  const { date, data } = payload;

  if (!data) {
    throw createError(404, "Product not found");
  }
  return await Dietary.findOneAndUpdate(
    {
      owner: _id,
      date: date,
    },
    { $push: { products: data } },
    { new: true }
  )
    .populate("owner", "name email")
    .populate({
      path: "products.product",
      select: "title calories",
    });
};

module.exports = updateDietary;
