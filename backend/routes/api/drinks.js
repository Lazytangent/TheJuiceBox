const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const reviewsRouter = require("./drinkReviews");
const { validateDrink, validateDrinkReview } = require('../utils/validators');
const flattener = require('../utils/flattener');
const { requireAuth } = require("../../utils/auth");
const { User, Drink, DrinkReview } = require("../../db/models");
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");

router.use(requireAuth);
router.use('/reviews', reviewsRouter);

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const drinks = await Drink.findAllWithStuff();
    res.json(flattener(drinks));
  })
);

router.get('/:drinkId(\\d+)', requireAuth, asyncHandler(async (req, res, next) => {
  const drinkId = parseInt(req.params.drinkId, 10);
  const drink = await Drink.findByPk(drinkId, {
    include: { model: User, as: 'Creator' },
  });
  if (!drink) {
    const err = new Error('Invalid drink.');
    err.status = 400;
    err.title = 'Invalid drink.';
    err.errors = [`The drink with the id of ${drinkId} does not exist.`];
    return next(err);
  }
  res.json(drink);
}));

router.post(
  "/",
  singleMulterUpload("image"),
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

    return res.json(drink);
  })
);

router.put(
  "/:drinkId(\\d+)",
  singleMulterUpload("image"),
  validateDrink,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.drinkId, 10);
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

    res.json(drink);
  })
);

router.delete(
  "/:drinkId(\\d+)",
  asyncHandler(async (req, res) => {
    const drinkId = req.params.drinkId;
    const id = parseInt(drinkId, 10);
    const drink = await Drink.findByPk(id);
    await drink.destroy();

    return res.json({ message: "success" });
  })
);

router.post(
  "/newDrinks",
  asyncHandler(async (req, res, next) => {
    const { drinks } = req.body;
    const drinkArr = [];

    if (!drinks) {
      const err = new Error('Invalid search query.');
      err.status = 400;
      err.title = 'Invalid search query.';
      err.errors = ['Search query provided was unable to generate any new drinks.'];
      return next(err);
    }

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
    return res.json(flattener(drinkArr));
  })
);

router.get('/:drinkId(\\d+)/reviews', asyncHandler(async (req, res) => {
  const drinkId = parseInt(req.params.drinkId, 10);
  const reviews = await DrinkReview.findAll({
    where: {
      drinkId,
    },
    include: User,
  });
  res.json(flattener(reviews));
}));

router.post('/:drinkId(\\d+)/reviews', validateDrinkReview, asyncHandler(async (req, res) => {
  const { userId, drinkId, review, rating } = req.body;
  const { id } = await DrinkReview.create({ userId, drinkId, review, stars: rating });
  const reviewObj = await DrinkReview.findByPk(id, { include: User });
  res.json(reviewObj);
}));

module.exports = router;
