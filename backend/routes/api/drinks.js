const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const reviewsRouter = require("./drinkReviews");
const { restoreUser } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { User, Drink, DrinkReview } = require("../../db/models");
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");

const router = express.Router();

router.use("/:drinkId(\\d+)/reviews", reviewsRouter);

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const drinks = await Drink.findAll({
      include: [
        {
          model: DrinkReview,
          as: "Reviews",
          include: {
            model: User,
          },
        },
        {
          model: User,
          as: "Creator",
        },
      ],
    });
    res.json({ drinks });
  })
);

const validateDrink = [
  check("name")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a name for your drink."),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a description."),
  handleValidationErrors,
];

router.post(
  "/",
  singleMulterUpload("image"),
  restoreUser,
  validateDrink,
  asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const { user } = req;
    let imageUrl = null;
    if (req.file) {
      imageUrl = await singlePublicFileUpload(req.file);
    }

    const drink = await Drink.create({
      name,
      description,
      imageUrl,
      creatorId: user.id,
    });

    return res.json({
      drink,
    });
  })
);

router.put(
  "/:drinkId(\\d+)",
  singleMulterUpload("image"),
  restoreUser,
  validateDrink,
  asyncHandler(async (req, res) => {
    const drinkId = req.params.drinkId;
    const id = parseInt(drinkId, 10);
    const { name, description } = req.body;
    let imageUrl = null;
    if (req.file) {
      imageUrl = await singlePublicFileUpload(req.file);
    }

    const drink = await Drink.findByPk(id);
    await drink.update({
      name,
      description,
      imageUrl: imageUrl || drink.imageUrl,
    });

    res.json({
      drink,
    });
  })
);

router.delete(
  "/:drinkId(\\d+)",
  asyncHandler(async (req, res) => {
    const drinkId = req.params.drinkId;
    const id = parseInt(drinkId, 10);
    const drink = await Drink.findByPk(id);
    const reviews = await DrinkReview.findAll({
      where: {
        drinkId: id,
      },
    });

    for (let review of reviews) {
      await review.destroy();
    }
    await drink.destroy();

    return res.json({ message: "success" });
  })
);

router.post(
  "/newDrinks",
  asyncHandler(async (req, res) => {
    const { drinks } = req.body;
    const drinkArr = [];

    for (const drink of drinks) {
      if (!drink.strDrink.includes("Quick")) {
        const newDrink = await Drink.create({
          name: drink.strDrink,
          description: drink.strInstructions,
          imageUrl: drink.strDrinkThumb,
          creatorId: 1,
        });
        drinkArr.push(newDrink);
      }
    }
    return res.json({
      drinks: drinkArr,
    });
  })
);

module.exports = router;
