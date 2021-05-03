const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const reviewsRouter = require("./drinkReviews");
const { validateDrink } = require('../utils/validators');
const { requireAuth } = require("../../utils/auth");
const { User, Drink, DrinkReview } = require("../../db/models");
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");

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

router.post(
  "/",
  singleMulterUpload("image"),
  requireAuth,
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
  requireAuth,
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
  requireAuth,
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
