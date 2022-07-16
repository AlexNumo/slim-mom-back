const { dietaryService } = require("../../services");

const deleteDailyDiet = async (req, res, next) => {
  const { productId } = req.params;
  const { _id: userId } = req.user;
  console.log(1, req.params);
  console.log(2, req.body);

  const result = await dietaryService.deleteDietary(
    userId,
    productId,
    req.body
  );

  res.status(200).json({
    status: "Deleted",
    code: 200,
    message: `Product with id ${productId} deleted`,
    data: {
      result: { result },
    },
  });
};

module.exports = deleteDailyDiet;
